import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export type AgentPhase = "idle" | "scanning" | "repairing" | "passed";
export type AgentScene = {
  setMotion: (enabled: boolean) => void;
  setPhase: (phase: AgentPhase) => void;
  rotate: (radians: number) => void;
  reset: () => void;
  dispose: () => void;
};

/** A locally modelled character: no remote models, textures, or tracking. */
export function createAgentScene(canvas: HTMLCanvasElement, host: HTMLElement, onLost: () => void): AgentScene {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 40);
  camera.position.set(0, 1.9, 6.7);
  camera.lookAt(0, 0.45, 0);

  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.8;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x78818f, 2));
  const key = new THREE.DirectionalLight(0xfff4df, 4);
  key.position.set(-3, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -4;
  key.shadow.camera.right = 4;
  key.shadow.camera.top = 4;
  key.shadow.camera.bottom = -4;
  key.shadow.normalBias = 0.04;
  key.shadow.bias = -0.0002;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc7d9ff, 3);
  rim.position.set(4, 3, -3);
  scene.add(rim);

  const ivory = new THREE.MeshStandardMaterial({ color: 0xe5e2d9, roughness: 0.28, metalness: 0.25 });
  const graphite = new THREE.MeshStandardMaterial({ color: 0x24272c, roughness: 0.35, metalness: 0.5 });
  const silver = new THREE.MeshStandardMaterial({ color: 0x9ba2ab, roughness: 0.24, metalness: 0.85 });
  const screen = new THREE.MeshPhysicalMaterial({ color: 0x080d12, roughness: 0.18, metalness: 0.2, clearcoat: 1 });
  const amber = new THREE.MeshStandardMaterial({ color: 0xffb224, emissive: 0xffa000, emissiveIntensity: 0.8, roughness: 0.3 });
  const paint = new THREE.MeshBasicMaterial({ color: 0xf1ede3 });
  const signal = new THREE.MeshBasicMaterial({ color: 0xec5a50 });
  const textures: THREE.Texture[] = [];

  function mesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0) {
    const result = new THREE.Mesh(geometry, material);
    result.position.set(x, y, z);
    result.castShadow = true;
    result.receiveShadow = true;
    parent.add(result);
    return result;
  }
  function box(parent: THREE.Object3D, w: number, h: number, d: number, radius: number, material: THREE.Material, x = 0, y = 0, z = 0) {
    return mesh(parent, new RoundedBoxGeometry(w, h, d, 3, radius), material, x, y, z);
  }
  function cylinder(parent: THREE.Object3D, radius: number, height: number, material: THREE.Material, x: number, y: number, z = 0) {
    return mesh(parent, new THREE.CylinderGeometry(radius, radius, height, 40), material, x, y, z);
  }
  function label(parent: THREE.Object3D, text: string, w: number, h: number, x: number, y: number, z: number) {
    const bitmap = document.createElement("canvas");
    bitmap.width = 256;
    bitmap.height = 96;
    const ctx = bitmap.getContext("2d")!;
    ctx.fillStyle = "#f1ede3";
    ctx.font = "bold 45px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 128, 48);
    const texture = new THREE.CanvasTexture(bitmap);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.push(texture);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
    const plane = mesh(parent, new THREE.PlaneGeometry(w, h), material, x, y, z);
    plane.castShadow = false;
    return plane;
  }

  const turntable = new THREE.Group();
  scene.add(turntable);
  const robot = new THREE.Group();
  turntable.add(robot);
  turntable.rotation.y = -0.28;

  // A serviceable machine: ceramic shell, metal joints, split display, and a
  // replaceable chest cartridge that borrows the site's flap-board vocabulary.
  box(robot, 1.08, 0.91, 0.77, 0.23, ivory, 0, 0.1);
  box(robot, 0.91, 0.14, 0.65, 0.06, graphite, 0, -0.33);
  cylinder(robot, 0.2, 0.23, silver, 0, 0.62);
  box(robot, 0.59, 0.38, 0.075, 0.05, graphite, 0, 0.17, 0.39);
  label(robot, "SV / 01", 0.46, 0.15, 0, 0.18, 0.435);
  for (let i = 0; i < 3; i++) box(robot, 0.045, 0.025, 0.02, 0.005, i === 0 ? amber : silver, -0.1 + i * 0.1, -0.13, 0.399);

  const head = new THREE.Group();
  head.position.y = 1.11;
  robot.add(head);
  box(head, 1.66, 1.03, 1.04, 0.26, ivory);
  box(head, 1.53, 0.045, 0.88, 0.015, graphite, 0, -0.36, -0.04);
  box(head, 1.43, 0.76, 0.15, 0.2, graphite, 0, 0.035, 0.48);
  box(head, 1.31, 0.65, 0.10, 0.17, screen, 0, 0.05, 0.56);
  const eyes = [-0.32, 0.32].map(x => box(head, 0.12, 0.26, 0.035, 0.055, amber, x, 0.075, 0.622));
  box(head, 1.15, 0.012, 0.01, 0.004, graphite, 0, 0.065, 0.647);
  for (const side of [-1, 1]) {
    const ear = cylinder(head, 0.2, 0.14, silver, side * 0.85, 0.03);
    ear.rotation.z = Math.PI / 2;
    const cap = cylinder(head, 0.12, 0.15, graphite, side * 0.9, 0.03);
    cap.rotation.z = Math.PI / 2;
    for (let i = 0; i < 3; i++) box(head, 0.06, 0.24, 0.02, 0.01, graphite, -0.15 + 0.15 * i, 0, -0.522);
  }
  cylinder(head, 0.035, 0.24, silver, 0.43, 0.61, -0.1);
  mesh(head, new THREE.SphereGeometry(0.085, 20, 16), amber, 0.43, 0.76, -0.1);

  const arms = [-1, 1].map(side => {
    const arm = new THREE.Group();
    arm.position.set(side * 0.58, 0.31, 0);
    robot.add(arm);
    mesh(arm, new THREE.SphereGeometry(0.15, 20, 16), graphite);
    box(arm, 0.23, 0.45, 0.27, 0.1, ivory, side * 0.08, -0.25);
    mesh(arm, new THREE.SphereGeometry(0.11, 20, 16), silver, side * 0.08, -0.49);
    box(arm, 0.25, 0.19, 0.31, 0.07, graphite, side * 0.08, -0.6, 0.045);
    arm.rotation.z = side * 0.24;
    return arm;
  });
  for (const side of [-1, 1]) {
    cylinder(robot, 0.095, 0.2, silver, side * 0.28, -0.49);
    box(robot, 0.36, 0.2, 0.54, 0.09, graphite, side * 0.28, -0.64, 0.075);
  }

  // A machined dock anchors the levitating character to the page.
  cylinder(scene, 1.25, 0.13, graphite, 0, -1.01);
  cylinder(scene, 1.19, 0.035, silver, 0, -0.925);
  cylinder(scene, 1.11, 0.02, graphite, 0, -0.90);
  const ring = mesh(scene, new THREE.TorusGeometry(0.91, 0.012, 8, 72), silver, 0, -0.883);
  ring.rotation.x = Math.PI / 2;
  for (let i = 0; i < 24; i++) {
    const angle = i * Math.PI / 12;
    const tick = box(scene, 0.012, 0.012, i % 6 === 0 ? 0.12 : 0.06, 0.002, silver, Math.sin(angle) * 1.04, -0.878, Math.cos(angle) * 1.04);
    tick.rotation.y = angle;
  }
  const shadowBitmap = document.createElement("canvas");
  shadowBitmap.width = shadowBitmap.height = 128;
  const shadowContext = shadowBitmap.getContext("2d")!;
  const fade = shadowContext.createRadialGradient(64, 64, 12, 64, 64, 64);
  fade.addColorStop(0, "rgba(0,0,0,0.25)");
  fade.addColorStop(0.5, "rgba(0,0,0,0.12)");
  fade.addColorStop(1, "rgba(0,0,0,0)");
  shadowContext.fillStyle = fade;
  shadowContext.fillRect(0, 0, 128, 128);
  const shadowTexture = new THREE.CanvasTexture(shadowBitmap);
  textures.push(shadowTexture);
  const ground = mesh(scene, new THREE.PlaneGeometry(4.7, 4.7), new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }), 0, -1.1);
  ground.rotation.x = -Math.PI / 2;
  ground.castShadow = false;

  const modules = [-1, 1].map((side, i) => {
    const group = new THREE.Group();
    scene.add(group);
    group.position.set(side * 1.7, i ? 1.13 : 0.25, 0.1);
    group.rotation.set(0.09, side * -0.35, side * -0.15);
    box(group, 0.58, 0.72, 0.19, 0.065, graphite);
    box(group, 0.49, 0.61, 0.03, 0.035, screen, 0, 0, 0.102);
    box(group, 0.48, 0.015, 0.01, 0.003, silver, 0, 0, 0.125);
    label(group, i ? "</>" : "{ }", 0.4, 0.19, 0, 0.07, 0.134);
    box(group, 0.13, 0.035, 0.02, 0.008, i ? paint : signal, 0, -0.19, 0.13);
    return group;
  });
  const scanRing = mesh(scene, new THREE.TorusGeometry(1.42, 0.012, 8, 80), amber);
  scanRing.rotation.x = Math.PI / 2;
  scanRing.visible = false;

  let motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let phase: AgentPhase = "idle";
  let visible = false;
  let disposed = false;
  let contextLost = false;
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let targetRotation = -0.28;
  let lookX = 0;
  let lookY = 0;
  let dragging = false;
  let pointerX = 0;

  function render(now: number) {
    frame = 0;
    if (disposed || contextLost || !visible || document.hidden) return;
    const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
    lastTime = now;
    if (motion) elapsed += delta;
    const t = elapsed;
    const working = phase === "scanning" || phase === "repairing";
    const blend = motion ? 1 - Math.exp(-delta * 10) : 1;
    turntable.rotation.y += (targetRotation - turntable.rotation.y) * blend;
    robot.position.y = motion ? Math.sin(t * 1.6) * 0.065 : 0;
    robot.rotation.z = motion ? Math.sin(t * 0.8) * 0.025 : 0;
    head.rotation.y += ((motion ? lookX * 0.22 + (working ? Math.sin(t * 3) * 0.1 : 0) : 0) - head.rotation.y) * blend;
    head.rotation.x += ((motion ? lookY * 0.1 : 0) - head.rotation.x) * blend;
    const blink = motion && !working && t % 5.6 > 5.4 ? 0.15 : 1;
    eyes.forEach(eye => { eye.scale.y = phase === "passed" ? 0.55 : blink; });
    arms[0].rotation.z = -0.24 + (working && motion ? Math.sin(t * 5) * 0.18 : 0);
    arms[1].rotation.z = phase === "passed" ? -0.85 : working ? -0.5 : 0.24;
    modules.forEach((module, i) => {
      const repairing = i === 0 && phase === "repairing";
      const targetX = i ? 1.7 : repairing ? -1.12 : -1.7;
      module.position.x += (targetX - module.position.x) * blend;
      module.position.y = (i ? 1.13 : 0.25) + (motion ? Math.sin(t * 1.4 + i * 2) * 0.11 : 0);
      module.rotation.y = (i ? -0.35 : 0.35) + (motion ? Math.sin(t + i) * 0.12 : 0);
      module.rotation.z = (i ? -0.15 : 0.15) + (i === 0 && phase === "repairing" && motion ? Math.sin(t * 9) * 0.06 : 0);
    });
    signal.color.set(phase === "passed" ? 0xf1ede3 : working ? 0xffb224 : 0xec5a50);
    scanRing.visible = working;
    scanRing.position.y = motion ? 0.45 + Math.sin(t * 3) * 0.75 : 0.45;
    renderer.render(scene, camera);
    if (motion) frame = requestAnimationFrame(render);
  }
  function wake() {
    if (!frame && !disposed && !contextLost && visible && !document.hidden) {
      lastTime = 0;
      frame = requestAnimationFrame(render);
    }
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Keep the full cartridge spread visible on portrait screens.
    camera.position.z = Math.max(6.7, 8.4 / camera.aspect);
    camera.updateProjectionMatrix();
    wake();
  }
  function down(event: PointerEvent) {
    if (event.button !== 0) return;
    dragging = true;
    pointerX = event.clientX;
    canvas.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent) {
    const bounds = canvas.getBoundingClientRect();
    lookX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    lookY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    if (dragging) {
      targetRotation += (event.clientX - pointerX) * 0.009;
      pointerX = event.clientX;
    }
    wake();
  }
  function up() { dragging = false; }
  function leave() { lookX = 0; lookY = 0; wake(); }
  function visibility() {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else wake();
  }
  function lost(event: Event) {
    event.preventDefault();
    contextLost = true;
    cancelAnimationFrame(frame);
    frame = 0;
    onLost();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
    else { cancelAnimationFrame(frame); frame = 0; }
  });
  observer.observe(host);
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);
  canvas.addEventListener("lostpointercapture", up);
  canvas.addEventListener("pointerleave", leave);
  canvas.addEventListener("webglcontextlost", lost);
  document.addEventListener("visibilitychange", visibility);
  resize();

  return {
    setMotion(enabled) { motion = enabled; wake(); },
    setPhase(next) { phase = next; wake(); },
    rotate(radians) { targetRotation += radians; wake(); },
    reset() { targetRotation = -0.28; lookX = 0; lookY = 0; wake(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("lostpointercapture", up);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("webglcontextlost", lost);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
        }
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      textures.forEach(texture => texture.dispose());
      key.shadow.dispose();
      environment.dispose();
      renderer.dispose();
    },
  };
}
