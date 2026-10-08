"use client";

import { useState, type FormEvent } from "react";
import { solutionInterestOptions } from "@/data/contactForm";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { clsx } from "clsx";

type FormState = {
  name: string;
  schoolName: string;
  designation: string;
  email: string;
  phone: string;
  city: string;
  studentCount: string;
  interestedSolution: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  schoolName: "",
  designation: "",
  email: "",
  phone: "",
  city: "",
  studentCount: "",
  interestedSolution: "",
  message: "",
};

function validate(state: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!state.name.trim()) errors.name = "Please enter your name.";
  if (!state.schoolName.trim()) errors.schoolName = "Please enter your school's name.";
  if (!state.designation.trim()) errors.designation = "Please enter your designation.";
  if (!state.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) errors.email = "Enter a valid email address.";
  if (!state.phone.trim()) errors.phone = "Please enter a phone number.";
  else if (!/^[+\d][\d\s-]{7,}$/.test(state.phone.trim())) errors.phone = "Enter a valid phone number.";
  if (!state.city.trim()) errors.city = "Please enter your city.";
  if (!state.interestedSolution) errors.interestedSolution = "Please select a solution of interest.";
  return errors;
}

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const field = (key: keyof FormState) => ({
    value: state[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setState((s) => ({ ...s, [key]: e.target.value })),
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(state);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    // Structured for future backend/API integration — currently simulates a request.
    // e.g. await fetch("/api/contact", { method: "POST", body: JSON.stringify(state) });
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-line bg-paper-2 p-10 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-green/10 text-green-ink">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-ink">Thank you — request received.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Our team will reach out to {state.email || "your email"} within one business day to schedule your demo.
        </p>
      </div>
    );
  }

  const inputClass = (key: keyof FormState) =>
    clsx(
      "mt-1.5 w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-electric",
      errors[key] ? "border-red-400" : "border-line"
    );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted">
            Name
          </label>
          <input id="name" type="text" className={inputClass("name")} {...field("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="schoolName" className="text-xs font-semibold uppercase tracking-wide text-muted">
            School Name
          </label>
          <input id="schoolName" type="text" className={inputClass("schoolName")} {...field("schoolName")} aria-invalid={!!errors.schoolName} />
          {errors.schoolName && <p className="mt-1 text-xs text-red-500">{errors.schoolName}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="designation" className="text-xs font-semibold uppercase tracking-wide text-muted">
            Designation
          </label>
          <input id="designation" type="text" placeholder="e.g. Principal, Academic Coordinator" className={inputClass("designation")} {...field("designation")} aria-invalid={!!errors.designation} />
          {errors.designation && <p className="mt-1 text-xs text-red-500">{errors.designation}</p>}
        </div>
        <div>
          <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wide text-muted">
            City
          </label>
          <input id="city" type="text" className={inputClass("city")} {...field("city")} aria-invalid={!!errors.city} />
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted">
            Email
          </label>
          <input id="email" type="email" className={inputClass("email")} {...field("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-muted">
            Phone
          </label>
          <input id="phone" type="tel" className={inputClass("phone")} {...field("phone")} aria-invalid={!!errors.phone} />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="studentCount" className="text-xs font-semibold uppercase tracking-wide text-muted">
            Number of Students <span className="normal-case text-muted/70">(optional)</span>
          </label>
          <input id="studentCount" type="text" placeholder="e.g. 800" className={inputClass("studentCount")} {...field("studentCount")} />
        </div>
        <div>
          <label htmlFor="interestedSolution" className="text-xs font-semibold uppercase tracking-wide text-muted">
            Interested Solution
          </label>
          <select id="interestedSolution" className={inputClass("interestedSolution")} {...field("interestedSolution")} aria-invalid={!!errors.interestedSolution}>
            <option value="">Select a solution</option>
            {solutionInterestOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.interestedSolution && <p className="mt-1 text-xs text-red-500">{errors.interestedSolution}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Message <span className="normal-case text-muted/70">(optional)</span>
        </label>
        <textarea id="message" rows={4} className={inputClass("message")} {...field("message")} />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        showIcon={status !== "submitting"}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Request a School Demo"}
      </Button>
    </form>
  );
}
