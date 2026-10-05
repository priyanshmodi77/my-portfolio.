import type { CSSProperties, ReactNode } from "react";
import styles from "./sections.module.css";
import TiltCard from "./tilt-card";

type Area = {
  index: string;
  title: string;
  icon: ReactNode;
  items?: string[];
  pairs?: [string, string][];
};

/* ─────────────────────────────
   Icons
───────────────────────────── */

const DataAnalyticsIcon = () => (
  <svg viewBox="0 0 42 42" aria-hidden="true">
    <path d="M5 36V6M5 36H38" />
    <path d="M12 30V21M20 30V14M28 30V9" />
  </svg>
);

const DevelopmentIcon = () => (
  <svg viewBox="0 0 42 42" aria-hidden="true">
    <path d="M14 10L5 21L14 32" />
    <path d="M28 10L37 21L28 32" />
    <path d="M24 7L18 35" />
  </svg>
);

const ProblemSolvingIcon = () => (
  <svg viewBox="0 0 42 42" aria-hidden="true">
    <circle cx="21" cy="21" r="17" />
    <path d="M13 21H28" />
    <path d="M23 15L29 21L23 27" />
  </svg>
);

/* ─────────────────────────────
   Capabilities
───────────────────────────── */

const AREAS: Area[] = [
  {
    index: "01",
    title: "Data Analytics",
    icon: <DataAnalyticsIcon />,
    items: [
      "SQL",
      "Advanced Excel",
      "Power BI",
      "Power Query",
      "DAX",
      "Python",
      "Data Cleaning",
      "Data Visualization",
      "Reporting & Insights",
    ],
  },
  {
    index: "02",
    title: "Development",
    icon: <DevelopmentIcon />,
    items: [
      "JavaScript",
      "PHP",
      "React / Next.js",
      "Node.js",
      "MySQL",
      "REST APIs",
    ],
  },
  {
    index: "03",
    title: "Problem Solving",
    icon: <ProblemSolvingIcon />,
    pairs: [
      ["Data", "Insights"],
      ["Business Problem", "Solution"],
      ["Analysis", "Decision"],
      ["Idea", "Working Product"],
    ],
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className={styles.section}
      aria-labelledby="capabilities-heading"
    >
      <div className={styles.container}>
        <h2 id="capabilities-heading" className={styles.heading} data-reveal>
          Capabilities
        </h2>

        <div className={styles.capabilitiesGrid}>
          {AREAS.map((area, i) => (
            <div
              key={area.index}
              className={styles.capabilityCol}
              data-reveal
              style={
                {
                  "--reveal-delay": `${i * 0.1}s`,
                } as CSSProperties
              }
            >
              <TiltCard className={styles.capabilityCard}>
                <span className={styles.capabilityIndex} aria-hidden="true">
                  {area.index}
                </span>

                <div className={styles.capabilityIcon}>
                  {area.icon}
                </div>

                <h3 className={styles.capabilityTitle}>
                  {area.title}
                </h3>

                {area.items ? (
                  <p className={styles.capabilityList}>
                    {area.items.join(" · ")}
                  </p>
                ) : null}

                {area.pairs ? (
                  <ul className={styles.capabilityPairs}>
                    {area.pairs.map(([from, to]) => (
                      <li key={from}>
                        <span>{from}</span>

                        <span
                          className={styles.capabilityArrow}
                          aria-hidden="true"
                        >
                          →
                        </span>

                        <span>{to}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}