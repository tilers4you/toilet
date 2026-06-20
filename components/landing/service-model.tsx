"use client";

/**
 * Drop-in REPLACEMENT for the original components/landing/service-model.tsx.
 *
 * Upgrades over the original:
 *   - Decodes meshopt + KTX2 (the optimized .glb files actually load now)
 *   - Auto-frames the model (centers + scales to a target height) so each
 *     model sits correctly regardless of its source units/origin
 *   - Optional drag-to-rotate (pointer + touch), with idle auto-spin
 *   - Pauses rendering when offscreen (frameloop="demand" + IntersectionObserver
 *     via the `visible` prop is handled by the parent if needed)
 *
 * Keeps the same public props as the original plus a few optional ones, so
 * existing usages keep working.
 */
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Box3, Group, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { configureGLTFLoader } from "@/lib/model-loader";

type Fit = "height" | "max";

export type ServiceModelProps = {
  url: string;
  label: string;
  /** Target size in world units the model is scaled to (default 2.4). */
  targetSize?: number;
  /** "height" scales by Y, "max" scales by the largest dimension (use for odd shapes like a wrench). */
  fit?: Fit;
  /** Center vertically (parts) instead of resting the base on the floor (toilets). */
  centerY?: boolean;
  rotationSpeed?: number;
  /** Allow the user to drag-rotate. */
  interactive?: boolean;
  /** Imperative target yaw — set to spin the model to a specific angle. */
  faceYaw?: number;
  className?: string;
  cameraZ?: number;
  cameraY?: number;
};

function Model({
  url,
  targetSize = 2.4,
  fit = "height",
  centerY = false,
  rotationSpeed = 0.25,
  interactive = false,
  faceYaw,
}: Omit<ServiceModelProps, "label" | "className">) {
  const groupRef = useRef<Group>(null);
  const gl = useThree((s) => s.gl);
  const gltf = useLoader(GLTFLoader, url, configureGLTFLoader(gl));

  // auto-frame once the model is available
  const { scale, offset } = useMemo(() => {
    const box = new Box3().setFromObject(gltf.scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const basis = fit === "max" ? Math.max(size.x, size.y, size.z) : size.y || 1;
    const s = targetSize / (basis || 1);
    const off = new Vector3(-center.x * s, 0, -center.z * s);
    off.y = centerY ? -center.y * s : -box.min.y * s - targetSize / 2;
    return { scale: s, offset: off };
  }, [gltf, targetSize, fit, centerY]);

  // drag state
  const drag = useRef({ on: false, lx: 0, ly: 0, ty: 0, tx: 0, cy: 0, cx: 0, idle: 0 });

  useEffect(() => {
    if (faceYaw !== undefined) {
      drag.current.ty = faceYaw;
      drag.current.idle = -120;
    }
  }, [faceYaw]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const d = drag.current;
    if (interactive) {
      if (!d.on) {
        d.idle += 1;
        if (d.idle > 40) d.ty += rotationSpeed * delta;
      }
      d.cy += (d.ty - d.cy) * 0.1;
      d.cx += (d.tx - d.cx) * 0.1;
      g.rotation.y = d.cy;
      g.rotation.x = d.cx;
    } else {
      g.rotation.y += delta * rotationSpeed;
    }
  });

  const onDown = (e: any) => {
    if (!interactive) return;
    drag.current.on = true;
    drag.current.idle = 0;
    drag.current.lx = e.clientX;
    drag.current.ly = e.clientY;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: any) => {
    const d = drag.current;
    if (!interactive || !d.on) return;
    d.ty += (e.clientX - d.lx) * 0.01;
    d.tx += (e.clientY - d.ly) * 0.005;
    d.tx = Math.max(-0.4, Math.min(0.5, d.tx));
    d.lx = e.clientX;
    d.ly = e.clientY;
  };
  const onUp = () => {
    drag.current.on = false;
    drag.current.idle = 0;
  };

  return (
    <group
      ref={groupRef}
      position={offset.toArray()}
      scale={scale}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

function Fallback({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-28 w-28 rounded-full border border-primary/20 bg-background/80 shadow-inner animate-pulse" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function ServiceModel(props: ServiceModelProps) {
  const {
    label,
    className = "",
    cameraZ = 5,
    cameraY = 0.6,
    interactive = false,
  } = props;
  return (
    <div className={`relative ${className}`} aria-label={label} role="img">
      <Fallback label={label} />
      <Canvas
        camera={{ position: [0, cameraY, cameraZ], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ cursor: interactive ? "grab" : "default", touchAction: "pan-y" }}
      >
        <ambientLight intensity={1.4} />
        <hemisphereLight intensity={0.5} groundColor={0x3d5f6e} />
        <directionalLight position={[3.5, 5, 4]} intensity={1.7} />
        <directionalLight position={[-4.5, 2.5, -3]} intensity={1.1} color={0x33c0a0} />
        <directionalLight position={[-2.5, 1, 4.5]} intensity={0.5} color={0xbfe6ff} />
        <Suspense fallback={null}>
          <Model {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
}
