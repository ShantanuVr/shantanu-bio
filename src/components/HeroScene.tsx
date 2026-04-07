"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 60;
const CONNECTION_DISTANCE = 3.8;
const MAX_CONNECTIONS_PER_NODE = 4;

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];
    const sizes: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8
        )
      );
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.002
        )
      );
      sizes.push(0.04 + Math.random() * 0.06);
    }
    return { positions, velocities, sizes };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const handlePointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      mouseRef.current.x =
        ((e.clientX / window.innerWidth) * 2 - 1) * (viewport.width / 2);
      mouseRef.current.y =
        (-(e.clientY / window.innerHeight) * 2 + 1) * (viewport.height / 2);
    },
    [viewport]
  );

  useFrame((_, delta) => {
    if (!meshRef.current || !linesRef.current) return;

    timeRef.current += delta;

    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const { positions, velocities, sizes } = particles;
    const connectionCount = new Uint8Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i].add(velocities[i]);

      positions[i].x += Math.sin(timeRef.current * 0.3 + i * 0.5) * 0.001;
      positions[i].y += Math.cos(timeRef.current * 0.2 + i * 0.7) * 0.001;

      const dx = mouseRef.current.x - positions[i].x;
      const dy = mouseRef.current.y - positions[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        const force = (1 - dist / 4) * 0.008;
        positions[i].x += dx * force;
        positions[i].y += dy * force;
      }

      if (Math.abs(positions[i].x) > 12) velocities[i].x *= -1;
      if (Math.abs(positions[i].y) > 9) velocities[i].y *= -1;
      if (Math.abs(positions[i].z) > 5) velocities[i].z *= -1;

      dummy.position.copy(positions[i]);
      const pulse = 1 + Math.sin(timeRef.current * 2 + i) * 0.15;
      const s = sizes[i] * pulse;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (connectionCount[i] >= MAX_CONNECTIONS_PER_NODE) continue;
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        if (connectionCount[j] >= MAX_CONNECTIONS_PER_NODE) continue;
        const d = positions[i].distanceTo(positions[j]);
        if (d < CONNECTION_DISTANCE) {
          const alpha = (1 - d / CONNECTION_DISTANCE) * 0.5;
          linePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z
          );
          const t = (Math.sin(timeRef.current + i + j) + 1) * 0.5;
          lineColors.push(
            t * 0.66, 0.94 - t * 0.3, 1, alpha,
            0.66 - t * 0.3, 0.33 + t * 0.6, 0.97, alpha
          );
          connectionCount[i]++;
          connectionCount[j]++;
        }
      }
    }

    const geom = linesRef.current.geometry;
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    geom.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lineColors, 4)
    );
    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;
  });

  return (
    <group
      onPointerMove={(e) =>
        handlePointerMove({ clientX: e.clientX, clientY: e.clientY })
      }
    >
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <Particles />
    </Canvas>
  );
}
