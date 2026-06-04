"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Modal from "@/components/ui/Modal";
import LeadCaptureModal from "@/components/ui/LeadCaptureModal";
import type { LeadModalParams } from "@/components/ui/LeadCaptureModal";

interface LeadModalContextValue {
  open: (params: LeadModalParams) => void;
  close: () => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used within LeadModalProvider");
  return ctx;
}

export default function LeadModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState<LeadModalParams>({
    source: "",
    ctaType: "",
  });

  const open = useCallback((p: LeadModalParams) => {
    setParams(p);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LeadModalContext.Provider value={{ open, close }}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Get Started with Univerzia AI"
      >
        <LeadCaptureModal params={params} onClose={close} />
      </Modal>
    </LeadModalContext.Provider>
  );
}
