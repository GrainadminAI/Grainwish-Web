import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Crop Stalk Mesh
function CropStalk({ position, height = 2, delay = 0, color = "#10b981" }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t * 1.5) * 0.08;
      meshRef.current.rotation.x = Math.cos(t * 1.2) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Stem */}
      <mesh ref={meshRef} position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.04, 0.08, height, 8]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.2}
          emissive="#042f1e"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Golden Grain Spike at Top */}
      <mesh position={[0, height + 0.3, 0]}>
        <coneGeometry args={[0.15, 0.7, 8]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.3}
          metalness={0.4}
          emissive="#d97706"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

// 3D Holographic AI Scanner Sphere
function HologramScannerOrb() {
  const orbRef = useRef();
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (orbRef.current) {
      orbRef.current.rotation.y = t * 0.8;
      orbRef.current.rotation.x = t * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 1.2;
      ringRef.current.rotation.x = t * 0.6;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5} position={[0, 1.2, 0]}>
      {/* Outer Hologram Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.6, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#10b981"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>

      {/* Core Glowing Orb */}
      <mesh ref={orbRef}>
        <icosahedronGeometry args={[0.9, 2]} />
        <MeshWobbleMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={1.5}
          factor={0.4}
          speed={2}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner AI Core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={3}
        />
      </mesh>
    </Float>
  );
}

// Interactive Field Grid
function FarmFieldGrid() {
  const crops = useMemo(() => {
    const arr = [];
    for (let x = -8; x <= 8; x += 1.2) {
      for (let z = -8; z <= 8; z += 1.2) {
        // Skip middle area for orb
        if (Math.abs(x) < 2 && Math.abs(z) < 2) continue;
        const h = 1.8 + Math.random() * 0.8;
        const isGold = Math.random() > 0.6;
        arr.push({
          id: `${x}-${z}`,
          position: [x + (Math.random() * 0.3 - 0.15), 0, z + (Math.random() * 0.3 - 0.15)],
          height: h,
          delay: Math.random() * 5,
          color: isGold ? "#f59e0b" : "#10b981"
        });
      }
    }
    return arr;
  }, []);

  return (
    <group position={[0, -2, 0]}>
      {crops.map((c) => (
        <CropStalk key={c.id} position={c.position} height={c.height} delay={c.delay} color={c.color} />
      ))}
      {/* Ground Grid */}
      <gridHelper args={[24, 24, "#10b981", "#083320"]} position={[0, 0, 0]} />
    </group>
  );
}

export default function ThreeFarmCanvas() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 2, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#fbbf24" />
        <pointLight position={[-5, 5, -5]} intensity={1} color="#10b981" />
        
        {/* Glowing Hologram Core */}
        <HologramScannerOrb />

        {/* 3D Crop Field */}
        <FarmFieldGrid />

        {/* Floating Agricultural Dust / Pollen Sparkles */}
        <Sparkles count={120} scale={[12, 10, 12]} size={3} speed={0.4} color="#f59e0b" opacity={0.6} />
        <Sparkles count={80} scale={[10, 8, 10]} size={2} speed={0.6} color="#34d399" opacity={0.8} />

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
