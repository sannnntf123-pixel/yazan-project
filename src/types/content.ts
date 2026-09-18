import type { LucideIcon } from 'lucide-react';

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

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
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
