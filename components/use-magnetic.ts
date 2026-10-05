"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const STRENGTH = 0.3;
const MAX_OFFSET = 9;

/**
 * A subtle magnetic pull toward the cursor for premium CTAs. Writes
 * --magnet-x/--magnet-y onto the element (consumed by .btn-outline's own
 * transform in globals.css) rather than touching `transform` directly, so
 * it composes cleanly with the existing hover-lift CSS instead of
 * fighting it. Mouse-only, disabled under prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const onPointerMove = (event: ReactPointerEvent<T>) => {
    if (event.pointerType !== "mouse" || reduceMotionRef.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = event.clientX - (rect.left + rect.width / 2);
    const py = event.clientY - (rect.top + rect.height / 2);
    const x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, px * STRENGTH));
    const y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, py * STRENGTH));
    el.style.setProperty("--magnet-x", `${x}px`);
    el.style.setProperty("--magnet-y", `${y}px`);
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--magnet-x", "0px");
    el.style.setProperty("--magnet-y", "0px");
  };

  return { ref, onPointerMove, onPointerLeave };
}
