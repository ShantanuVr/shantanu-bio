// WebGL2 split-flap renderer. One instanced draw: every module is three quads (upper
// card, lower card, falling leaf) and the leaf is rotated about its hinge in the
// vertex shader. Glyphs come from an atlas rasterized at the module's device size.
import { DRUM, RAISED, RAISE_EM } from "@/lib/drum";
import type { BoardModel, Module, ModuleView } from "./board-model";

const VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aQuad;
layout(location = 1) in vec4 aRect;
layout(location = 2) in float aPart;
layout(location = 3) in vec4 aDyn;

uniform mat4 uViewProj;
uniform vec2 uBoard;
uniform float uGap;

out vec2 vUv;
out vec2 vSize;
out float vGlyph;
out float vLower;
out float vTint;
out float vShade;
out vec3 vNormal;
out vec3 vWorld;

void main() {
  float halfH = aRect.w * 0.5;
  float faceH = halfH - uGap;
  float hinge = aRect.y + halfH;
  float x = aRect.x + aQuad.x * aRect.z;
  float angle = aDyn.z;
  vec3 p;
  vec3 n = vec3(0.0, 0.0, 1.0);
  vSize = vec2(aRect.z, faceH);
  vTint = aDyn.w;
  vShade = 1.0;

  if (aPart < 0.5) {
    // Upper card: the glyph the module is heading to.
    p = vec3(x, aRect.y + aQuad.y * faceH, 0.0);
    vUv = aQuad;
    vGlyph = aDyn.y;
    vLower = 0.0;
  } else if (aPart < 1.5) {
    // Lower card: the glyph being left behind, shadowed as the leaf comes down.
    p = vec3(x, hinge + uGap + aQuad.y * faceH, 0.0);
    vUv = aQuad;
    vGlyph = aDyn.x;
    vLower = 1.0;
    float s = smoothstep(1.2, 2.9, angle) * (1.0 - smoothstep(3.05, 3.1416, angle));
    vShade = 1.0 - 0.5 * s * (1.0 - 0.6 * aQuad.y);
  } else {
    // Leaf: hinged at the split, front shows the old upper half, back the new lower half.
    float v = 1.0 - aQuad.y;
    float len = uGap + v * faceH;
    float c = cos(angle);
    float s = sin(angle);
    p = vec3(x, hinge - len * c, len * s + 0.75);
    bool front = angle < 1.5707963;
    vLower = front ? 0.0 : 1.0;
    vGlyph = front ? aDyn.x : aDyn.y;
    vUv = vec2(aQuad.x, front ? aQuad.y : v);
    n = front ? vec3(0.0, -s, c) : vec3(0.0, s, -c);
  }

  vNormal = n;
  vWorld = vec3(p.x - uBoard.x * 0.5, uBoard.y * 0.5 - p.y, p.z);
  gl_Position = uViewProj * vec4(vWorld, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
in vec2 vSize;
in float vGlyph;
in float vLower;
in float vTint;
in float vShade;
in vec3 vNormal;
in vec3 vWorld;

uniform sampler2D uAtlas;
uniform vec2 uAtlasPx;
uniform vec2 uCellPx;
uniform vec2 uGlyphPx;
uniform float uPad;
uniform float uCols;
uniform vec3 uLight;
uniform vec3 uEye;
uniform float uLightMix;
uniform float uRadius;
uniform vec3 uFlap;
uniform vec3 uPaint;
uniform vec3 uAmber;
uniform vec3 uFault;

out vec4 outColor;

float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  bool upper = vLower < 0.5;
  bool outerEdge = upper ? vUv.y < 0.5 : vUv.y > 0.5;
  float r = outerEdge ? uRadius : min(uRadius, 0.75);
  vec2 p = (vUv - 0.5) * vSize;
  float d = sdRoundBox(p, vSize * 0.5, r);
  float aa = max(fwidth(d), 1e-3);
  float mask = 1.0 - smoothstep(-aa, aa, d);
  if (mask <= 0.001) discard;

  float g = floor(vGlyph + 0.5);
  vec2 cell = vec2(mod(g, uCols), floor(g / uCols));
  vec2 local = vec2(vUv.x, (vLower + vUv.y) * 0.5);
  vec2 uv = (cell * uCellPx + uPad + local * uGlyphPx) / uAtlasPx;
  float cov = texture(uAtlas, uv).r;

  float fromHinge = upper ? 1.0 - vUv.y : vUv.y;
  float tone = mix(0.7, 1.0, smoothstep(0.0, 0.28, fromHinge)) * (upper ? 1.07 : 0.93);
  vec3 ink = vTint < 0.5 ? uPaint : (vTint < 1.5 ? uFault : uAmber);
  float grain = (hash(gl_FragCoord.xy) - 0.5) * 0.03;
  vec3 base = mix(uFlap * tone + grain, ink * mix(0.88, 1.0, tone), cov);

  vec3 N = normalize(vNormal);
  vec3 L = normalize(uLight - vWorld);
  vec3 V = normalize(uEye - vWorld);
  vec3 H = normalize(L + V);
  float diffuse = max(dot(N, L), 0.0);
  float spec = pow(max(dot(N, H), 0.0), 28.0);
  float pool = exp(-pow(length(uLight.xy - vWorld.xy) / (uLight.z * 1.15), 2.0));
  vec3 col = base * (0.56 + 0.52 * diffuse) * vShade;
  col += vec3(1.0, 0.97, 0.9) * spec * (0.03 + 0.08 * uLightMix * pool) * (1.0 - cov * 0.5);
  outColor = vec4(col * mask, mask);
}`;

export type LightState = { x: number; y: number; mix: number };

type Atlas = {
  texture: WebGLTexture;
  width: number;
  height: number;
  cellW: number;
  cellH: number;
  glyphW: number;
  glyphH: number;
  pad: number;
  cols: number;
  moduleW: number;
  moduleH: number;
  dpr: number;
};

const CAP_FRACTION = 0.58;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const v = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return shader;
}

export class BoardRenderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private vao: WebGLVertexArrayObject;
  private rectBuffer: WebGLBuffer;
  private dynBuffer: WebGLBuffer;
  private dyn = new Float32Array(0);
  private atlas: Atlas | null = null;
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private n = 0;
  private width = 1;
  private height = 1;
  private dpr = 1;
  private view: ModuleView = { from: 0, to: 0, angle: 0, tint: 0 };
  private eye: [number, number, number] = [0, 0, 1];
  private matrix: Float32Array = new Float32Array(16);
  private colors: Record<"flap" | "paint" | "amber" | "fault", [number, number, number]>;

  constructor(
    private canvas: HTMLCanvasElement,
    private fontFamily: string,
  ) {
    // Board colours never change with the theme, so read them once.
    const css = getComputedStyle(canvas);
    this.colors = {
      flap: hexToRgb(css.getPropertyValue("--flap") || "#1c1d1f"),
      paint: hexToRgb(css.getPropertyValue("--paint") || "#f1ede3"),
      amber: hexToRgb(css.getPropertyValue("--amber") || "#ffb224"),
      fault: hexToRgb(css.getPropertyValue("--fault") || "#ec5a50"),
    };

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) throw new Error("WebGL2 unavailable");
    this.gl = gl;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Program link failed: ${gl.getProgramInfoLog(program)}`);
    }
    this.program = program;
    for (const name of [
      "uViewProj", "uBoard", "uGap", "uAtlas", "uAtlasPx", "uCellPx", "uGlyphPx", "uPad", "uCols",
      "uLight", "uEye", "uLightMix", "uRadius", "uFlap", "uPaint", "uAmber", "uFault",
    ]) {
      this.uniforms[name] = gl.getUniformLocation(program, name);
    }

    this.vao = gl.createVertexArray()!;
    gl.bindVertexArray(this.vao);

    const quad = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    this.rectBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.rectBuffer);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 20, 0);
    gl.vertexAttribDivisor(1, 1);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 20, 16);
    gl.vertexAttribDivisor(2, 1);

    this.dynBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.dynBuffer);
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(3, 4, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(3, 1);

    gl.bindVertexArray(null);
  }

  /** Module rectangles in CSS pixels, relative to the board's top-left corner. */
  setLayout(modules: Module[], width: number, height: number, dpr: number) {
    const gl = this.gl;
    this.n = modules.length;
    this.width = width;
    this.height = height;
    this.dpr = dpr;
    this.canvas.width = Math.max(1, Math.round(width * dpr));
    this.canvas.height = Math.max(1, Math.round(height * dpr));

    // Instances: all upper cards, then all lower cards, then all leaves (drawn last).
    const rects = new Float32Array(this.n * 3 * 5);
    for (let part = 0; part < 3; part++) {
      modules.forEach((m, i) => {
        const o = (part * this.n + i) * 5;
        rects.set([m.x, m.y, m.w, m.h, part], o);
      });
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.rectBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, rects, gl.STATIC_DRAW);
    this.dyn = new Float32Array(this.n * 3 * 4);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.dynBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.dyn.byteLength, gl.DYNAMIC_DRAW);

    this.matrix = this.viewProj();
    const mw = modules[0]?.w ?? 1;
    const mh = modules[0]?.h ?? 1;
    const a = this.atlas;
    const stale = !a || a.dpr !== dpr || Math.abs(a.moduleH - mh) / mh > 0.06 || Math.abs(a.moduleW - mw) / mw > 0.06;
    if (stale) this.buildAtlas(mw, mh, dpr);
  }

  private buildAtlas(moduleW: number, moduleH: number, dpr: number) {
    const gl = this.gl;
    const maxTex = Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE) as number, 4096);
    const pad = 2;
    let scale = Math.min(dpr, 520 / moduleH);
    let cellW = 0, cellH = 0, cols = 0, rows = 0, width = 0, height = 0;
    for (let attempt = 0; attempt < 6; attempt++) {
      cellW = Math.max(8, Math.round(moduleW * scale));
      cellH = Math.max(12, Math.round(moduleH * scale));
      cols = Math.ceil(Math.sqrt((DRUM.length * (cellH + pad * 2)) / (cellW + pad * 2)));
      rows = Math.ceil(DRUM.length / cols);
      width = cols * (cellW + pad * 2);
      height = rows * (cellH + pad * 2);
      if (width <= maxTex && height <= maxTex) break;
      scale *= 0.8;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.font = `800 100px ${this.fontFamily}`;
    const capRatio = (ctx.measureText("H").actualBoundingBoxAscent || 70) / 100;
    const fontPx = (cellH * CAP_FRACTION) / capRatio;
    ctx.font = `800 ${fontPx}px ${this.fontFamily}`;
    const capH = ctx.measureText("H").actualBoundingBoxAscent || fontPx * capRatio;
    for (let i = 0; i < DRUM.length; i++) {
      const glyph = DRUM[i];
      if (glyph === " ") continue;
      const cx = (i % cols) * (cellW + pad * 2) + pad + cellW / 2;
      const lift = RAISED.has(glyph) ? RAISE_EM * fontPx : 0;
      const baseline = Math.floor(i / cols) * (cellH + pad * 2) + pad + cellH / 2 + capH / 2 - lift;
      const w = ctx.measureText(glyph).width;
      const maxW = cellW * 0.84;
      ctx.save();
      ctx.translate(cx, baseline);
      if (w > maxW) ctx.scale(maxW / w, 1);
      ctx.fillText(glyph, 0, 0);
      ctx.restore();
    }

    if (this.atlas) gl.deleteTexture(this.atlas.texture);
    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, gl.RED, gl.UNSIGNED_BYTE, canvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    this.atlas = {
      texture,
      width,
      height,
      cellW: cellW + pad * 2,
      cellH: cellH + pad * 2,
      glyphW: cellW,
      glyphH: cellH,
      pad,
      cols,
      moduleW,
      moduleH,
      dpr,
    };
  }

  private viewProj(): Float32Array {
    const W = this.width;
    const H = this.height;
    const D = Math.max(W, H) * 1.6;
    const f = (2 * D) / H;
    const aspect = W / H;
    const near = D * 0.4;
    const far = D * 1.6;
    const nf = 1 / (near - far);
    this.eye = [0, 0, D];
    // perspective(fov, aspect) * translate(0, 0, -D), column-major
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, -D * (far + near) * nf + 2 * far * near * nf, D,
    ]);
  }

  render(model: BoardModel, now: number, light: LightState) {
    const gl = this.gl;
    const atlas = this.atlas;
    if (!atlas || this.n === 0) return;
    const n = this.n;
    const dyn = this.dyn;
    for (let i = 0; i < n; i++) {
      const v = model.view(i, now, this.view);
      for (let part = 0; part < 3; part++) {
        const o = (part * n + i) * 4;
        dyn[o] = v.from;
        dyn[o + 1] = v.to;
        dyn[o + 2] = v.angle;
        dyn[o + 3] = v.tint;
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.dynBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, dyn);

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    gl.useProgram(this.program);
    const u = this.uniforms;
    gl.uniformMatrix4fv(u.uViewProj, false, this.matrix);
    gl.uniform2f(u.uBoard, this.width, this.height);
    const moduleH = atlas.moduleH;
    gl.uniform1f(u.uGap, Math.max(0.5, moduleH * 0.004));
    gl.uniform1f(u.uRadius, Math.max(1.5, atlas.moduleW * 0.06));
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, atlas.texture);
    gl.uniform1i(u.uAtlas, 0);
    gl.uniform2f(u.uAtlasPx, atlas.width, atlas.height);
    gl.uniform2f(u.uCellPx, atlas.cellW, atlas.cellH);
    gl.uniform2f(u.uGlyphPx, atlas.glyphW, atlas.glyphH);
    gl.uniform1f(u.uPad, atlas.pad);
    gl.uniform1f(u.uCols, atlas.cols);
    const lz = Math.max(this.width, this.height) * 0.42;
    gl.uniform3f(u.uLight, light.x - this.width / 2, this.height / 2 - light.y, lz);
    gl.uniform3f(u.uEye, this.eye[0], this.eye[1], this.eye[2]);
    gl.uniform1f(u.uLightMix, light.mix);

    gl.uniform3fv(u.uFlap, this.colors.flap);
    gl.uniform3fv(u.uPaint, this.colors.paint);
    gl.uniform3fv(u.uAmber, this.colors.amber);
    gl.uniform3fv(u.uFault, this.colors.fault);

    gl.bindVertexArray(this.vao);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, n * 3);
    gl.bindVertexArray(null);
  }

  dispose() {
    const gl = this.gl;
    if (this.atlas) gl.deleteTexture(this.atlas.texture);
    gl.deleteBuffer(this.rectBuffer);
    gl.deleteBuffer(this.dynBuffer);
    gl.deleteVertexArray(this.vao);
    gl.deleteProgram(this.program);
  }
}
