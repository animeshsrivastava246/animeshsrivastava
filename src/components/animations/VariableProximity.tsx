"use client";

import React, {
  forwardRef,
  useMemo,
  useRef,
  useEffect,
  RefObject,
} from "react";
import { motion } from "framer-motion";

type FontVariationSettings = string;

type VariableProximityProps = {
  label: string;
  fromFontVariationSettings: FontVariationSettings;
  toFontVariationSettings: FontVariationSettings;
  containerRef: React.RefObject<HTMLElement>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLSpanElement>;

function useAnimationFrameActive(active: boolean, callback: () => void) {
  useEffect(() => {
    if (!active) return;
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [active, callback]);
}

function useMousePositionRef(
  containerRef: React.RefObject<HTMLElement>
): RefObject<{ x: number; y: number }> {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) =>
      updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (
    {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = "linear",
      className = "",
      onClick,
      style,
      ...restProps
    },
    ref
  ) => {
    const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({
      x: null,
      y: null,
    });
    const [active, setActive] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const parsedSettings = useMemo(() => {
      const parseSettings = (settingsStr: string) =>
        new Map<string, number>(
          settingsStr
            .split(",")
            .map((s) => s.trim())
            .map((s) => {
              const [name, value] = s.split(" ");
              return [name.replace(/['"]/g, ""), parseFloat(value)];
            })
        );

      const fromSettings = parseSettings(fromFontVariationSettings);
      const toSettings = parseSettings(toFontVariationSettings);

      return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);
    useEffect(() => {
      letterRefs.current.forEach((letterRef) => {
        if (!letterRef) return;
        const settings = parsedSettings
          .map(({ axis, fromValue }) => `"${axis}" ${fromValue.toFixed(2)}`)
          .join(", ");
        letterRef.style.fontVariationSettings = settings;
      });
    }, [parsedSettings]);
    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    const calculateFalloff = (distance: number): number => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      switch (falloff) {
        case "exponential":
          return norm ** 2;
        case "gaussian":
          return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
        case "linear":
        default:
          return norm;
      }
    };

    useEffect(() => {
      const container = containerRef?.current;
      if (!container || isMobile) return;
      const handleEnter = () => setActive(true);
      const handleLeave = () => setActive(false);
      container.addEventListener("mouseenter", handleEnter);
      container.addEventListener("mouseleave", handleLeave);
      return () => {
        container.removeEventListener("mouseenter", handleEnter);
        container.removeEventListener("mouseleave", handleLeave);
      };
    }, [containerRef, isMobile]);

    useAnimationFrameActive(active && !isMobile, () => {
      if (!containerRef?.current || isMobile) return;
      const { x, y } = mousePositionRef.current;
      if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
        return;
      }
      lastPositionRef.current = { x, y };
      const containerRect = containerRef.current.getBoundingClientRect();
      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;
        const rect = letterRef.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
        const distance = calculateDistance(x, y, letterCenterX, letterCenterY);
        const falloffValue = calculateFalloff(distance);
        const interpolatedSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue =
              fromValue + (toValue - fromValue) * falloffValue;
            return `"${axis}" ${interpolatedValue.toFixed(2)}`;
          })
          .join(", ");
        if (interpolatedSettingsRef.current[index] !== interpolatedSettings) {
          interpolatedSettingsRef.current[index] = interpolatedSettings;
          letterRef.style.fontVariationSettings = interpolatedSettings;
        }
      });
    });

    const parsedLabel = useMemo(() => {
      let globalIndex = 0;
      return label.split("\n").map((line, lineIndex) => {
        const words = line.split(" ");
        const wordsData = words.map((word, wordIndex) => {
          const isLastWord = wordIndex === words.length - 1;
          const letters = [...word, ...(isLastWord ? [] : [" "])];
          return {
            wordIndex,
            letters: letters.map((char) => {
              const currentGlobalIndex = globalIndex;
              globalIndex++;
              return { char, globalIndex: currentGlobalIndex };
            }),
          };
        });
        globalIndex++;
        return { lineIndex, words: wordsData };
      });
    }, [label]);

    return (
      <span
        ref={ref}
        className={className}
        onClick={onClick}
        style={style}
        {...restProps}
      >
        {parsedLabel.map((lineObj) => (
          <span key={lineObj.lineIndex} style={{ display: "block" }}>
            {lineObj.words.map((wordObj) => (
              <span key={wordObj.wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                {wordObj.letters.map((letterObj) => (
                  <motion.span
                    key={letterObj.globalIndex}
                    ref={(el: HTMLSpanElement | null) => { letterRefs.current[letterObj.globalIndex] = el; }}
                    style={{
                      display: "inline-block",
                      whiteSpace: letterObj.char === " " ? "pre" : undefined,
                      width: letterObj.char === " " ? "0.2em" : undefined,
                    }}
                  >
                    {letterObj.char === " " ? "\u00A0" : letterObj.char}
                  </motion.span>
                ))}
              </span>
            ))}
          </span>
        ))}
      </span>
    );
  }
);

VariableProximity.displayName = "VariableProximity";

export default VariableProximity;
