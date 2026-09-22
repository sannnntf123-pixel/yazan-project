export type CourseDifficulty =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'All Levels'
  | 'Algebra-Based'
  | 'Calculus-Based';

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  difficulty: CourseDifficulty;
  curriculum: string[];
  features: string[];
}

/** Icon names the CMS can pick for a service card (mapped to lucide icons in the UI). */
export const SERVICE_ICONS = ['User', 'Users', 'Award', 'BookOpen', 'GraduationCap', 'Zap', 'Atom', 'TrendingUp'] as const;
export type ServiceIconName = (typeof SERVICE_ICONS)[number];

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  /** Tailwind classes for the icon tile (text / bg / border colours) */
  accentClassName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  course: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavLink {
  href: `#${string}`;
  label: string;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HeroMetric {
  value: string;
  label: string;
  accent: boolean;
}

export interface AboutHighlight {
  title: string;
  text: string;
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  iban: string;
  swiftCode: string;
  currency: string;
  stcPayNumber: string;
}

/** Everything on the single-page site that the admin CMS can edit. */
export interface SiteContent {
  site: {
    name: string;
    shortName: string;
    metaDescription: string;
    /** International format without "+", e.g. 966597621520 */
    whatsappNumber: string;
    instagramUrl: string;
    copyrightYear: number;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: HeroMetric[];
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    paragraphs: string[];
    highlights: AboutHighlight[];
  };
  courses: SectionCopy & { items: Course[] };
  services: SectionCopy & { items: Service[] };
  pricing: SectionCopy & {
    oneOnOne: { originalPerHour: number; discountPerHour: number; minHours: number; maxHours: number; defaultHours: number };
    group: { original: number; discount: number };
  };
  testimonials: SectionCopy & { items: Testimonial[] };
  faq: SectionCopy & { items: FAQItem[] };
  footer: {
    tagline: string;
  };
  bank: BankDetails;
}
