"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 2.5;

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6
        )
      );
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.003
        )
      );
    }
    return { positions, velocities };
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

  useFrame(() => {
    if (!meshRef.current || !linesRef.current) return;

    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const { positions, velocities } = particles;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i].add(velocities[i]);

      const mouseInfluence = 0.3;
      const dx = mouseRef.current.x - positions[i].x;
      const dy = mouseRef.current.y - positions[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        positions[i].x += dx * mouseInfluence * 0.01;
        positions[i].y += dy * mouseInfluence * 0.01;
      }

      if (Math.abs(positions[i].x) > 6) velocities[i].x *= -1;
      if (Math.abs(positions[i].y) > 5) velocities[i].y *= -1;
      if (Math.abs(positions[i].z) > 4) velocities[i].z *= -1;

      dummy.position.copy(positions[i]);
      const scale = 0.03 + Math.random() * 0.01;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const d = positions[i].distanceTo(positions[j]);
        if (d < CONNECTION_DISTANCE) {
          const alpha = 1 - d / CONNECTION_DISTANCE;
          linePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z
          );
          lineColors.push(0, 0.94, 1, alpha, 0.66, 0.33, 0.97, alpha);
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
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.9} />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <Particles />
    </Canvas>
  );
}
