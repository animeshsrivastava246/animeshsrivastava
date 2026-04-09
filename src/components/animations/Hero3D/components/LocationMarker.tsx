"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Cone } from "@react-three/drei";

const LUCKNOW = { lat: 26.8467, lon: 80.9462 };

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

export const LocationMarker = ({ radius }: { radius: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const pinRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const pinColor = "#ef4444";

  const pos = useMemo(() => latLonToVec3(LUCKNOW.lat, LUCKNOW.lon, radius), [radius]);
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
    return q;
  }, [pos]);

  useFrame(({ camera, clock }) => {
    if (!groupRef.current || !materialRef.current || !pinRef.current) return;

    const t = clock.getElapsedTime();

    // 1. Bounce Animation
    const bounce = Math.abs(Math.sin(t * 4)) * 0.2; 
    pinRef.current.position.y = bounce;

    // 2. Facing/Opacity Logic (using world position for occlusion)
    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);
    
    const directionToCamera = camera.position.clone().sub(worldPos).normalize();
    const surfaceNormal = worldPos.clone().normalize();
    const dot = surfaceNormal.dot(directionToCamera);

    const targetOpacity = THREE.MathUtils.mapLinear(dot, -1, 1, 0.3, 1.0);
    materialRef.current.opacity = THREE.MathUtils.lerp(
      materialRef.current.opacity,
      targetOpacity,
      0.1
    );
  });

  return (
    <group position={pos} quaternion={quaternion} ref={groupRef}>
      {/* 3D Pin Icon - High renderOrder to stay visible throughout */}
      <group ref={pinRef} scale={0.15} position={[0, 0, 0]}>
        {/* Pin Head */}
        <Sphere args={[0.5, 32, 32]} position={[0, 1.4, 0]} renderOrder={999}>
          <meshStandardMaterial 
            ref={materialRef}
            color={pinColor} 
            emissive={pinColor}
            emissiveIntensity={1.5}
            transparent 
            metalness={0.9}
            roughness={0.1}
            depthTest={false}
          />
        </Sphere>
        {/* Pin Body (Cone) - Base at top, Tip at origin */}
        <Cone args={[0.4, 1, 32]} position={[0, 0.5, 0]} rotation={[Math.PI, 0, 0]} renderOrder={998}>
          <meshStandardMaterial 
            color={pinColor} 
            emissive={pinColor}
            emissiveIntensity={0.8}
            transparent 
            opacity={0.8}
            metalness={0.8}
            roughness={0.2}
            depthTest={false}
          />
        </Cone>
      </group>
      
      {/* Surface point (remains pinned to surface) */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]} renderOrder={997}>
        <circleGeometry args={[0.025, 32]} />
        <meshBasicMaterial 
          color={pinColor} 
          transparent 
          opacity={0.6} 
          blending={THREE.AdditiveBlending} 
          depthTest={false}
        />
      </mesh>
    </group>
  );
};
