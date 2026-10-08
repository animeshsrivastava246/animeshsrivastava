"use client";

import React, { useEffect, useRef } from "react";

// Coordinates for Bengaluru, India
const BENGALURU_LAT = 12.9716 * (Math.PI / 180);
const BENGALURU_LON = 77.5946 * (Math.PI / 180);

export default function HeroHUDFallback() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let rotationY = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let width = 0;
    let height = 0;

    // Pre-generate stars for background
    const starCount = 120;
    const stars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Re-scatter stars
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Pointer events for smooth drag rotation
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      lastMouseX = "touches" in e ? e.touches[0].clientX : e.clientX;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - lastMouseX;
      rotationY += deltaX * 0.006;
      lastMouseX = clientX;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", onPointerDown, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("mouseup", onPointerUp, { passive: true });
    window.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp, { passive: true });

    let lastTime = performance.now();
    let pulseTime = 0;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      pulseTime += dt;

      if (!isDragging) {
        rotationY += 0.35 * dt; // Smooth auto-rotation
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Starfield
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const flicker = Math.sin(time * s.speed + i) * 0.25;
        ctx.fillStyle = `rgba(190, 220, 255, ${Math.max(0.1, s.alpha + flicker)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Globe parameters
      const centerX = width > 768 ? width * 0.55 : width * 0.5;
      const centerY = height * 0.48;
      const radius = Math.min(width, height) * (width > 768 ? 0.32 : 0.38);

      // 2. Atmospheric Outer Glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.8,
        centerX,
        centerY,
        radius * 1.35
      );
      glowGrad.addColorStop(0, "rgba(59, 130, 246, 0.15)");
      glowGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.08)");
      glowGrad.addColorStop(1, "rgba(3, 7, 18, 0)");

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 3. Globe Base Circle
      const baseGrad = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      baseGrad.addColorStop(0, "#0b1528");
      baseGrad.addColorStop(0.7, "#060b17");
      baseGrad.addColorStop(1, "#030712");

      ctx.fillStyle = baseGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Globe Rim
      ctx.strokeStyle = "rgba(96, 165, 250, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 4. Latitude Rings
      ctx.lineWidth = 1;
      const latCount = 6;
      for (let i = 1; i < latCount; i++) {
        const phi = (i / latCount) * Math.PI - Math.PI / 2;
        const rLat = radius * Math.cos(phi);
        const yLat = centerY - radius * Math.sin(phi);

        ctx.strokeStyle = "rgba(59, 130, 246, 0.18)";
        ctx.beginPath();
        ctx.ellipse(centerX, yLat, rLat, rLat * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5. Longitude Rings (Rotating)
      const lonCount = 12;
      for (let i = 0; i < lonCount; i++) {
        const angle = rotationY + (i / lonCount) * Math.PI * 2;
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // Only draw front-facing hemisphere rings brighter
        const isFront = cosAngle >= -0.1;
        const rLonX = Math.abs(cosAngle) * radius;

        ctx.strokeStyle = isFront
          ? `rgba(96, 165, 250, ${0.12 + Math.max(0, cosAngle) * 0.25})`
          : "rgba(59, 130, 246, 0.05)";
        ctx.lineWidth = isFront ? 1.2 : 0.8;

        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY,
          Math.max(0.1, rLonX),
          radius,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // 6. Tactical HUD Outer Orbital Ring
      ctx.save();
      ctx.strokeStyle = "rgba(59, 130, 246, 0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating HUD accent arc
      ctx.setLineDash([30, 160]);
      ctx.strokeStyle = "rgba(147, 197, 253, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.15, time * 0.001, time * 0.001 + Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 7. Bengaluru Location Beacon Projection
      const bLon = BENGALURU_LON + rotationY;
      const bX = radius * Math.cos(BENGALURU_LAT) * Math.sin(bLon);
      const bY = -radius * Math.sin(BENGALURU_LAT);
      const bZ = radius * Math.cos(BENGALURU_LAT) * Math.cos(bLon);

      // If Bengaluru is facing the camera (positive Z)
      if (bZ > -radius * 0.1) {
        const pinScreenX = centerX + bX;
        const pinScreenY = centerY + bY;
        const pinAlpha = Math.max(0.2, (bZ / radius) * 0.8 + 0.2);

        // Radar expansion ring
        const pulse = Math.abs((pulseTime * 1.5) % 1);
        const ringRadius = Math.max(0.1, 4 + pulse * 24);
        const ringAlpha = Math.max(0, Math.min(1, (1 - pulse) * pinAlpha * 0.9));

        if (ringRadius > 0 && ringAlpha > 0) {
          ctx.strokeStyle = `rgba(34, 197, 94, ${ringAlpha})`;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(pinScreenX, pinScreenY, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Pin Glow
        const pinGlow = ctx.createRadialGradient(
          pinScreenX,
          pinScreenY,
          1,
          pinScreenX,
          pinScreenY,
          12
        );
        pinGlow.addColorStop(0, `rgba(74, 222, 128, ${pinAlpha})`);
        pinGlow.addColorStop(0.5, `rgba(34, 197, 94, ${pinAlpha * 0.6})`);
        pinGlow.addColorStop(1, "rgba(34, 197, 94, 0)");

        ctx.fillStyle = pinGlow;
        ctx.beginPath();
        ctx.arc(pinScreenX, pinScreenY, 12, 0, Math.PI * 2);
        ctx.fill();

        // Pin Core Dot
        ctx.fillStyle = `rgba(240, 253, 244, ${pinAlpha})`;
        ctx.beginPath();
        ctx.arc(pinScreenX, pinScreenY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Tactical HUD Label Callout Line & Tag
        if (bZ > radius * 0.2) {
          const calloutX = pinScreenX + 32;
          const calloutY = pinScreenY - 24;

          ctx.strokeStyle = `rgba(34, 197, 94, ${pinAlpha * 0.7})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pinScreenX, pinScreenY);
          ctx.lineTo(pinScreenX + 16, pinScreenY - 16);
          ctx.lineTo(calloutX + 50, pinScreenY - 16);
          ctx.stroke();

          ctx.fillStyle = `rgba(34, 197, 94, ${pinAlpha * 0.95})`;
          ctx.font = "bold 9px monospace";
          ctx.fillText("BENGALURU // IN", pinScreenX + 20, pinScreenY - 20);

          ctx.fillStyle = `rgba(167, 243, 208, ${pinAlpha * 0.7})`;
          ctx.font = "8px monospace";
          ctx.fillText("12.97°N, 77.59°E", pinScreenX + 20, pinScreenY - 8);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* Cinematic Gradient Overlay */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #030712 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
