"use client";

import { useEffect, useRef } from "react";
import styles from "./glass-hero.module.css";
import SiteNav from "./site-nav";
import { useMagnetic } from "./use-magnetic";

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;
const MOBILE_INTRO_RADIUS = 300;

const POSITION_LERP = 0.14;
const RADIUS_LERP = 0.12;

const INTRO_START_DELAY = 700;
const INTRO_DURATION = 1000;

const HEADLINE_LINES = ["Developer", "Analyst", "Builder"];
const TAGLINE_LINES = ["Code", "Data", "Creativity"];

const INTRO_LINE =
  "I build digital experiences and turn ideas into meaningful solutions.";

export default function GlassHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const exploreMagnetic = useMagnetic<HTMLAnchorElement>();

  const rawRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });

  const radiusRef = useRef(0);
  const targetRadiusRef = useRef(0);

  const trackingRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const reduceMotionRef = useRef(false);
  const introPlayingRef = useRef(true);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let disposed = false;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    reduceMotionRef.current = motionQuery.matches;

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotionRef.current = event.matches;
    };

    motionQuery.addEventListener("change", handleMotionChange);

    const isMobilePortrait = window.matchMedia(
      "(max-width: 767px) and (orientation: portrait)"
    ).matches;

    const prefersFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const setPoint = (clientX: number, clientY: number) => {
      const rect = hero.getBoundingClientRect();

      rawRef.current.x = clientX - rect.left;
      rawRef.current.y = clientY - rect.top;
    };

    const hideHint = () => {
      if (hintRef.current) {
        hintRef.current.style.opacity = "0";
      }
    };

    // Desktop mouse interaction.
    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (introPlayingRef.current) return;

      hideHint();
      setPoint(event.clientX, event.clientY);

      targetRadiusRef.current = DESKTOP_RADIUS;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (introPlayingRef.current) return;

      if (event.pointerType === "mouse") {
        hideHint();
        setPoint(event.clientX, event.clientY);
        return;
      }

      if (trackingRef.current) {
        setPoint(event.clientX, event.clientY);
      }
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (introPlayingRef.current) return;

      targetRadiusRef.current = 0;
    };

    // Mobile touch interaction.
    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      if (introPlayingRef.current) return;

      hideHint();
      trackingRef.current = true;

      if (hero.setPointerCapture) {
        try {
          hero.setPointerCapture(event.pointerId);
        } catch {
          // Ignore unsupported pointer capture.
        }
      }

      setPoint(event.clientX, event.clientY);
      targetRadiusRef.current = MOBILE_RADIUS;
    };

    const endTouch = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;

      trackingRef.current = false;

      if (introPlayingRef.current) return;

      targetRadiusRef.current = 0;
    };

    hero.addEventListener("pointerenter", handlePointerEnter);
    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", handlePointerLeave);
    hero.addEventListener("pointerdown", handlePointerDown);
    hero.addEventListener("pointerup", endTouch);
    hero.addEventListener("pointercancel", endTouch);

    // Smooth reveal animation.
    const tick = () => {
      if (disposed) return;

      const posFactor = reduceMotionRef.current
        ? 1
        : POSITION_LERP;

      const radiusFactor = reduceMotionRef.current
        ? 1
        : RADIUS_LERP;

      smoothRef.current.x +=
        (rawRef.current.x - smoothRef.current.x) * posFactor;

      smoothRef.current.y +=
        (rawRef.current.y - smoothRef.current.y) * posFactor;

      radiusRef.current +=
        (targetRadiusRef.current - radiusRef.current) *
        radiusFactor;

      hero.style.setProperty(
        "--reveal-x",
        `${smoothRef.current.x}px`
      );

      hero.style.setProperty(
        "--reveal-y",
        `${smoothRef.current.y}px`
      );

      hero.style.setProperty(
        "--reveal-radius",
        `${Math.max(radiusRef.current, 0)}px`
      );

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    const introTimeouts: number[] = [];

    const introRadius = isMobilePortrait
      ? MOBILE_INTRO_RADIUS
      : prefersFinePointer
        ? DESKTOP_RADIUS
        : MOBILE_RADIUS;

    if (reduceMotionRef.current) {
      introPlayingRef.current = false;
      targetRadiusRef.current = 0;
    } else {
      // Disable manual interaction during automatic reveal.
      introPlayingRef.current = true;

      introTimeouts.push(
        window.setTimeout(() => {
          if (disposed) return;

          // Mobile-specific reveal centre.
          const introX =
            hero.clientWidth * (isMobilePortrait ? 0.58 : 0.58);

          const introY =
            hero.clientHeight * (isMobilePortrait ? 0.45 : 0.42);

          rawRef.current.x = introX;
          rawRef.current.y = introY;

          smoothRef.current.x = introX;
          smoothRef.current.y = introY;

          radiusRef.current = 0;
          targetRadiusRef.current = introRadius;
        }, INTRO_START_DELAY),

        // Enable manual interaction when the intro finishes.
        window.setTimeout(() => {
          if (disposed) return;

          introPlayingRef.current = false;
        }, INTRO_START_DELAY + INTRO_DURATION)
      );
    }

    return () => {
      disposed = true;

      motionQuery.removeEventListener(
        "change",
        handleMotionChange
      );

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
      <div
        className={`${styles.layer} ${styles.base}`}
        aria-hidden="true"
      />

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
        <div
          className={styles.mobileScrim}
          aria-hidden="true"
        />

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
            <span
              className="btn-outline-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </a>

          <div
            ref={hintRef}
            className={styles.hint}
            aria-hidden="true"
          >
            <span className={styles.hintDesktop}>
              Move across to reveal
            </span>

            <span className={styles.hintMobile}>
              Touch anywhere to reveal
            </span>
          </div>
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