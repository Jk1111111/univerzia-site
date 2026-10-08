import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import { media } from "@/data/media";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { StemAmbient } from "@/components/ui/StemAmbient";
import { EduImage } from "@/components/ui/EduImage";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ideas on STEM education, robotics, AI in schools and building an innovation culture — from the Univerzia STEM Labs team.",
};

const categoryAccent: Record<string, string> = {
  "AI & Coding": "text-violet-ink",
  Culture: "text-orange-ink",
  Implementation: "text-electric",
  Perspective: "text-cyan-ink",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <section
        className="relative overflow-hidden py-20 pt-32 sm:py-24 sm:pt-40"
        style={{ background: "linear-gradient(135deg, #eef1ff 0%, #fbfbfe 45%, #eafcfb 100%)" }}
      >
        <StemAmbient />
        <Container className="relative">
          <Reveal>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Blog" }]} />
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Ideas From the Classroom and the Lab
            </h1>
          </Reveal>

          {/* featured post — large editorial treatment, not a card */}
          {featured && (
            <Reveal delay={0.1}>
              <div className="group mt-14 grid gap-8 overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift lg:grid-cols-[1.2fr_1fr]">
                <EduImage
                  src={(media[featured.image] as string[])[0]}
                  alt={featured.title}
                  sizes="(min-width: 1024px) 55vw, 90vw"
                  className="aspect-[16/10] lg:aspect-auto"
                  fallback={<div className="h-full w-full bg-paper-2" />}
                />
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <span className={`inline-flex w-fit rounded-full bg-paper-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide ${categoryAccent[featured.category] ?? "text-electric"}`}>
                    {featured.category}
                  </span>
                  <h2 className="mt-4 text-2xl font-bold leading-tight text-ink sm:text-3xl">{featured.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center gap-3 text-xs text-muted">
                    <span>{formatDate(featured.date)}</span>
                    <span className="size-1 rounded-full bg-muted/40" />
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* rest — a tight editorial list, not a repeated grid */}
          <RevealGroup className="mt-6 divide-y divide-line">
            {rest.map((post) => (
              <RevealItem key={post.slug} className="group flex items-center gap-6 py-6">
                <EduImage
                  src={(media[post.image] as string[])[0]}
                  alt={post.title}
                  sizes="112px"
                  className="aspect-square w-24 shrink-0 rounded-xl sm:w-28"
                  fallback={<div className="h-full w-full bg-paper-2" />}
                />
                <div className="min-w-0 flex-1">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${categoryAccent[post.category] ?? "text-electric"}`}>
                    {post.category}
                  </span>
                  <h3 className="mt-1 truncate text-base font-semibold text-ink sm:text-lg">{post.title}</h3>
                  <p className="mt-1 line-clamp-1 text-sm text-muted sm:line-clamp-2">{post.excerpt}</p>
                </div>
                <div className="hidden shrink-0 text-right text-xs text-muted sm:block">
                  <p>{formatDate(post.date)}</p>
                  <p className="mt-0.5">{post.readTime}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
