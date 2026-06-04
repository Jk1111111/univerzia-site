"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(
        'input, select, textarea, button:not([aria-label="Close"])'
      );
      first?.focus();
    }, 100);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, handleKeyDown]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          opacity: visible ? 1 : 0,
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-[22px] transition-all duration-300"
        style={{
          background: "var(--bg-card)",
          boxShadow: "0 32px 80px -16px rgba(0,0,0,0.4)",
          transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-0">
          {title && (
            <h2
              id="modal-title"
              className="text-[20px] font-bold"
              style={{ color: "var(--fg-1)" }}
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto w-[36px] h-[36px] rounded-full flex items-center justify-center text-[18px] transition-colors duration-150 cursor-pointer"
            style={{ color: "var(--fg-3)", background: "var(--gray-100)" }}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
