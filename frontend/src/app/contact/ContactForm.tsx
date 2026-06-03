"use client";

import { useState } from "react";
import { contactForm } from "@/lib/data/contact";
import s from "./contact.module.css";
import { cn } from "@/lib/utils/cn";

interface FormState {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
}

interface Errors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  consent?: string;
}

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
  consent: false,
};

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your name";
  if (!f.email.trim()) e.email = "Please enter your email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Please enter a valid email address";
  if (!f.topic) e.topic = "Please select a topic";
  if (!f.message.trim()) e.message = "Please enter a message";
  else if (f.message.trim().length < 10)
    e.message = "Message must be at least 10 characters";
  if (!f.consent) e.consent = "Please agree to the privacy policy";
  return e;
}

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
  };

  const reset = () => {
    setForm(initial);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className={s["co-card-pad"]}>
        <div className={s["co-success"]}>
          <div className="ic">
            <i className="fa-solid fa-circle-check" />
          </div>
          <h3>Message sent!</h3>
          <p>
            Thank you for reaching out. The right person on our team will get
            back to you within a few hours.
          </p>
          <button onClick={reset} className="u-btn u-btn--primary">
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s["co-card-pad"]} id="contact-form">
      <div className={s["co-form-head"]}>
        <h2>{contactForm.title}</h2>
        <p>{contactForm.sub}</p>
      </div>
      <form onSubmit={handleSubmit} noValidate className={s["co-form"]}>
        {/* Name */}
        <div className={cn(s["co-field"], errors.name && s["co-field-invalid"])}>
          <label>
            Full Name <span className="req">*</span>
          </label>
          <input
            type="text"
            className={s["co-input"]}
            placeholder="Your name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
          {errors.name && <span className={s["co-err"]}>{errors.name}</span>}
        </div>

        {/* Email */}
        <div className={cn(s["co-field"], errors.email && s["co-field-invalid"])}>
          <label>
            Email <span className="req">*</span>
          </label>
          <input
            type="email"
            className={s["co-input"]}
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
          {errors.email && <span className={s["co-err"]}>{errors.email}</span>}
        </div>

        {/* Phone */}
        <div className={s["co-field"]}>
          <label>Phone</label>
          <input
            type="tel"
            className={s["co-input"]}
            placeholder="+91 00000 00000"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>

        {/* Topic */}
        <div className={cn(s["co-field"], errors.topic && s["co-field-invalid"])}>
          <label>
            How can we help? <span className="req">*</span>
          </label>
          <select
            className={s["co-select"]}
            value={form.topic}
            onChange={(e) => set("topic", e.target.value)}
          >
            <option value="">Select a topic…</option>
            {contactForm.topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.topic && <span className={s["co-err"]}>{errors.topic}</span>}
        </div>

        {/* Message */}
        <div
          className={cn(
            s["co-field"],
            s["co-field-full"],
            errors.message && s["co-field-invalid"]
          )}
        >
          <label>
            Message <span className="req">*</span>
          </label>
          <textarea
            className={s["co-textarea"]}
            placeholder="Tell us about your goals, timeline, or questions…"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
          />
          {errors.message && (
            <span className={s["co-err"]}>{errors.message}</span>
          )}
        </div>

        {/* Footer */}
        <div className={s["co-form-foot"]}>
          <label className={s["co-consent"]}>
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set("consent", e.target.checked)}
            />
            I agree that Univerzia AI may store my details and contact me about
            this enquiry.
          </label>
          <button type="submit" className="u-btn u-btn--primary">
            Send Message <i className="fa-solid fa-paper-plane" />
          </button>
        </div>
        {errors.consent && (
          <span className={s["co-err"]} style={{ gridColumn: "span 2" }}>
            {errors.consent}
          </span>
        )}
      </form>
    </div>
  );
}
