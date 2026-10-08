import { type ComponentType, type SVGProps } from "react";
import {
  HandMetal,
  PackageCheck,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Hammer,
  Brain,
  Puzzle,
  Sparkles,
  Users,
  Code2,
  Bot,
  Cpu,
  Lightbulb,
  RadioTower,
  Glasses,
  BookOpen,
  Building2,
  Search,
  PencilRuler,
  Wrench,
  Rocket,
  LifeBuoy,
  BarChart3,
  Sprout,
  TrafficCone,
  ScanEye,
  Zap,
  CloudSun,
  Recycle,
  Ear,
  ShieldAlert,
  Laptop,
  Presentation,
  Trophy,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Star,
  Quote,
  Atom,
  Settings,
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  CircuitBoard,
  PlayCircle,
  FileText,
  CalendarCheck,
} from "lucide-react";

// lucide-react no longer ships brand/social marks — minimal custom outline glyphs stand in for them.
function LinkedinGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="7" r="0.6" fill="currentColor" />
      <path d="M11.5 16.5v-4a2 2 0 0 1 4 0v4" />
      <line x1="11.5" y1="10.5" x2="11.5" y2="16.5" />
    </svg>
  );
}

function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </svg>
  );
}

function YoutubeGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M14 21v-7h2.2l.3-3H14V9.2c0-.9.25-1.5 1.55-1.5H16.6V5.1C16.3 5.06 15.4 5 14.35 5 12.15 5 10.6 6.32 10.6 8.8V11H8.4v3h2.2v7" />
    </svg>
  );
}

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

const icons: Record<string, IconComponent> = {
  "hand-metal": HandMetal,
  "package-check": PackageCheck,
  "graduation-cap": GraduationCap,
  "shield-check": ShieldCheck,
  "trending-up": TrendingUp,
  hammer: Hammer,
  brain: Brain,
  puzzle: Puzzle,
  sparkles: Sparkles,
  users: Users,
  "code-2": Code2,
  bot: Bot,
  cpu: Cpu,
  lightbulb: Lightbulb,
  "radio-tower": RadioTower,
  glasses: Glasses,
  "book-open": BookOpen,
  "building-2": Building2,
  search: Search,
  "pencil-ruler": PencilRuler,
  wrench: Wrench,
  rocket: Rocket,
  "life-buoy": LifeBuoy,
  "bar-chart-3": BarChart3,
  sprout: Sprout,
  "traffic-cone": TrafficCone,
  "scan-eye": ScanEye,
  zap: Zap,
  "cloud-sun": CloudSun,
  recycle: Recycle,
  ear: Ear,
  "shield-alert": ShieldAlert,
  laptop: Laptop,
  presentation: Presentation,
  trophy: Trophy,
  linkedin: LinkedinGlyph,
  instagram: InstagramGlyph,
  youtube: YoutubeGlyph,
  facebook: FacebookGlyph,
  menu: Menu,
  x: X,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  star: Star,
  quote: Quote,
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  send: Send,
  check: Check,
  "circuit-board": CircuitBoard,
  play: PlayCircle,
  atom: Atom,
  settings: Settings,
  "file-text": FileText,
  "calendar-check": CalendarCheck,
};

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
