"use client";

import { Suspense, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";

// --- Loading Spinner ---
function GlobeLoader() {
  return (
    <div
      aria-label="Loading globe…"
      className="absolute inset-0 flex items-center justify-center bg-[#030712]"
    >
      <div className="w-9 h-9 border-2 border-white/15 border-t-white/60 rounded-full animate-spin" />
    </div>
  );
}

// --- Error Boundary ---
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return (
      <div className="absolute inset-0 flex items-center justify-center text-white/20">
        3D Render Failed
      </div>
    );
    return this.props.children;
  }
}

const Hero3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 pointer-events-auto">
        <ErrorBoundary>
          <Suspense fallback={<GlobeLoader />}>
            <Canvas
              shadows
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
              }}
            >
              <Scene />
            </Canvas>
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Cinematic Gradient Overlay */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #030712 0%, transparent 50%)' }}
      />
    </div>
  );
};

export default Hero3D;
