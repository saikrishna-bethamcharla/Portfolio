import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function PortraitMesh({ src }: { src: string }) {
  const texture = useTexture(src);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle floating breathing rhythm
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.04;
    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.03;
    meshRef.current.rotation.x = Math.cos(t * 0.5) * 0.02;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.8, 3.5, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Scene3D({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl bg-[#06080e] ${className}`}
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#06080e']} />
        <ambientLight intensity={0.7} />
        {/* Cinematic Dual Rim Lights */}
        <pointLight position={[-3, 2, 3]} intensity={2.5} color="#ff3d5a" />
        <pointLight position={[3, -1, 3]} intensity={1.8} color="#4060ff" />
        <directionalLight position={[0, 4, 3]} intensity={0.8} />

        <Suspense fallback={null}>
          <PortraitMesh src={src} />
        </Suspense>
      </Canvas>

      {/* Cinematic Vignette + Bottom Fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 via-35% to-transparent" />
      <div className="scanlines" />

      {/* STARRING Overlay Badges */}
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff3d5a] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            STARRING
          </span>
          <span className="block font-display text-2xl tracking-wide text-bone drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {alt.replace('Portrait of ', '')}
          </span>
        </div>
        <span className="rounded border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] font-mono tracking-wider text-mist backdrop-blur-sm">
          S01–S05
        </span>
      </div>
    </div>
  );
}
