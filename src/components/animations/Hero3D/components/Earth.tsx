"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { LocationMarker } from "./LocationMarker";

const TEXTURES = {
  map: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
  normal: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
  specular: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
  clouds: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
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
          <sphereGeometry args={[radius, 80, 80]} />
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
      </group>

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[radius + 0.01, 64, 64]} />
        <meshStandardMaterial
          map={clouds}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh scale={1.05}>
        <sphereGeometry args={[radius, 64, 64]} />
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
