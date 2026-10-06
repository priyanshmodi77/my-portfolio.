"use client";

import { useEffect, useRef } from "react";
import styles from "./glass-hero.module.css";
import SiteNav from "./site-nav";
import { useMagnetic } from "./use-magnetic";

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;
const POSITION_LERP = 0.14;
const RADIUS_LERP = 0.12;

const HEADLINE_LINES = ["Developer", "Analyst", "Builder"];
const TAGLINE_LINES = ["Code", "Data", "Creativity"];
const INTRO_LINE =
  "I build digital experiences and turn ideas into meaningful solutions.";

export default function GlassHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const exploreMagnetic = useMagnetic<HTMLAnchorElement>();

  // Pointer + animation state lives entirely in refs so pointer movement
  // and the rAF loop never trigger a React re-render.
  const rawRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const radiusRef = useRef(0);
  const targetRadiusRef = useRef(0);
  const trackingRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = motionQuery.matches;
    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotionRef.current = event.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const setPoint = (clientX: number, clientY: number) => {
      const rect = hero.getBoundingClientRect();
      rawRef.current.x = clientX - rect.left;
      rawRef.current.y = clientY - rect.top;
    };

    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      userInteractedRef.current = true;
      setPoint(event.clientX, event.clientY);
      targetRadiusRef.current = DESKTOP_RADIUS;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        userInteractedRef.current = true;
        setPoint(event.clientX, event.clientY);
        return;
      }
      if (trackingRef.current) {
        setPoint(event.clientX, event.clientY);
      }
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetRadiusRef.current = 0;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      userInteractedRef.current = true;
      trackingRef.current = true;
      if (hero.setPointerCapture) {
        try {
          hero.setPointerCapture(event.pointerId);
        } catch {
          // Pointer capture not supported for this pointer; safe to ignore.
        }
      }
      setPoint(event.clientX, event.clientY);
      targetRadiusRef.current = MOBILE_RADIUS;
    };

    const endTouch = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      trackingRef.current = false;
      targetRadiusRef.current = 0;
    };

    hero.addEventListener("pointerenter", handlePointerEnter);
    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", handlePointerLeave);
    hero.addEventListener("pointerdown", handlePointerDown);
    hero.addEventListener("pointerup", endTouch);
    hero.addEventListener("pointercancel", endTouch);

    const tick = () => {
      const posFactor = reduceMotionRef.current ? 1 : POSITION_LERP;
      const radiusFactor = reduceMotionRef.current ? 1 : RADIUS_LERP;

      smoothRef.current.x +=
        (rawRef.current.x - smoothRef.current.x) * posFactor;
      smoothRef.current.y +=
        (rawRef.current.y - smoothRef.current.y) * posFactor;
      radiusRef.current +=
        (targetRadiusRef.current - radiusRef.current) * radiusFactor;

      const clampedRadius = Math.max(radiusRef.current, 0);

      hero.style.setProperty("--reveal-x", `${smoothRef.current.x}px`);
      hero.style.setProperty("--reveal-y", `${smoothRef.current.y}px`);
      hero.style.setProperty("--reveal-radius", `${clampedRadius}px`);

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    // One-time intro on every device: automatically play the reveal once on
    // load — whether the mouse ever moves, or the mobile touch happens
    // anywhere else on the page (e.g. to scroll) — then hand off to normal
    // hover/touch control. Only skipped under prefers-reduced-motion (no
    // uninvited motion).
    const introTimeouts: number[] = [];
    const prefersFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const introRadius = prefersFinePointer ? DESKTOP_RADIUS : MOBILE_RADIUS;

    if (!reduceMotionRef.current) {
      // Aim roughly over the portrait's face rather than the hero's literal
      // center, and set position directly (skipping the lerp) so the mask
      // pulses open in place instead of sliding in from off-screen.
      const introX = hero.clientWidth * 0.58;
      const introY = hero.clientHeight * 0.42;
      rawRef.current.x = introX;
      rawRef.current.y = introY;
      smoothRef.current.x = introX;
      smoothRef.current.y = introY;

      introTimeouts.push(
        // Always open — even if the user has already moved the mouse or
        // touched for real by this point, this just re-sets the same
        // target their own interaction already set, so it's harmless and
        // never overrides their actual cursor/finger position (which keeps
        // updating independently via handlePointerMove).
        window.setTimeout(() => {
          targetRadiusRef.current = introRadius;
        }, 700),
        // Only auto-close if the user still hasn't genuinely interacted —
        // otherwise this would yank the mask shut mid-hover/mid-touch.
        window.setTimeout(() => {
          if (!userInteractedRef.current) {
            targetRadiusRef.current = 0;
          }
        }, 1700)
      );
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      hero.removeEventListener("pointerenter", handlePointerEnter);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      hero.removeEventListener("pointerdown", handlePointerDown);
      hero.removeEventListener("pointerup", endTouch);
      hero.removeEventListener("pointercancel", endTouch);
      introTimeouts.forEach((id) => window.clearTimeout(id));
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section ref={heroRef} id="top" className={styles.hero}>
      <div className={`${styles.layer} ${styles.base}`} aria-hidden="true" />
      <div
        className={`${styles.layer} ${styles.reveal}`}
        aria-hidden="true"
      />

      <div className={styles.grid} aria-hidden="true">
        <div className={styles.gridLines} />
        <div className={styles.circle} />
      </div>

      <SiteNav />

      <div className={styles.content}>
        <div className={styles.mobileScrim} aria-hidden="true" />

        <h1 className={styles.headline}>
          {HEADLINE_LINES.map((line) => (
            <span key={line} className={styles.headlineLine}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <div className={styles.bottomLeft}>
          <p className={styles.intro}>{INTRO_LINE}</p>
          <a
            ref={exploreMagnetic.ref}
            className="btn-outline"
            href="#work"
            onPointerMove={exploreMagnetic.onPointerMove}
            onPointerLeave={exploreMagnetic.onPointerLeave}
          >
            Explore my work
            <span className="btn-outline-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <p className={styles.tagline}>
          {TAGLINE_LINES.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
