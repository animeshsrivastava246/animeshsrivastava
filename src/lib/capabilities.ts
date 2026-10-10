/**
 * Device capability and WebGL detection utilities.
 * Ensures smooth fallback for low-end, mobile, or older devices.
 */

let cachedWebGLSupport: boolean | null = null;
let cachedLowEnd: boolean | null = null;

export function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedWebGLSupport !== null) return cachedWebGLSupport;

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    cachedWebGLSupport = Boolean(gl);
  } catch {
    cachedWebGLSupport = false;
  }
  return cachedWebGLSupport;
}

export function checkIsLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedLowEnd !== null) return cachedLowEnd;

  try {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isWeakCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
    const isLowRam = (nav.deviceMemory ?? 8) <= 4;
    const isSlowNet = Boolean(nav.connection?.saveData || nav.connection?.effectiveType?.includes("2g"));
    const isOldOs = /android [4-8]|iphone os [8-9]|iphone os 1[0-2]/i.test(navigator.userAgent);

    cachedLowEnd = isReduced || isWeakCpu || isLowRam || isSlowNet || isOldOs;
  } catch {
    cachedLowEnd = false;
  }
  return cachedLowEnd;
}
