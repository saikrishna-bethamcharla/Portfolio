import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotionPref } from '../hooks/useMedia';

function CinematicStarfield() {
  const count = 1800;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorRed = new THREE.Color('#ff3d5a');
    const colorWhite = new THREE.Color('#f4f1ec');
    const colorDim = new THREE.Color('#781828');

    for (let i = 0; i < count; i++) {
      // Cylindrical distribution around camera
      const radius = 10 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 80;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = Math.sin(theta) * radius;
      pos[i * 3 + 2] = z;

      // Color distribution: cinematic red accent, white, subtle dim red
      const choice = Math.random();
      const c = choice > 0.85 ? colorRed : choice > 0.4 ? colorWhite : colorDim;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    // Slow cinematic celestial drift
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingNebulaRings() {
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.04;
      ringRef1.current.rotation.x = 1.2 + Math.sin(t * 0.2) * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.03;
      ringRef2.current.rotation.y = Math.cos(t * 0.15) * 0.15;
    }
  });

  return (
    <group position={[0, 0, -15]}>
      {/* Outer subtle orbital ring */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[18, 0.04, 16, 100]} />
        <meshBasicMaterial color="#ff3d5a" transparent opacity={0.25} />
      </mesh>
      {/* Inner subtle orbital ring */}
      <mesh ref={ringRef2} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[12, 0.03, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function CinematicBg() {
  const reduced = useReducedMotionPref();

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
      style={{ opacity: 0.85 }}
    >
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <CinematicStarfield />
        <FloatingNebulaRings />
      </Canvas>
    </div>
  );
}
