import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 3D Procedural Wind-Swaying Crop Field (Wheat & Paddy Stalks)
// Directly inspired by Google Flow Video: "making the image come alive wind blowing and crop leaves moving"
function WindCropsField() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate crop stalk positions along agricultural furrows
  const stalks = useMemo(() => {
    const list = [];
    const rows = 12;
    const cols = 16;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Natural organic jitter so it looks like a real crop field
        const jitterX = (Math.random() - 0.5) * 0.8;
        const jitterZ = (Math.random() - 0.5) * 0.8;
        const x = (c - cols / 2) * 1.6 + jitterX;
        const z = -r * 1.8 + jitterZ - 2;
        const y = -2.6 + (Math.sin(x * 0.3) + Math.cos(z * 0.2)) * 0.15;
        const scale = 0.85 + Math.random() * 0.45;
        const speed = 2.0 + Math.random() * 0.8;
        const phase = Math.random() * Math.PI * 2;
        
        // Colors: gradient from healthy emerald to golden wheat head
        const isGoldenWheat = (r + c) % 3 === 0;
        const color = isGoldenWheat
          ? new THREE.Color(0xfbbf24).lerp(new THREE.Color(0xf59e0b), Math.random() * 0.5)
          : new THREE.Color(0x10b981).lerp(new THREE.Color(0x34d399), Math.random() * 0.4);

        list.push({ x, y, z, scale, speed, phase, color });
      }
    }
    return list;
  }, []);

  // Single shared crop geometry (stalk + wheat ear)
  const stalkGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.02, 0.045, 1.6, 6);
    // Shift pivot to bottom of stalk so it sways from ground up
    geo.translate(0, 0.8, 0);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    stalks.forEach((stalk, i) => {
      // Harmonic wave propagation simulating natural wind gusts
      const windWave = Math.sin(t * stalk.speed + stalk.x * 0.4 + stalk.z * 0.35 + stalk.phase);
      const windCross = Math.cos(t * (stalk.speed * 0.7) + stalk.z * 0.4) * 0.08;
      
      const swayZ = windWave * 0.22;
      const swayX = windCross * 0.12;

      dummy.position.set(stalk.x, stalk.y, stalk.z);
      dummy.rotation.set(swayZ, 0, swayX);
      dummy.scale.set(stalk.scale, stalk.scale * (1 + Math.sin(t * 1.5) * 0.04), stalk.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, stalk.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[stalkGeo, null, stalks.length]}
    >
      <meshStandardMaterial
        color="#fbbf24"
        roughness={0.26}
        metalness={0.38}
        emissive="#064e26"
        emissiveIntensity={0.35}
      />
    </instancedMesh>
  );
}

// Radiant Solar Energy Rays streaming down to energize crops
// Directly matches Google Flow prompt: "show that the sun give energy to all crops"
function SolarEnergyRays() {
  const raysGroup = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (raysGroup.current) {
      // Gentle warm oscillating solar flare intensity
      raysGroup.current.rotation.z = Math.sin(t * 0.25) * 0.04;
      raysGroup.current.position.y = 4.5 + Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group ref={raysGroup} position={[7, 4.5, -6]} rotation={[-0.4, -0.6, 0.45]}>
      {/* Central solar core glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshBasicMaterial color="#fef08a" transparent opacity={0.65} />
      </mesh>
      
      {/* Volumetric Sun Beams streaming down toward the field */}
      {[
        { pos: [-1.2, -4, 1.5], radius: [0.3, 1.8, 12], op: 0.35, col: '#fde047' },
        { pos: [0.5, -4.5, 0], radius: [0.4, 2.4, 14], op: 0.45, col: '#fbbf24' },
        { pos: [2.0, -3.8, -1.2], radius: [0.3, 2.0, 11], op: 0.3, col: '#f59e0b' },
        { pos: [-2.5, -4.2, 0.8], radius: [0.25, 1.6, 13], op: 0.28, col: '#fef08a' }
      ].map((ray, idx) => (
        <mesh key={idx} position={ray.pos} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[ray.radius[0], ray.radius[1], ray.radius[2], 16, 1, true]} />
          <meshBasicMaterial
            color={ray.col}
            transparent
            opacity={ray.op}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Smart Precision AgriTech Cyber Furrows & Scanning Laser Radar
function SmartAgriGrid() {
  const gridGroup = useRef();
  const scanLineRef = useRef();
  const radarRingRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (gridGroup.current) {
      gridGroup.current.position.y = -2.75 + Math.sin(t * 0.4) * 0.03;
    }
    if (scanLineRef.current) {
      // Sweep forward and backward along crop depth
      scanLineRef.current.position.z = -16 + ((t * 4.8) % 24);
    }
    if (radarRingRef.current) {
      // Expanding precision agritech scan ring
      const ringScale = ((t * 1.8) % 8) + 0.5;
      radarRingRef.current.scale.set(ringScale, ringScale, 1);
      radarRingRef.current.material.opacity = Math.max(0, 0.6 - (ringScale / 8) * 0.6);
    }
  });

  return (
    <group ref={gridGroup} position={[0, -2.75, -2]} rotation={[-Math.PI / 2.35, 0, 0]}>
      {/* Precision Agricultural Cyber Furrows Grid */}
      <gridHelper args={[44, 44, '#10b981', '#042c16']} position={[0, 0, 0]} />

      {/* Laser Scanning Beam traveling through crop rows */}
      <mesh ref={scanLineRef} position={[0, 0.03, 0]}>
        <planeGeometry args={[44, 0.5]} />
        <meshBasicMaterial
          color="#34d399"
          transparent
          opacity={0.75}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Expanding AgriTech Soil Health Radar Ring */}
      <mesh ref={radarRingRef} position={[0, 0.02, -4]} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.8, 1.05, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Dark nutrient ground depth */}
      <mesh position={[0, -0.05, 0]}>
        <planeGeometry args={[44, 44]} />
        <meshBasicMaterial color="#02140b" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// IoT Telemetry Beacons placed along the crop rows
function TelemetryBeacons() {
  const beacons = useMemo(() => [
    { x: -5, z: -4, label: 'Soil NPK #1' },
    { x: 4.5, z: -6, label: 'Moisture #2' },
    { x: -2, z: -9, label: 'Chlorophyll #3' },
    { x: 3, z: -12, label: 'Weather #4' },
  ], []);

  const beaconGroup = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (beaconGroup.current) {
      beaconGroup.current.children.forEach((child, idx) => {
        child.position.y = -2.6 + Math.sin(t * 2 + idx) * 0.08;
      });
    }
  });

  return (
    <group ref={beaconGroup}>
      {beacons.map((b, i) => (
        <group key={i} position={[b.x, -2.6, b.z]}>
          {/* Vertical telemetry laser beam to cloud */}
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.015, 0.025, 5, 8]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.45} blending={THREE.AdditiveBlending} />
          </mesh>
          {/* Holographic IoT Sensor Node */}
          <mesh position={[0, 0.2, 0]}>
            <octahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} wireframe />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Interactive Camera Parallax: smooth response to cursor and touch
function CameraParallax() {
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.6, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.7 + pointer.y * 0.35, 0.035);
    camera.lookAt(0, -0.6, -5);
  });
  return null;
}

export default function ThreeFarmCanvas() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 1.7, 6.5], fov: 46 }}
        dpr={isMobile ? [1, 1.5] : [1, 2.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.35
        }}
        className="w-full h-full pointer-events-none"
      >
        <ambientLight intensity={0.95} color="#e6f4ea" />
        <directionalLight position={[9, 15, 6]} intensity={3.2} color="#fef08a" />
        <directionalLight position={[-8, 8, -3]} intensity={1.6} color="#34d399" />
        <pointLight position={[0, 3.5, -2]} intensity={2.2} color="#10b981" />
        <pointLight position={[5, 2, -5]} intensity={2.4} color="#fbbf24" />

        {/* Interactive Smooth Camera Parallax */}
        <CameraParallax />

        {/* Radiant Sun Energy Rays (Solar Photons feeding crops) */}
        <SolarEnergyRays />

        {/* 3D Wind-Swaying Real Crop Field (Wheat & Paddy Stalks) */}
        <WindCropsField />

        {/* Smart Precision AgriTech Cyber Furrow Grid & Radar */}
        <SmartAgriGrid />

        {/* IoT Agricultural Sensor Telemetry Beacons */}
        <TelemetryBeacons />

        {/* Multi-Spectrum Floating Solar Pollen & Bio-Luminescence Particles */}
        <Sparkles
          count={isMobile ? 35 : 110}
          scale={[16, 9, 16]}
          size={3.4}
          speed={0.45}
          color="#fbbf24"
          opacity={0.85}
        />
        <Sparkles
          count={isMobile ? 30 : 90}
          scale={[14, 8, 14]}
          size={2.8}
          speed={0.55}
          color="#34d399"
          opacity={0.9}
        />
        <Sparkles
          count={isMobile ? 15 : 45}
          scale={[12, 7, 12]}
          size={2.2}
          speed={0.35}
          color="#38bdf8"
          opacity={0.7}
        />
      </Canvas>
    </div>
  );
}
