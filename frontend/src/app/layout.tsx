import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Nav, Footer } from "@/components/layout";
import LeadModalProvider from "@/contexts/LeadModalContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Univerzia AI — Learn AI, Build Real Projects, Future-Proof Your Career",
    template: "%s | Univerzia AI",
  },
  description:
    "Practical, project-based AI education with industry mentors. Master AI tools, build a portfolio, and land real opportunities. 500+ students enrolled, 96% success rate.",
  keywords: [
    "AI education India",
    "learn AI online",
    "AI courses",
    "prompt engineering",
    "data science course",
    "EdTech Varanasi",
    "AI tools workshop",
    "machine learning course",
  ],
  metadataBase: new URL("https://www.univerziaai.in"),
  openGraph: {
    title: "Univerzia AI — AI-Powered Learning Ecosystem",
    description:
      "Practical AI education with real projects, industry mentors, and career support.",
    url: "https://www.univerziaai.in",
    siteName: "Univerzia AI",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Univerzia AI — Learn AI, Build Real Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Univerzia AI — Learn AI & Future-Proof Your Career",
    description:
      "Practical, project-based AI education. 500+ students · 96% success rate.",
    creator: "@UniverziaAi",
    images: ["/brand/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        {/* Font Awesome 6 Free */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <LeadModalProvider>
          <Nav />
          {children}
          <Footer />
        </LeadModalProvider>
      </body>
    </html>
  );
}
