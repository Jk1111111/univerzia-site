"use client";

import { Button } from "@/components/ui";
import { useLeadModal } from "@/contexts/LeadModalContext";

export default function HeroCTAs() {
  const { open } = useLeadModal();

  return (
    <div className="flex flex-wrap gap-[14px]">
      <Button variant="primary" size="lg" href="/programs">
        Start Learning <i className="fa-solid fa-arrow-right" />
      </Button>
      <Button variant="ghost-dark" size="lg" href="/ai-workshops">
        Explore AI Workshops
      </Button>
      <Button
        variant="ghost-dark"
        size="lg"
        style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.28)",
        }}
        onClick={() =>
          open({
            source: "homepage-hero",
            program: "Free Career Consultation",
            ctaType: "book-consultation",
          })
        }
      >
        Book Free Career Consultation
      </Button>
    </div>
  );
}
