import type { CSSProperties } from "react";
import styles from "./sections.module.css";
import ContactForm from "./contact-form";

const HEADING = "Let's turn data into something useful.";
const BODY =
  "Whether it's a dataset that needs exploring, a dashboard that needs building, or a problem that needs solving — I'm interested in working on meaningful challenges.";

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/priyansh-modi-05339630a",
  },
  { label: "Email", href: "mailto:priyansh.modi.in@gmail.com" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div className={styles.container}>
        <div className={styles.contactGrid}>
          <h2 id="contact-heading" className={styles.heading} data-reveal>
            {HEADING}
          </h2>
          <p
            className={styles.contactText}
            data-reveal
            style={{ "--reveal-delay": "0.08s" } as CSSProperties}
          >
            {BODY}
          </p>

          <div
            className={styles.contactFormWrap}
            data-reveal
            style={{ "--reveal-delay": "0.16s" } as CSSProperties}
          >
            <ContactForm />
          </div>

          <p
            className={styles.contactDivider}
            data-reveal
            style={{ "--reveal-delay": "0.24s" } as CSSProperties}
          >
            or connect directly
          </p>

          <ul className={styles.contactLinks}>
            {LINKS.map((link, i) => (
              <li
                key={link.label}
                data-reveal
                style={
                  { "--reveal-delay": `${0.28 + i * 0.06}s` } as CSSProperties
                }
              >
                <a
                  className={styles.inlineLink}
                  href={link.href}
                  target={link.label === "LinkedIn" ? "_blank" : undefined}
                  rel={link.label === "LinkedIn" ? "noreferrer" : undefined}
                >
                  {link.label}
                  <span className={styles.inlineLinkArrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <footer
          className={styles.contactFooter}
          data-reveal
          style={{ "--reveal-delay": "0.4s" } as CSSProperties}
        >
          <p className={styles.copyright}>© 2026 Priyansh Modi</p>
          <a className={styles.backToTop} href="#top">
            Back to top
            <span className={styles.backToTopArrow} aria-hidden="true">
              ↑
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}
