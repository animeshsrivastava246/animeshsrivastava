"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { LocationMarker } from "./LocationMarker";
import { IndiaBorder } from "./IndiaBorder";

const TEXTURES = {
  map: "/textures/earth/earth_atmos.jpg",
  normal: "/textures/earth/earth_normal.jpg",
  specular: "/textures/earth/earth_specular.jpg",
  clouds: "/textures/earth/earth_clouds.png",
};

export const Earth = ({ radius }: { radius: number }) => {
  const earthRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [map, normal, specular, clouds] = useTexture([
    TEXTURES.map,
    TEXTURES.normal,
    TEXTURES.specular,
    TEXTURES.clouds,
  ]);

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.001;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0015;
  });

  return (
    <group>
      <group ref={earthRef}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[radius, 48, 48]} />
          <meshPhongMaterial
            map={map}
            normalMap={normal}
            specularMap={specular}
            shininess={1}
            emissive={new THREE.Color("#1e3a8a")}
            emissiveIntensity={0.1}
          />
          <LocationMarker radius={radius} />
        </mesh>
        <IndiaBorder radius={radius} />
      </group>

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[radius + 0.01, 36, 36]} />
        <meshStandardMaterial
          map={clouds}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh scale={1.05}>
        <sphereGeometry args={[radius, 36, 36]} />
        <meshBasicMaterial
          color="#60a5fa"
          wireframe
          transparent
          opacity={0.01}
        />
      </mesh>
    </group>
  );
};
