"use client";

import { Suspense } from "react";
import {
  PerspectiveCamera,
  ContactShadows,
  OrbitControls,
  Preload,
} from "@react-three/drei";
import { Earth } from "./Earth";
import { Starfield } from "./Starfield";

export const Scene = () => {
  const EARTH_RADIUS = 3;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />

      <color attach="background" args={["#030712"]} />

      {/* High-fidelity offline lighting without external HDR download */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[12, 10, 8]} intensity={2.2} color="#fff7ed" />
      <directionalLight position={[-12, -8, -6]} intensity={1.2} color="#1e40af" />
      <pointLight position={[0, 4, 10]} intensity={120} color="#60a5fa" />

      <Suspense fallback={null}>
        <Earth radius={EARTH_RADIUS} />
        <Starfield count={2000} />

        {/* Baked shadow: frames=1 computes once on mount instead of 60fps */}
        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.35}
          scale={9}
          blur={1.5}
          far={4}
          frames={1}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={0.5}
          makeDefault
        />
        <Preload all />
      </Suspense>
    </>
  );
};
