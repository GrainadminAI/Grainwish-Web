import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 3D Perspective Cyber Farm Grid with scanning sweep line matching Image 2
function CyberFarmGrid() {
  const gridGroup = useRef();
  const scanLineRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (gridGroup.current) {
      gridGroup.current.position.y = -2.7 + Math.sin(t * 0.6) * 0.04;
    }
    if (scanLineRef.current) {
      // Sweep back and forth along the depth furrows
      scanLineRef.current.position.z = -10 + ((t * 4.5) % 16);
    }
  });

  return (
    <group ref={gridGroup} position={[0, -2.7, -1]} rotation={[-Math.PI / 2.35, 0, 0]}>
      {/* Perspective agricultural cyber furrows grid */}
      <gridHelper args={[36, 36, "#10b981", "#042c16"]} position={[0, 0, 0]} />
      
      {/* Scanning laser beam traveling through the crops */}
      <mesh ref={scanLineRef} position={[0, 0.02, 0]}>
        <planeGeometry args={[36, 0.45]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* Ground ambient depth glow */}
      <mesh position={[0, -0.05, 0]}>
        <planeGeometry args={[36, 36]} />
        <meshBasicMaterial color="#021a0d" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// Interactive Camera Parallax: subtle perspective response to user mouse movements
function CameraParallax() {
  useFrame(({ camera, mouse }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.35, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.8 + mouse.y * 0.2, 0.04);
    camera.lookAt(0, 0, -2);
  });
  return null;
}

export default function ThreeFarmCanvas() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.8, 6.5], fov: 48 }}
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
        <ambientLight intensity={0.75} />
        <directionalLight position={[8, 14, 8]} intensity={1.8} color="#fbbf24" />
        <directionalLight position={[-8, 6, -4]} intensity={0.9} color="#10b981" />
        <pointLight position={[0, 3, -1]} intensity={1.2} color="#34d399" />
        
        {/* Subtle Interactive Camera Parallax */}
        <CameraParallax />

        {/* 3D Perspective Agricultural Cyber Grid */}
        <CyberFarmGrid />

        {/* Floating Agricultural Pollen & Bio-Energy Sparkles */}
        <Sparkles count={isMobile ? 30 : 90} scale={[14, 9, 14]} size={3.2} speed={0.4} color="#fbbf24" opacity={0.7} />
        <Sparkles count={isMobile ? 25 : 75} scale={[12, 8, 12]} size={2.5} speed={0.5} color="#34d399" opacity={0.8} />
        <Sparkles count={isMobile ? 15 : 35} scale={[10, 7, 10]} size={2} speed={0.3} color="#f97316" opacity={0.6} />
      </Canvas>
    </div>
  );
}
