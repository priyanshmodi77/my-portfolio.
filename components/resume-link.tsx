"use client";

import type { CSSProperties } from "react";
import styles from "./sections.module.css";
import { useMagnetic } from "./use-magnetic";

export default function ResumeLink() {
  const magnetic = useMagnetic<HTMLAnchorElement>();

  return (
    <a
      ref={magnetic.ref}
      className={styles.resumeLink}
      href="/resume/Priyansh-Modi-Resume.pdf"
      download="Priyansh-Modi-Resume.pdf"
      data-reveal
      style={{ "--reveal-delay": "0.42s" } as CSSProperties}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
    >
      <span className="btn-outline-arrow" aria-hidden="true">
        ↓
      </span>
      Download Resume
    </a>
  );
}
