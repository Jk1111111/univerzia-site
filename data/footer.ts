import { site } from "./site";

export const footerData = {
  tagline: "Let's Build What's Next.",
  companyName: "univsia.ai",
  description: site.description.replace(site.fullName, "univsia.ai"),
  columns: [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Mission", href: "/about" },
        { label: "Leadership", href: "/about" },
        { label: "Careers", href: "/contact" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "STEM & Robotics", href: "/solutions/stem-robotics" },
        { label: "AI & Coding", href: "/solutions/ai-coding" },
        { label: "ERP", href: "https://app.univerziaai.in" },
        // No dedicated LMS URL is configured yet.
        { label: "LMS", href: "", placeholder: true },
        { label: "Innovation Labs", href: "/solutions/innovation-labs" },
        { label: "Teacher Training", href: "/solutions/teacher-training" },
        { label: "STEM Curriculum", href: "/solutions/stem-curriculum" },
      ],
    },
    {
      title: "Programs",
      links: [
        { label: "Primary School", href: "/programs/primary" },
        { label: "Middle School", href: "/programs/middle-school" },
        { label: "High School", href: "/programs/high-school" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/resources/blog" },
        { label: "Case Studies", href: "/resources/case-studies" },
        { label: "Events", href: "/resources/events" },
        { label: "FAQ", href: "/resources/faq" },
        { label: "Downloads", href: "/resources/downloads" },
      ],
    },
  ],
  contact: {
    email: site.email,
    phone: site.phone,
    offices: site.offices,
    enquiryHref: "/contact",
  },
  social: [
    { label: "LinkedIn", href: site.social.linkedin, icon: "linkedin" },
    { label: "Instagram", href: site.social.instagram, icon: "instagram" },
    { label: "YouTube", href: site.social.youtube, icon: "youtube" },
    { label: "Facebook", href: site.social.facebook, icon: "facebook" },
  ],
  marquee: ["STEM", "ROBOTICS", "AI", "CODING", "IOT", "INNOVATION"],
};
