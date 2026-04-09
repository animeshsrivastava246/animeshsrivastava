"use client";

import { Suspense } from "react";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  OrbitControls,
  Preload
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Earth } from "./Earth";
import { Starfield } from "./Starfield";

export const Scene = () => {
  const EARTH_RADIUS = 3;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />

      <color attach="background" args={["#030712"]} />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1000} color="#fff4e6" />
      <pointLight position={[-10, -10, -5]} intensity={500} color="#1e40af" />

      <Suspense fallback={null}>
        <Earth radius={EARTH_RADIUS} />
        <Starfield />
        <Environment preset="night" />

        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4.5}
        />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            mipmapBlur
            intensity={1.2}
            radius={0.4}
          />
        </EffectComposer>

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
