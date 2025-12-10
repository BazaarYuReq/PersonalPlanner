"use client";

import React, { Suspense, useMemo, useRef, useState, forwardRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Planet component with forwardRef for camera follow
const Planet = forwardRef(
  (
    {
      name,
      radius = 1,
      distance = 5,
      orbitSpeed = 0.01,
      rotationSpeed = 0.01,
      texture,
      tilt = 0,
      rings = null,
      showOrbit = true,
      children,
    },
    ref
  ) => {
    const meshRef = useRef();
    const orbitRef = useRef();
    const tex = useTexture(texture);

    const orbitGeo = useMemo(() => {
      const points = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * 2 * Math.PI;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * distance,
            0,
            Math.sin(angle) * distance
          )
        );
      }
      return new THREE.BufferGeometry().setFromPoints(points);
    }, [distance]);

    useFrame(({ clock }) => {
      const t = clock.getElapsedTime() * orbitSpeed;
      if (orbitRef.current) {
        orbitRef.current.position.x = Math.cos(t) * distance;
        orbitRef.current.position.z = Math.sin(t) * distance;
      }
      if (meshRef.current) {
        meshRef.current.rotation.y += rotationSpeed; // visible spin
        meshRef.current.rotation.z = THREE.MathUtils.degToRad(tilt);
      }
    });

    return (
      <group ref={ref}>
        {showOrbit && (
          <line geometry={orbitGeo}>
            <lineBasicMaterial color="#888" transparent opacity={0.25} />
          </line>
        )}

        <group ref={orbitRef}>
          <mesh ref={meshRef}>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshStandardMaterial
              map={tex}
              metalness={0} // realistic surface
              roughness={0.7} // slightly diffuse
            />
            <Html
              distanceFactor={10}
              style={{ pointerEvents: "none", color: "white", fontSize: 12 }}
              position={[0, radius + 0.6, 0]}
            >
              <div className="select-none text-xs">{name}</div>
            </Html>
            {children}
          </mesh>

          {rings && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry
                args={[rings.innerRadius, rings.outerRadius, 64, 1]}
              />
              <meshStandardMaterial
                map={useTexture(rings.texture)}
                side={THREE.DoubleSide}
                transparent
              />
            </mesh>
          )}
        </group>
      </group>
    );
  }
);

// Sun component
function Sun({ texture = "/textures/sun.jpg", intensity = 5, size = 3.5 }) {
  const tex = useTexture(texture);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.002;
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          map={tex}
          emissive={new THREE.Color(0xffffff)}
          emissiveMap={tex}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={intensity} distance={2000} />
      <ambientLight intensity={0.05} />
    </group>
  );
}

// Asteroid belt
function AsteroidBelt({ inner = 35, outer = 50, count = 2000 }) {
  const belt = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const radius = inner + Math.random() * (outer - inner);
      const y = (Math.random() - 0.5) * 0.5;
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);
      arr.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.BufferGeometry().setFromPoints(arr);
  }, [inner, outer, count]);

  return (
    <points geometry={belt}>
      <pointsMaterial size={0.1} color="#888" />
    </points>
  );
}

// Oort Cloud
function OortCloud({ min = 150, max = 180, count = 5000 }) {
  const cloud = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = min + Math.random() * (max - min);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.BufferGeometry().setFromPoints(arr);
  }, [min, max, count]);

  return (
    <points geometry={cloud}>
      <pointsMaterial size={0.3} color="#888" />
    </points>
  );
}

// Camera follow controller
function CameraController({ targetRef, mode }) {
  const { camera } = useThree();
  useFrame(() => {
    if (mode === "follow" && targetRef?.current) {
      const targetPos = new THREE.Vector3();
      targetRef.current.getWorldPosition(targetPos);
      camera.position.lerp(
        targetPos.clone().add(new THREE.Vector3(0, 5, 15)),
        0.05
      );
      camera.lookAt(targetPos);
    }
  });
  return null;
}

// Main SolarSystem
export default function SolarSystem({
  width = "100%",
  height = "100%",
  showOrbit = true,
}) {
  const [cameraMode, setCameraMode] = useState("free");
  const [followPlanet, setFollowPlanet] = useState("Earth");
  const planetRefs = useRef({});

  const planets = [
    {
      name: "Mercury",
      radius: 0.7,
      distance: 6,
      orbitSpeed: 0.2,
      rotationSpeed: 0.04,
      texture: "/textures/mercury.jpg",
    },
    {
      name: "Venus",
      radius: 0.95,
      distance: 10,
      orbitSpeed: 0.15,
      rotationSpeed: 0.03,
      texture: "/textures/venus.jpg",
    },
    {
      name: "Earth",
      radius: 1,
      distance: 14,
      orbitSpeed: 0.1,
      rotationSpeed: 0.05,
      texture: "/textures/earth.jpg",
    },
    {
      name: "Mars",
      radius: 0.8,
      distance: 19,
      orbitSpeed: 0.08,
      rotationSpeed: 0.04,
      texture: "/textures/mars.jpg",
    },
    {
      name: "Jupiter",
      radius: 2.2,
      distance: 30,
      orbitSpeed: 0.06,
      rotationSpeed: 0.08,
      texture: "/textures/jupiter.jpg",
    },
    {
      name: "Saturn",
      radius: 1.9,
      distance: 45,
      orbitSpeed: 0.05,
      rotationSpeed: 0.06,
      texture: "/textures/saturn.jpg",
      rings: {
        innerRadius: 2.3,
        outerRadius: 3.8,
        texture: "/textures/saturn-ring.png",
      },
    },
    {
      name: "Uranus",
      radius: 1.4,
      distance: 70,
      orbitSpeed: 0.04,
      rotationSpeed: 0.03,
      texture: "/textures/uranus.jpg",
    },
    {
      name: "Neptune",
      radius: 1.35,
      distance: 100,
      orbitSpeed: 0.03,
      rotationSpeed: 0.02,
      texture: "/textures/neptune.jpg",
    },
  ];

  return (
    <div style={{ width, height, position: "relative" }}>
      <button
        onClick={() => setCameraMode(cameraMode === "free" ? "follow" : "free")}
        style={{
          position: "absolute",
          zIndex: 10,
          top: 10,
          left: 10,
          padding: "6px 12px",
          background: "#222",
          color: "white",
          borderRadius: "4px",
        }}
      >
        {cameraMode === "free" ? `Follow ${followPlanet}` : "Free Camera"}
      </button>

      <Canvas shadows camera={{ position: [0, 50, 150], fov: 45 }}>
        <Suspense
          fallback={
            <Html center>
              <div className="text-white">Loading Solar System…</div>
            </Html>
          }
        >
          <Sun texture="/textures/sun.jpg" intensity={5} size={3.5} />

          {planets.map((p) => (
            <Planet
              key={p.name}
              name={p.name}
              radius={p.radius}
              distance={p.distance}
              orbitSpeed={p.orbitSpeed}
              rotationSpeed={p.rotationSpeed}
              texture={p.texture}
              tilt={p.tilt ?? 0}
              rings={p.rings}
              showOrbit={showOrbit}
              ref={(el) => (planetRefs.current[p.name] = el)}
            >
              {p.name === "Earth" && (
                <Planet
                  name="Moon"
                  radius={0.27}
                  distance={2.4}
                  orbitSpeed={0.3}
                  rotationSpeed={0.05}
                  texture="/textures/moon.jpg"
                  showOrbit={false}
                />
              )}
            </Planet>
          ))}

          <AsteroidBelt inner={35} outer={50} count={2000} />
          <OortCloud min={150} max={180} count={5000} />

          <CameraController
            targetRef={planetRefs.current[followPlanet]}
            mode={cameraMode}
          />
          <OrbitControls
            enablePan
            enableZoom
            maxDistance={500}
            minDistance={2}
            rotateSpeed={0.6}
            zoomSpeed={0.8}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
