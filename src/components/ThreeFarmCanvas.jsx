import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Low-profile rolling field furrows
function LowProfileFieldGrid() {
  const gridRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (gridRef.current) {
      gridRef.current.rotation.y = t * 0.04;
      gridRef.current.position.y = -3.2 + Math.sin(t * 0.8) * 0.08;
    }
  });

  return (
    <group ref={gridRef} position={[0, -3.2, -2]}>
      {/* Expansive Regenerative Soil Field Matrix */}
      <gridHelper args={[32, 32, "#10b981", "#052617"]} position={[0, 0, 0]} />
      
      {/* Secondary concentric contour rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[2, 14, 32]} />
        <meshBasicMaterial color="#064e3b" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function ThreeFarmCanvas() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 2, 7], fov: 50 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false
        }}
        className="w-full h-full pointer-events-none"
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#fbbf24" />
        <directionalLight position={[-10, 8, -6]} intensity={1.0} color="#e0633b" />
        <pointLight position={[-5, 5, -5]} intensity={1} color="#10b981" />
        
        {/* Low-profile Agricultural Ground Grid & Depth */}
        <LowProfileFieldGrid />

        {/* Floating Agricultural Dust / Pollen Sparkles */}
        <Sparkles count={isMobile ? 35 : 120} scale={[12, 10, 12]} size={3} speed={0.4} color="#f59e0b" opacity={0.6} />
        <Sparkles count={isMobile ? 25 : 80} scale={[10, 8, 10]} size={2} speed={0.6} color="#34d399" opacity={0.8} />
        <Sparkles count={isMobile ? 15 : 40} scale={[10, 7, 10]} size={2} speed={0.3} color="#e0633b" opacity={0.6} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
          rotateSpeed={0.4}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Decorative Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-[#021109]/40 to-[#021109]" />
    </div>
  );
}
