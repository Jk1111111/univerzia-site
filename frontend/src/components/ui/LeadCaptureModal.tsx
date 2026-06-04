"use client";

import { useState } from "react";

export interface LeadModalParams {
  source: string;
  program?: string;
  ctaType: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  city: string;
  program: string;
  consent: boolean;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  program?: string;
  consent?: string;
}

const PROGRAM_OPTIONS = [
  "Free Career Consultation",
  // Courses
  "AI Tools & Prompt Engineering Workshop",
  "Prompt Engineering Mastery",
  "Day to Day Office Work Using AI",
  "Job Hunting to Get 40% Salary Hike Using AI",
  "Build a Side Hustle Using AI",
  "AI-Powered Research & Report Writing",
  "Python with AI",
  "Coding Using AI — Build No-Code AI SaaS Apps",
  "AI Automation Workflow — Agentic AI",
  "Data Science with AI",
  "Advanced Data Analysis Program",
  "SQL Management with AI",
  "Excel with AI",
  // Services
  "Website Design",
  "Website Development",
  "E-Commerce Solutions",
  "Univerzia LMS",
  "Univerzia ERP",
  "Other / Not sure yet",
];

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your full name";
  if (!f.email.trim()) e.email = "Please enter your email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Please enter a valid email address";
  if (!f.phone.trim()) e.phone = "Please enter your phone number";
  else if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s/g, "")))
    e.phone = "Please enter a valid 10-digit mobile number";
  if (!f.program) e.program = "Please select a program";
  if (!f.consent) e.consent = "Please agree to be contacted";
  return e;
}

type Status = "idle" | "submitting" | "success" | "error";

const fieldCls =
  "w-full px-4 py-3 rounded-[10px] text-[14px] outline-none transition-all duration-150 border";
const fieldBase =
  "bg-[var(--gray-50)] border-[var(--line)] text-[var(--fg-1)] placeholder:text-[var(--fg-3)] focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[rgba(249,115,22,0.15)]";
const fieldErr = "border-[var(--danger)] focus:border-[var(--danger)]";
const labelCls = "block text-[13px] font-semibold mb-[6px] text-[var(--fg-2)]";
const errCls = "text-[12px] mt-1 text-[var(--danger)]";

export default function LeadCaptureModal({
  params,
  onClose,
}: {
  params: LeadModalParams;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    city: "",
    program: params.program || "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const set = (field: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || undefined,
          city: form.city.trim() || undefined,
          program: form.program,
          source: params.source,
          ctaType: params.ctaType,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else if (res.status === 409) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <div
          className="w-[64px] h-[64px] rounded-full mx-auto mb-5 flex items-center justify-center text-[28px] text-white"
          style={{ background: "var(--grad-green)" }}
        >
          <i className="fa-solid fa-circle-check" />
        </div>
        <h3
          className="text-[20px] font-bold mb-2"
          style={{ color: "var(--fg-1)" }}
        >
          Thank you for your interest!
        </h3>
        <p
          className="text-[15px] mb-6 max-w-[360px] mx-auto leading-relaxed"
          style={{ color: "var(--fg-2)" }}
        >
          Our team will connect with you shortly. We&apos;re excited to help you
          start your AI journey.
        </p>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-[14px] font-semibold text-white cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: "var(--grad-brand)",
            boxShadow: "var(--shadow-purple)",
          }}
        >
          Got it <i className="fa-solid fa-thumbs-up" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p
        className="text-[14px] mb-5 leading-relaxed"
        style={{ color: "var(--fg-2)" }}
      >
        Fill in your details and our team will reach out to guide you.
      </p>

      {/* Name */}
      <div className="mb-4">
        <label className={labelCls}>
          Full Name <span className="text-[var(--danger)]">*</span>
        </label>
        <input
          type="text"
          className={`${fieldCls} ${errors.name ? fieldErr : fieldBase}`}
          placeholder="Your full name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
        />
        {errors.name && <p className={errCls}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className={labelCls}>
          Email Address <span className="text-[var(--danger)]">*</span>
        </label>
        <input
          type="email"
          className={`${fieldCls} ${errors.email ? fieldErr : fieldBase}`}
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
        />
        {errors.email && <p className={errCls}>{errors.email}</p>}
      </div>

      {/* Phone + City row */}
      <div className="grid grid-cols-2 gap-3 mb-4 max-[480px]:grid-cols-1">
        <div>
          <label className={labelCls}>Phone Number <span className="text-[var(--danger)]">*</span></label>
          <input
            type="tel"
            className={`${fieldCls} ${errors.phone ? fieldErr : fieldBase}`}
            placeholder="98XXXXXXXX"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>
        <div>
          <label className={labelCls}>City / Location</label>
          <input
            type="text"
            className={`${fieldCls} ${fieldBase}`}
            placeholder="Your city"
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </div>
      </div>

      {/* Program */}
      <div className="mb-5">
        <label className={labelCls}>
          Interested In <span className="text-[var(--danger)]">*</span>
        </label>
        <select
          className={`${fieldCls} ${errors.program ? fieldErr : fieldBase} appearance-none`}
          value={form.program}
          onChange={(e) => set("program", e.target.value)}
        >
          <option value="">Select a program…</option>
          {PROGRAM_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.program && <p className={errCls}>{errors.program}</p>}
      </div>

      {/* Consent */}
      <label className="flex items-start gap-2.5 mb-5 cursor-pointer">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-0.5 accent-[var(--brand-primary)]"
        />
        <span
          className="text-[12.5px] leading-relaxed"
          style={{ color: "var(--fg-2)" }}
        >
          I agree that Univerzia AI may store my details and contact me about
          this enquiry.
        </span>
      </label>
      {errors.consent && (
        <p className={errCls} style={{ marginTop: -12, marginBottom: 12 }}>
          {errors.consent}
        </p>
      )}

      {/* Server error */}
      {status === "error" && serverError && (
        <div
          className="rounded-[10px] px-4 py-3 mb-4 text-[13px]"
          style={{
            background: "var(--danger-light)",
            color: "var(--danger-dark)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-[14px] rounded-[10px] text-[15px] font-semibold text-white cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        style={{
          background: "var(--brand-primary)",
          boxShadow: "var(--shadow-orange)",
        }}
      >
        {status === "submitting" ? (
          <>
            <i className="fa-solid fa-spinner fa-spin" />
            Submitting…
          </>
        ) : (
          <>
            Submit <i className="fa-solid fa-arrow-right" />
          </>
        )}
      </button>
    </form>
  );
}
