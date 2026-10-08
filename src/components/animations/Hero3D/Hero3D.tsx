"use client";

import { Suspense, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import HeroHUDFallback from "../HeroHUD/HeroHUDFallback";

// --- Robust Error Boundary with Seamless Fallback ---
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("3D Render encountered error, falling back to HUD mode:", error);
  }

  render() {
    if (this.state.hasError) {
      return <HeroHUDFallback />;
    }
    return this.props.children;
  }
}

const Hero3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 pointer-events-auto">
        <ErrorBoundary>
          <Suspense fallback={<HeroHUDFallback />}>
            <Canvas
              dpr={[1, 1.5]}
              gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: true,
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
        style={{ background: "linear-gradient(to top, #030712 0%, transparent 50%)" }}
      />
    </div>
  );
};

export default Hero3D;
