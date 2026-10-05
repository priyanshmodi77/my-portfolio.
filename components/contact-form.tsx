"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./contact-form.module.css";
import { useMagnetic } from "./use-magnetic";

const EMAIL_ADDRESS = "priyansh.modi.in@gmail.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const submitMagnetic = useMagnetic<HTMLButtonElement>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Portfolio inquiry from ${name || "your site"}`;
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
    const mailto = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          className={styles.input}
          type="text"
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          className={styles.input}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          className={styles.textarea}
          name="message"
          rows={4}
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <div className={styles.submitRow}>
        <button
          ref={submitMagnetic.ref}
          className={styles.submit}
          type="submit"
          onPointerMove={submitMagnetic.onPointerMove}
          onPointerLeave={submitMagnetic.onPointerLeave}
        >
          Send Message
          <span className={styles.submitArrow} aria-hidden="true">
            ↗
          </span>
        </button>
        <p className={styles.submitNote}>Opens in your email app</p>
      </div>
    </form>
  );
}
