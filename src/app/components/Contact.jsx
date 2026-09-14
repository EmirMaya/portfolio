"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import styles from "./contact.module.css";

const Contact = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        setErrorMessage(
          resData?.error || "Something went wrong. Please try again."
        );
        return;
      }

      setEmailSubmitted(true);
    } catch {
      setErrorMessage("Unable to send this message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className={styles.section}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Get in touch / Contact</p>
        <h2 id="contact-title" className={styles.title}>
          Let&apos;s<br />connect<span>.</span>
        </h2>
        <div className={styles.stripes} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className={styles.description}>
          I&apos;m actively seeking new opportunities. Feel free to reach out
          anytime - I&apos;m here to chat or answer any questions you may have!
        </p>
        <div className={styles.socials}>
          <Link
            href="https://github.com/EmirMaya"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className={styles.socialLink}
          >
            <Image src="/images/github.svg" alt="" width={24} height={24} />
            GitHub
            <ArrowUpRightIcon aria-hidden="true" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/emirmaya/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            className={styles.socialLink}
          >
            <Image src="/images/linkedin.svg" alt="" width={24} height={24} />
            LinkedIn
            <ArrowUpRightIcon aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 id="contact-form-title">Send a message</h3>
          <span className={styles.colorMarks} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </div>
        {emailSubmitted ? (
          <p className={styles.success} role="status">
            Email sent successfully!
          </p>
        ) : (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            aria-labelledby="contact-form-title"
            aria-busy={isSubmitting}
          >
            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                maxLength={254}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="subject" className={styles.label}>Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="What do you have in mind?"
                required
                maxLength={120}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Tell me a little about your project..."
                rows={5}
                required
                maxLength={3000}
                className={`${styles.input} ${styles.message}`}
              />
            </div>
            {errorMessage ? (
              <p className={styles.error} role="alert">
                {errorMessage}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submit}
            >
              {isSubmitting ? "Sending..." : "Send Message!"}
              <ArrowUpRightIcon aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
