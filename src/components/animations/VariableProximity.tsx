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
type ContainerRef = React.RefObject<HTMLElement | null>;

type VariableProximityProps = {
  label: string;
  fromFontVariationSettings?: FontVariationSettings;
  toFontVariationSettings?: FontVariationSettings;
  containerRef: ContainerRef;
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
  containerRef: ContainerRef
): RefObject<{ x: number; y: number }> {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef.current) {
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
      fromFontVariationSettings = "'wght' 400, 'opsz' 9",
      toFontVariationSettings = "'wght' 1000, 'opsz' 40",
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

    // 📱 Mobile detection with debounce
    useEffect(() => {
      let timeout: NodeJS.Timeout;

      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      const handleResize = () => {
        clearTimeout(timeout);
        timeout = setTimeout(checkMobile, 100);
      };

      checkMobile();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timeout);
      };
    }, []);

    // 🎯 Parse font variation settings
    const parsedSettings = useMemo(() => {
      const parseSettings = (settingsStr: string) =>
        new Map<string, number>(
          settingsStr.split(",").map((s) => {
            const [name, value] = s.trim().split(" ");
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

    // 🧩 Initialize font settings
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
        default:
          return norm;
      }
    };

    // 🎯 Activate on hover
    useEffect(() => {
      const container = containerRef.current;
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

    // ⚡ Animation loop
    useAnimationFrameActive(active && !isMobile, () => {
      if (!containerRef.current || isMobile) return;

      const { x, y } = mousePositionRef.current;

      if (
        lastPositionRef.current.x === x &&
        lastPositionRef.current.y === y
      ) {
        return;
      }

      lastPositionRef.current = { x, y };

      const containerRect = containerRef.current.getBoundingClientRect();

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;

        const rect = letterRef.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2 - containerRect.left;
        const centerY = rect.top + rect.height / 2 - containerRect.top;

        const distance = calculateDistance(x, y, centerX, centerY);
        const falloffValue = calculateFalloff(distance);

        const interpolatedSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const val = fromValue + (toValue - fromValue) * falloffValue;
            return `"${axis}" ${val.toFixed(2)}`;
          })
          .join(", ");

        if (interpolatedSettingsRef.current[index] !== interpolatedSettings) {
          interpolatedSettingsRef.current[index] = interpolatedSettings;
          letterRef.style.fontVariationSettings = interpolatedSettings;
        }
      });
    });

    // Parse label into letters
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
              const index = globalIndex++;
              return { char, globalIndex: index };
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
        <span className="sr-only">{label}</span>
        <span aria-hidden="true">
          {parsedLabel.map((line) => (
            <span key={line.lineIndex} style={{ display: "block" }}>
              {line.words.map((word) => (
                <span
                  key={word.wordIndex}
                  style={{ display: "inline-block", whiteSpace: "nowrap" }}
                >
                  {word.letters.map((letter) => (
                    <motion.span
                      key={letter.globalIndex}
                      ref={(el) => {
                        letterRefs.current[letter.globalIndex] = el;
                      }}
                      style={{
                        display: "inline-block",
                        whiteSpace: letter.char === " " ? "pre" : undefined,
                        width: letter.char === " " ? "0.2em" : undefined,
                      }}
                    >
                      {letter.char === " " ? "\u00A0" : letter.char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </span>
      </span>
    );
  }
);

VariableProximity.displayName = "VariableProximity";

export default VariableProximity;