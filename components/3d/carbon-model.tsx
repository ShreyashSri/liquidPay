"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Text, MeshDistortMaterial, Sphere } from "@react-three/drei"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

// Fallback 3D model when GLB isn't available
function FallbackModel({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + scrollY * 0.001
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }

    if (textRef.current) {
      textRef.current.rotation.y = state.clock.elapsedTime * 0.2 + scrollY * 0.001
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + 0.5
    }
  })

  return (
    <group>
      <Sphere args={[1.5, 32, 32]} ref={meshRef}>
        <MeshDistortMaterial
          color="#22c55e"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      <Text ref={textRef} position={[0, 0.5, 0]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
        CarbonBid
      </Text>

      {/* Orbiting particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Particle
          key={i}
          radius={2 + Math.random() * 0.5}
          speed={0.1 + Math.random() * 0.2}
          offset={(i * Math.PI) / 10}
          scrollY={scrollY}
        />
      ))}
    </group>
  )
}

function Particle({
  radius,
  speed,
  offset,
  scrollY,
}: { radius: number; speed: number; offset: number; scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + offset
      meshRef.current.position.x = Math.cos(time * speed) * radius
      meshRef.current.position.z = Math.sin(time * speed) * radius
      meshRef.current.position.y = Math.sin(time * speed * 2) * 0.5

      // Pulse scale based on scroll
      const scale = 0.08 + Math.sin(time * 2) * 0.02 + scrollY * 0.0001
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={0.5} transparent opacity={0.8} />
    </mesh>
  )
}

// Main component that will be exported as default
export default function CarbonModel({ scrollY }: { scrollY: number }) {
  const [autoRotate, setAutoRotate] = useState(true)

  useEffect(() => {
    // Disable auto-rotate when user scrolls
    if (scrollY > 100 && autoRotate) {
      setAutoRotate(false)
    }
  }, [scrollY, autoRotate])

  return (
    <div className="relative w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <FallbackModel scrollY={scrollY} />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={1.5} far={4.5} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      <div className="absolute bottom-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
          onClick={() => setAutoRotate(!autoRotate)}
        >
          <RotateCcw className={`h-4 w-4 ${autoRotate ? "text-green-600" : "text-muted-foreground"}`} />
        </Button>
      </div>
    </div>
  )
}

