"use client";

import { useState, useEffect, useMemo } from "react";
import { Section, Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import {
  courses,
  categories,
  catLabel,
  mentors,
  LEVELS,
  LEVEL_ORDER,
  weeks,
  moduleCount,
  type Course,
} from "@/lib/data/programs";
import styles from "./programs.module.css";

type SortKey = "popular" | "az" | "duration" | "level";

/* ── Catalog hero ─────────────────────────────────────────── */
function CatalogHero() {
  const total = courses.length;
  const weeksRange = courses.map((c) => weeks(c.duration));
  const minW = Math.min(...weeksRange);
  const maxW = Math.max(...weeksRange);
  return (
    <header className={styles["pc-hero"]}>
      <div className="u-wrap">
        <div className={styles["pc-hero-inner"]}>
          <span className={styles["pc-hero-eyebrow"]}>
            <span className={styles.bar} /> Programs · Course Catalog
          </span>
          <h1>
            Most popular &amp; in-demand <span className={styles.g}>AI courses</span>
          </h1>
          <p>
            Practical, project-based training in AI, Data Science, Python and automation — built by
            industry mentors. Browse every program running on the portal and start building job-ready
            skills.
          </p>
          <div className={styles["pc-hero-stats"]}>
            <div className={styles["pc-hstat"]}>
              <span className={styles.v}>
                <span className={styles.accent}>{total}</span>
              </span>
              <span className={styles.l}>Live courses</span>
            </div>
            <span className={styles["pc-hstat-div"]} />
            <div className={styles["pc-hstat"]}>
              <span className={styles.v}>4</span>
              <span className={styles.l}>Learning tracks</span>
            </div>
            <span className={styles["pc-hstat-div"]} />
            <div className={styles["pc-hstat"]}>
              <span className={styles.v}>
                {minW}–{maxW}
                <span style={{ fontSize: 16 }}> wks</span>
              </span>
              <span className={styles.l}>Program length</span>
            </div>
            <span className={styles["pc-hstat-div"]} />
            <div className={styles["pc-hstat"]}>
              <span className={styles.v}>
                96<span style={{ fontSize: 18 }}>%</span>
              </span>
              <span className={styles.l}>Success rate</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Course card ──────────────────────────────────────────── */
function CourseCard({ c, onOpen }: { c: Course; onOpen: (c: Course) => void }) {
  const m = mentors[c.mentor];
  const lvlColor = LEVELS[c.level];
  return (
    <article
      className={styles["pc-card"]}
      onClick={() => onOpen(c)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(c);
        }
      }}
    >
      <div className={styles["pc-thumb"]} style={{ ["--c"]: c.c } as React.CSSProperties}>
        <span className={styles["pc-thumb-cat"]}>{catLabel[c.cat]}</span>
        {c.popular && (
          <span className={styles["pc-thumb-pop"]}>
            <i className="fa-solid fa-fire" /> Popular
          </span>
        )}
        <i className={cn(c.brand ? "fa-brands" : "fa-solid", c.icon, styles["pc-thumb-icon"])} />
        <span className={styles["pc-thumb-dur"]}>
          <i className="fa-regular fa-clock" /> {c.duration}
        </span>
      </div>
      <div className={styles["pc-body"]}>
        <span className={styles["pc-level"]} style={{ color: lvlColor }}>
          <span className={styles.dot} style={{ background: lvlColor }} /> {c.level}
        </span>
        <h3>{c.title}</h3>
        <p className={styles["pc-desc"]}>{c.desc}</p>
        <div className={styles["pc-mentor"]}>
          <span className={styles["pc-mentor-av"]} style={{ background: m.grad }}>
            {m.initials}
          </span>
          <div>
            <div className={styles["m-name"]}>{m.name}</div>
            <div className={styles["m-role"]}>{m.role}</div>
          </div>
          <span className={styles["m-modules"]}>
            <i className="fa-solid fa-layer-group" /> {moduleCount(c)}{" "}
            {c.curriculum ? "modules" : "topics"}
          </span>
        </div>
        <div className={styles["pc-card-cta"]}>
          <span className={styles["pc-explore"]}>
            Explore course <i className="fa-solid fa-arrow-right" />
          </span>
          <button
            className={styles["pc-enroll"]}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(c);
            }}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── Detail modal ─────────────────────────────────────────── */
function CourseModal({ c, onClose }: { c: Course; onClose: () => void }) {
  const m = mentors[c.mentor];
  const [open, setOpen] = useState<number[]>(c.curriculum ? [0] : []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const toggle = (i: number) =>
    setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  return (
    <div className={styles["pc-modal-backdrop"]} onClick={onClose}>
      <div className={styles["pc-modal"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["pc-modal-banner"]} style={{ ["--c"]: c.c } as React.CSSProperties}>
          <button className={styles["pc-modal-close"]} onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
          <div className={styles["pc-modal-banner-top"]}>
            <span className={styles["pc-modal-icon"]}>
              <i className={cn(c.brand ? "fa-brands" : "fa-solid", c.icon)} />
            </span>
            <span className={styles["pc-modal-cat"]}>
              {catLabel[c.cat]}
              {c.popular ? " · Popular" : ""}
            </span>
          </div>
          <h2>{c.title}</h2>
          <p className={styles["pc-modal-desc"]}>{c.desc}</p>
          <div className={styles["pc-modal-facts"]}>
            <span className={styles["pc-fact"]}>
              <i className="fa-regular fa-clock" /> {c.duration}
            </span>
            <span className={styles["pc-fact"]}>
              <i className="fa-solid fa-signal" /> {c.level}
            </span>
            <span className={styles["pc-fact"]}>
              <i className="fa-solid fa-layer-group" /> {moduleCount(c)}{" "}
              {c.curriculum ? "modules" : "key topics"}
            </span>
            <span className={styles["pc-fact"]}>
              <i className="fa-solid fa-certificate" /> Certificate
            </span>
          </div>
        </div>

        <div className={styles["pc-modal-body"]}>
          {c.curriculum ? (
            <>
              <h4 className={styles["pc-sec-label"]}>
                Course Curriculum <span className={styles.ln} />
              </h4>
              <div className={styles["pc-modules"]}>
                {c.curriculum.map((mod, i) => (
                  <div
                    key={mod.number}
                    className={cn(styles["pc-module"], open.includes(i) && styles.open)}
                  >
                    <button className={styles["pc-module-head"]} onClick={() => toggle(i)}>
                      <span
                        className={styles["pc-module-num"]}
                        style={{ ["--mc"]: mod.color } as React.CSSProperties}
                      >
                        {mod.number}
                      </span>
                      <span className={styles["m-title"]}>{mod.title}</span>
                      <span className={styles["m-meta"]}>{mod.topics.length} topics</span>
                      <i className={cn("fa-solid fa-chevron-right", styles.chev)} />
                    </button>
                    <div className={styles["pc-module-topics"]}>
                      <div>
                        <ul style={{ ["--mc"]: mod.color } as React.CSSProperties}>
                          {mod.topics.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h4 className={styles["pc-sec-label"]}>
                What You&apos;ll Learn <span className={styles.ln} />
              </h4>
              <ul className={styles["pc-learn"]}>
                {(c.learn ?? []).map((t) => (
                  <li key={t}>
                    <i className="fa-solid fa-check" /> {t}
                  </li>
                ))}
              </ul>
              {c.includes && (
                <>
                  <h4 className={styles["pc-sec-label"]} style={{ marginTop: 30 }}>
                    Workshops Included <span className={styles.ln} />
                  </h4>
                  <div className={styles["pc-includes"]}>
                    {c.includes.map((t) => (
                      <span key={t} className={styles["pc-chip"]}>
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className={styles["pc-modal-foot"]}>
          <div className={styles["pc-modal-mentor"]}>
            <span className={styles.av} style={{ background: m.grad }}>
              {m.initials}
            </span>
            <div>
              <div className={styles.mn}>{m.name}</div>
              <div className={styles.mr}>{m.role}</div>
            </div>
          </div>
          <div className={styles.acts}>
            <Button variant="outline">Download Syllabus</Button>
            <Button variant="primary">
              Enroll Now <i className="fa-solid fa-arrow-right" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Catalog (controls + grid) ────────────────────────────── */
export default function ProgramsPage() {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [selected, setSelected] = useState<Course | null>(null);

  const counts = useMemo(() => {
    const out: Record<string, number> = { all: courses.length };
    courses.forEach((c) => {
      out[c.cat] = (out[c.cat] || 0) + 1;
    });
    return out;
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = courses.filter((c) => {
      if (cat !== "all" && c.cat !== cat) return false;
      if (!q) return true;
      const hay = [
        c.title,
        c.desc,
        catLabel[c.cat],
        c.level,
        ...(c.learn || []),
        ...(c.includes || []),
        ...(c.curriculum || []).flatMap((m) => [m.title, ...m.topics]),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
    const s = [...list];
    if (sort === "popular") s.sort((a, b) => (b.popular === a.popular ? 0 : b.popular ? 1 : -1));
    else if (sort === "az") s.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "duration") s.sort((a, b) => weeks(a.duration) - weeks(b.duration));
    else if (sort === "level") s.sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
    return s;
  }, [cat, query, sort]);

  return (
    <main>
      <CatalogHero />

      <div className={styles["pc-controls"]}>
        <div className={styles["pc-controls-inner"]}>
          <div className={styles["pc-controls-top"]}>
            <div className={styles["pc-search"]}>
              <i className="fa-solid fa-magnifying-glass" />
              <input
                type="text"
                placeholder="Search courses, skills or topics…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button className={styles.clear} onClick={() => setQuery("")} aria-label="Clear">
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>
            <div className={styles["pc-sort"]}>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort courses"
              >
                <option value="popular">Sort: Popular first</option>
                <option value="az">Sort: A → Z</option>
                <option value="duration">Sort: Shortest first</option>
                <option value="level">Sort: By level</option>
              </select>
              <i className="fa-solid fa-chevron-down" />
            </div>
          </div>
          <div className={styles["pc-pills"]}>
            {categories.map((ct) => (
              <button
                key={ct.key}
                className={cn(styles["pc-pill"], cat === ct.key && styles.active)}
                onClick={() => setCat(ct.key)}
              >
                {ct.label} <span className={styles.count}>{counts[ct.key] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Section className="u-section" id="catalog">
        <div className="u-wrap">
          <div className={cn(styles["pc-meta"], "u-reveal")}>
            <span className={styles.count}>
              Showing <b>{visible.length}</b> {visible.length === 1 ? "course" : "courses"}
              {cat !== "all" ? (
                <span>
                  {" "}
                  in <b style={{ color: "var(--brand-purple-600)" }}>{catLabel[cat]}</b>
                </span>
              ) : null}
            </span>
            {query && (
              <span className={styles.crumbs}>
                Results for “<b>{query}</b>”
              </span>
            )}
          </div>

          {visible.length > 0 ? (
            <div className={cn(styles["pc-grid"], "u-reveal")}>
              {visible.map((c) => (
                <CourseCard key={c.id} c={c} onOpen={setSelected} />
              ))}
            </div>
          ) : (
            <div className={cn(styles["pc-empty"], "u-reveal")}>
              <div className={styles["pc-empty-ic"]}>
                <i className="fa-solid fa-magnifying-glass" />
              </div>
              <h3>No courses match your search</h3>
              <p>Try a different keyword or clear your filters to see every program.</p>
              <Button
                variant="brand"
                onClick={() => {
                  setQuery("");
                  setCat("all");
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </Section>

      {selected && <CourseModal c={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
