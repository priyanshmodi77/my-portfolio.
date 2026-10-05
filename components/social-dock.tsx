"use client";

import { useEffect, useState } from "react";
import styles from "./social-dock.module.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/priyansh-modi-05339630a";
const EMAIL_ADDRESS = "priyansh.modi.in@gmail.com";

export default function SocialDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const work = document.getElementById("work");
    if (!work) return;

    // Visible once Work's top edge has reached/passed the top of the
    // viewport, and stays visible through Process/Contact below it; hides
    // again if the user scrolls back up above Work.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(work);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={styles.dock}
      data-visible={visible}
      aria-label="Social links"
      aria-hidden={!visible}
    >
      <a
        className={`${styles.icon} ${styles.iconLinkedin}`}
        href={LINKEDIN_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        tabIndex={visible ? 0 : -1}
      >
        <LinkedInGlyph />
      </a>
      <a
        className={`${styles.icon} ${styles.iconEmail}`}
        href={EMAIL_ADDRESS ? `mailto:${EMAIL_ADDRESS}` : "#"}
        aria-label="Email"
        tabIndex={visible ? 0 : -1}
      >
        <GmailGlyph />
      </a>
    </div>
  );
}

function LinkedInGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#0A66C2" />
      <rect x="5.6" y="9.4" width="2.7" height="9.1" fill="#ffffff" />
      <circle cx="7" cy="6.1" r="1.65" fill="#ffffff" />
      <path
        d="M10.9 9.4H13.5V10.8C13.9 10 14.9 9.1 16.5 9.1C19.3 9.1 20 10.7 20 13.3V18.5H17.3V13.9C17.3 12.7 16.9 11.9 15.8 11.9C14.9 11.9 14.4 12.5 14.1 13.1C14 13.4 14 13.8 14 14.1V18.5H11.3C11.3 18.5 11.3 10 10.9 9.4Z"
        fill="#ffffff"
      />
    </svg>
  );
}

// Stylized in the recognizable Gmail envelope-M shape and official Google
// brand colors (an original drawing built from the four public brand hex
// values, not a traced copy of Google's asset file).
function GmailGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="22" height="22" rx="5.5" fill="#ffffff" />
      <path
        d="M4.3 7.35C4.3 6.05 5.36 5 6.66 5H17.34C18.64 5 19.7 6.05 19.7 7.35V8.05L12 13.4L4.3 8.05V7.35Z"
        fill="#EA4335"
      />
      <path
        d="M4.3 8.05L8.1 10.68V18H5.2C4.68 18 4.3 17.6 4.3 17.1V8.05Z"
        fill="#4285F4"
      />
      <path
        d="M19.7 8.05V17.1C19.7 17.6 19.32 18 18.8 18H15.9V10.68L19.7 8.05Z"
        fill="#34A853"
      />
      <path d="M8.1 10.68L12 13.4L15.9 10.68V18H8.1V10.68Z" fill="#FBBC05" />
    </svg>
  );
}
