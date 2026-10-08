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
    const gl =
      canvas.getContext("webgl2", { powerPreference: "default" }) ||
      canvas.getContext("webgl", { powerPreference: "default" }) ||
      canvas.getContext("experimental-webgl");

    // Verify context can actually create shaders
    if (gl && gl instanceof WebGLRenderingContext || (typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext)) {
      cachedWebGLSupport = true;
      return true;
    }
  } catch {
    // WebGL unsupported or disabled
  }

  cachedWebGLSupport = false;
  return false;
}

export function checkIsLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedLowEnd !== null) return cachedLowEnd;

  try {
    // 1. Reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cachedLowEnd = true;
      return true;
    }

    // 2. CPU Core Count (<= 4 cores is typical of budget / older devices)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      cachedLowEnd = true;
      return true;
    }

    // 3. Device Memory (<= 4GB RAM)
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (nav.deviceMemory && nav.deviceMemory <= 4) {
      cachedLowEnd = true;
      return true;
    }

    // 4. Save-Data mode or slow network
    if (
      nav.connection?.saveData ||
      nav.connection?.effectiveType === "2g" ||
      nav.connection?.effectiveType === "slow-2g"
    ) {
      cachedLowEnd = true;
      return true;
    }

    // 5. Older mobile / tablet user agents with weak GPUs
    const ua = navigator.userAgent.toLowerCase();
    const isOldDevice =
      /android [4-8]/i.test(ua) ||
      /iphone os [8-9]|iphone os 1[0-2]/i.test(ua);
    if (isOldDevice) {
      cachedLowEnd = true;
      return true;
    }
  } catch {
    // Fallback safe default
  }

  cachedLowEnd = false;
  return false;
}
