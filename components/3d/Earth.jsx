"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { useRef } from "react";

function EarthMesh() {
  const earthRef = useRef();
  const texture = useTexture("/earth.jpg"); // Put earth.jpg in /public folder

  useFrame(() => {
    earthRef.current.rotation.y += 0.0018; // smooth spin
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Earth() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Canvas camera={{ position: [5, 2, 5], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <EarthMesh />
        <OrbitControls enableZoom={true} enablePan={false} />
        <Stars radius={80} depth={50} count={8000} factor={4} />
      </Canvas>
    </div>
  );
}
