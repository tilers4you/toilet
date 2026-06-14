"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type ServiceModelProps = {
  url: string;
  label: string;
  scale?: number;
  rotationSpeed?: number;
  className?: string;
};

function RotatingModel({
  url,
  scale = 1,
  rotationSpeed = 0.25,
}: Pick<ServiceModelProps, "url" | "scale" | "rotationSpeed">) {
  const groupRef = useRef<Group>(null);
  const gltf = useLoader(GLTFLoader, url);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <group ref={groupRef} position={[0, -0.75, 0]} scale={scale}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function ModelFallback({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-28 w-28 rounded-full border border-primary/20 bg-background/80 shadow-inner" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function ServiceModel({
  url,
  label,
  scale = 1,
  rotationSpeed = 0.25,
  className = "",
}: ServiceModelProps) {
  return (
    <div className={`relative ${className}`} aria-label={label} role="img">
      <ModelFallback label={label} />
      <Canvas
        camera={{ position: [0, 1.2, 5], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} />
        <directionalLight position={[-4, 2, -2]} intensity={0.6} />
        <Suspense fallback={null}>
          <RotatingModel url={url} scale={scale} rotationSpeed={rotationSpeed} />
        </Suspense>
      </Canvas>
    </div>
  );
}
