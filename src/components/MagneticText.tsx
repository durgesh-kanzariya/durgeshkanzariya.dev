"use client";

import {
  useRef,
  MouseEvent,
  forwardRef,
  useImperativeHandle,
  ReactNode,
  ElementType,
  CSSProperties,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
} from "react";
import gsap from "gsap";

interface MagneticTextProps {
  children: ReactNode;
  as?: ElementType;
  radius?: number;
  maxRepel?: number;
  className?: string;
  style?: CSSProperties;
}

export const MagneticText = forwardRef<HTMLElement, MagneticTextProps>(
  (
    {
      children,
      as: Tag = "h2",
      radius = 85,
      maxRepel = 100,
      className = "",
      style = {},
    },
    outerRef
  ) => {
    const containerRef = useRef<HTMLElement>(null);
    useImperativeHandle(outerRef, () => containerRef.current as HTMLElement);

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const letterPositions = useRef<{ x: number; y: number }[]>([]);

    // Cache initial letter center positions on mouseenter to avoid layout reflows during mousemove
    const handleMouseEnter = () => {
      letterPositions.current = letterRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const currentX = (gsap.getProperty(el, "x") as number) || 0;
        const currentY = (gsap.getProperty(el, "y") as number) || 0;
        return {
          x: rect.left + rect.width / 2 - currentX,
          y: rect.top + rect.height / 2 - currentY,
        };
      });
    };

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!letterPositions.current.length) handleMouseEnter();

      letterRefs.current.forEach((el, index) => {
        if (!el) return;
        const pos = letterPositions.current[index];
        if (!pos) return;

        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;
        const dist = Math.hypot(dx, dy);

        if (dist < radius && dist > 0) {
          // Push vector directly AWAY from cursor
          const nx = -dx / dist;
          const ny = -dy / dist;

          // Non-linear falloff (closer = stronger push)
          const power = Math.pow(1 - dist / radius, 1.4);
          const force = power * maxRepel;

          const targetX = nx * force;
          const targetY = ny * force;
          const rotate = (dx / radius) * -14;

          gsap.to(el, {
            x: targetX,
            y: targetY,
            rotate: rotate,
            scale: 1.05,
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          // Spring back smoothly
          gsap.to(el, {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.75,
            ease: "elastic.out(1.1, 0.35)",
            overwrite: "auto",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        letterPositions.current = [];
        return;
      }
      letterRefs.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.85,
          ease: "elastic.out(1.2, 0.35)",
          overwrite: "auto",
        });
      });
      letterPositions.current = [];
    };

    let letterCounter = 0;

    const renderTextContent = (text: string, parentKey: string): ReactNode => {
      // Split into words so lines wrap naturally without breaking individual words
      const words = text.split(" ");
      return words.map((word, wordIdx) => {
        if (!word) {
          return (
            <span key={`${parentKey}-space-${wordIdx}`} className="inline">
              {" "}
            </span>
          );
        }

        const characters = word.split("");
        const isLastWord = wordIdx === words.length - 1;

        return (
          <span
            key={`${parentKey}-w-${wordIdx}`}
            className="inline-block whitespace-nowrap"
          >
            {characters.map((char, charIdx) => {
              const currentIdx = letterCounter++;
              return (
                <span
                  key={`${parentKey}-c-${wordIdx}-${charIdx}`}
                  ref={(node) => {
                    letterRefs.current[currentIdx] = node;
                  }}
                  aria-hidden="true"
                  className="inline-block will-change-transform select-none"
                >
                  {char}
                </span>
              );
            })}
            {!isLastWord && <span className="inline">&nbsp;</span>}
          </span>
        );
      });
    };

    const processChildren = (nodes: ReactNode, prefix = "root"): ReactNode => {
      return Children.map(nodes, (child, idx) => {
        const key = `${prefix}-${idx}`;
        if (typeof child === "string") {
          return renderTextContent(child, key);
        }
        if (typeof child === "number") {
          return renderTextContent(String(child), key);
        }
        if (isValidElement(child)) {
          const element = child as ReactElement<{ children?: ReactNode }>;
          if (element.props && element.props.children) {
            return cloneElement(element, {
              key,
              children: processChildren(element.props.children, key),
            });
          }
          return child;
        }
        return child;
      });
    };

    letterCounter = 0;
    const content = processChildren(children);

    return (
      <Tag
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${className} cursor-default`}
        style={style}
      >
        {content}
      </Tag>
    );
  }
);

MagneticText.displayName = "MagneticText";
export default MagneticText;
