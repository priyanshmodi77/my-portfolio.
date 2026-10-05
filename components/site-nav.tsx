"use client";

import { useEffect, useState } from "react";
import styles from "./site-nav.module.css";
import { useMagnetic } from "./use-magnetic";

const NAME = "Priyansh Modi";
const NAV_LINKS = ["About", "Capabilities", "Work", "Process"];

export default function SiteNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const ctaMagnetic = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    const ids = NAV_LINKS.map((link) => link.toLowerCase());
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navGroup}>
          <a className={styles.brand} href="#top" aria-label={NAME}>
            <Monogram letter={NAME.charAt(0)} />
            <span className={styles.brandName}>{NAME}</span>
          </a>

          <div className={styles.linksGlass}>
            <ul className={styles.navLinks}>
              {NAV_LINKS.map((link) => {
                const id = link.toLowerCase();
                return (
                  <li key={link}>
                    <a
                      href={`#${id}`}
                      data-active={activeSection === id}
                      aria-current={activeSection === id ? "true" : undefined}
                    >
                      {link}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <a
          ref={ctaMagnetic.ref}
          className="btn-outline"
          href="#contact"
          onPointerMove={ctaMagnetic.onPointerMove}
          onPointerLeave={ctaMagnetic.onPointerLeave}
        >
          Let&rsquo;s Connect
          <span className="btn-outline-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </nav>
    </header>
  );
}

function Monogram({ letter }: { letter: string }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="15" cy="15" r="13.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M11.5 9.5V20.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M11.5 9.5H16.2C18.1 9.5 19.5 10.9 19.5 12.7C19.5 14.5 18.1 15.9 16.2 15.9H11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <title>{letter}</title>
    </svg>
  );
}
