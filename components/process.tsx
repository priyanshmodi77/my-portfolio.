"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import styles from "./sections.module.css";

type Step = {
  index: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    index: "01",
    title: "Understand",
    description:
      "Understand the business problem, requirements, and questions the data needs to answer.",
  },
  {
    index: "02",
    title: "Prepare",
    description:
      "Clean, validate, structure, and transform raw data into reliable datasets.",
  },
  {
    index: "03",
    title: "Analyze",
    description:
      "Use SQL, Excel, Python and analytical techniques to identify trends, patterns, relationships and anomalies.",
  },
  {
    index: "04",
    title: "Visualize",
    description: "Turn findings into clear dashboards and reports.",
  },
  {
    index: "05",
    title: "Deliver",
    description: "Convert analysis into clear, actionable insights.",
  },
];

export default function Process() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      list.style.setProperty("--progress", "1");
      return;
    }

    const update = () => {
      frameRef.current = null;
      const rect = list.getBoundingClientRect();
      // Progress line fills as the list travels from entering the lower
      // part of the viewport to its end reaching the upper part.
      const triggerTop = window.innerHeight * 0.75;
      const triggerBottom = window.innerHeight * 0.35;
      const total = rect.height + (triggerTop - triggerBottom);
      const traveled = triggerTop - rect.top;
      const progress = Math.min(1, Math.max(0, traveled / total));
      list.style.setProperty("--progress", progress.toFixed(4));
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      id="process"
      className={styles.section}
      aria-labelledby="process-heading"
    >
      <div className={styles.container}>
        <h2 id="process-heading" className={styles.heading} data-reveal>
          How I Work
        </h2>

        <div ref={listRef} className={styles.processList}>
          <span className={styles.processLineTrack} aria-hidden="true" />
          <span className={styles.processLine} aria-hidden="true" />
          <ol className={styles.processListItems}>
            {STEPS.map((step, i) => (
              <li
                key={step.index}
                className={styles.processRow}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.07}s` } as CSSProperties}
              >
                <span className={styles.processIndex} aria-hidden="true">
                  {step.index}
                </span>
                <div>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDescription}>
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
