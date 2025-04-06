"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Html,
} from "@react-three/drei";
import * as THREE from "three";

function AIBrain({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const brainRef = useRef();
  const particlesRef = useRef();

  useFrame((state, delta) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += delta * 0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Brain sphere */}
      <mesh ref={brainRef}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#ffd700"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.4}
            metalness={0.9}
          />
        </Sphere>
      </mesh>

      {/* Neural network particles */}
      <group ref={particlesRef}>
        {Array.from({ length: 100 }).map((_, i) => {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const radius = 1.8 + Math.random() * 0.5;

          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);

          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffd700"
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
      </group>

      {/* Neural connections */}
      {Array.from({ length: 50 }).map((_, i) => {
        const theta1 = Math.random() * Math.PI * 2;
        const phi1 = Math.acos(2 * Math.random() - 1);
        const radius1 = 1.8 + Math.random() * 0.5;

        const x1 = radius1 * Math.sin(phi1) * Math.cos(theta1);
        const y1 = radius1 * Math.sin(phi1) * Math.sin(theta1);
        const z1 = radius1 * Math.cos(phi1);

        const theta2 = Math.random() * Math.PI * 2;
        const phi2 = Math.acos(2 * Math.random() - 1);
        const radius2 = 1.8 + Math.random() * 0.5;

        const x2 = radius2 * Math.sin(phi2) * Math.cos(theta2);
        const y2 = radius2 * Math.sin(phi2) * Math.sin(theta2);
        const z2 = radius2 * Math.cos(phi2);

        // Create line geometry
        const points = [];
        points.push(new THREE.Vector3(x1, y1, z1));
        points.push(new THREE.Vector3(x2, y2, z2));
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={`line-${i}`} geometry={lineGeometry}>
            <lineBasicMaterial
              color="#ffd700"
              opacity={0.3}
              transparent={true}
            />
          </line>
        );
      })}

      {/* Feature labels */}
      <Html position={[2.5, 0, 0]} center>
        <div className="bg-gray-800/80 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-3 w-48">
          <h3 className="text-white font-medium text-sm mb-1">
            Behavioral Analysis
          </h3>
          <p className="text-gray-300 text-xs">
            Identifies spending patterns and triggers
          </p>
        </div>
      </Html>

      <Html position={[-2.5, 0.8, 0]} center>
        <div className="bg-gray-800/80 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-3 w-48">
          <h3 className="text-white font-medium text-sm mb-1">
            Real-time Nudges
          </h3>
          <p className="text-gray-300 text-xs">
            Personalized notifications at the right moment
          </p>
        </div>
      </Html>

      <Html position={[0, -2.5, 0]} center>
        <div className="bg-gray-800/80 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-3 w-48">
          <h3 className="text-white font-medium text-sm mb-1">
            Predictive Analytics
          </h3>
          <p className="text-gray-300 text-xs">
            Forecasts spending behavior and savings potential
          </p>
        </div>
      </Html>
    </group>
  );
}

export default function AIFeatures3D() {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <AIBrain />
        <Environment preset="night" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
