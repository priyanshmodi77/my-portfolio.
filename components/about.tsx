import type { CSSProperties } from "react";
import styles from "./sections.module.css";
import ResumeLink from "./resume-link";

const LEAD =
  "My path into technology started with IT Engineering — and somewhere along the way, my attention shifted from just building things to understanding what's happening inside them.";

const PARAGRAPHS = [
  "That shift is what pulled me toward data analytics. I became interested in the patterns and insights hidden within data, and how the right analysis can turn raw information into clarity. I've worked with SQL, Excel, Power BI, and Python across data cleaning, analysis, reporting, and visualization.",
"My development background in databases and web technologies gives me a broader understanding of where data comes from and how systems work behind it. Through internships and projects in e-commerce analytics and customer churn, I've learned that the real value isn't in the data itself, but in the insights you can uncover from it."
];

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <h2 id="about-heading" className={styles.heading} data-reveal>
          About
        </h2>

        <div className={styles.aboutGrid}>
          <p className={styles.aboutLead} data-reveal>
            {LEAD}
          </p>

          <div className={styles.aboutBody}>
            {PARAGRAPHS.map((paragraph, i) => (
              <p
                key={paragraph}
                className={styles.body}
                data-reveal
                style={
                  { "--reveal-delay": `${0.1 + i * 0.08}s` } as CSSProperties
                }
              >
                {paragraph}
              </p>
            ))}

            <ResumeLink />
          </div>
        </div>
      </div>
    </section>
  );
}
