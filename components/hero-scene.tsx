"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function FinancialSphere({ scrollY }) {
  const sphereRef = useRef()
  const ringRef = useRef()
  const { viewport } = useThree()

  useFrame((state, delta) => {
    if (sphereRef.current && ringRef.current) {
      // Rotate the sphere based on scroll
      sphereRef.current.rotation.y += delta * 0.2

      // Move the sphere up/down slightly based on scroll
      sphereRef.current.position.y = Math.sin(scrollY.current * 0.5) * 0.2

      // Rotate the ring at a different speed
      ringRef.current.rotation.z += delta * 0.1
      ringRef.current.rotation.x = Math.sin(scrollY.current * 0.3) * 0.2
    }
  })

  return (
    <group>
      {/* Main sphere */}
      <mesh ref={sphereRef}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#c0c0c0"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.4}
            metalness={0.9}
          />
        </Sphere>
      </mesh>

      {/* Ring around sphere */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Second ring at different angle */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.2, 0.03, 16, 100]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Financial chart elements */}
      <group position={[0, -0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[i * 0.2 - 0.4, Math.random() * 0.5, 0]}>
            <boxGeometry args={[0.1, 0.1 + Math.random() * 0.5, 0.1]} />
            <meshStandardMaterial color="#333" metalness={0.7} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Stars() {
  const starsRef = useRef()

  useEffect(() => {
    if (starsRef.current) {
      const positions = new Float32Array(2000 * 3)

      for (let i = 0; i < 2000; i++) {
        const i3 = i * 3
        positions[i3] = (Math.random() - 0.5) * 25
        positions[i3 + 1] = (Math.random() - 0.5) * 25
        positions[i3 + 2] = (Math.random() - 0.5) * 25
      }

      starsRef.current.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    }
  }, [])

  return (
    <points>
      <bufferGeometry ref={starsRef} />
      <pointsMaterial size={0.02} color="#ffffff" />
    </points>
  )
}

export default function HeroScene() {
  const scrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY / window.innerHeight
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <FinancialSphere scrollY={scrollY} />
        <Stars />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

