import { z } from 'zod';
import { SERVICE_ICONS } from '@/types';

const id = z.string().trim().min(1).max(64);
const text = z.string().max(2000);
const shortText = z.string().max(300);

const courseSchema = z.object({
  id,
  title: shortText,
  subtitle: shortText,
  description: text,
  duration: shortText,
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Algebra-Based', 'Calculus-Based']),
  curriculum: z.array(shortText).max(30),
  features: z.array(text).max(30),
});

const sectionCopy = { eyebrow: shortText, title: shortText, description: text };

/** Runtime validation for content saved through the CMS. Mirrors `SiteContent`. */
export const siteContentSchema = z.object({
  site: z.object({
    name: shortText.min(1),
    shortName: shortText.min(1),
    metaDescription: text,
    whatsappNumber: z.string().regex(/^\d{7,15}$/, 'Digits only, with country code (e.g. 966597621520)'),
    instagramUrl: z.union([z.url(), z.literal('')]),
    copyrightYear: z.number().int().min(2000).max(2100),
  }),
  hero: z.object({
    badge: shortText,
    titleLine1: shortText,
    titleLine2: shortText,
    description: text,
    primaryCta: shortText,
    secondaryCta: shortText,
    metrics: z.array(z.object({ value: shortText, label: shortText, accent: z.boolean() })).max(6),
  }),
  about: z.object({
    eyebrow: shortText,
    title: shortText,
    lead: text,
    paragraphs: z.array(text).max(10),
    highlights: z.array(z.object({ title: shortText, text: text })).max(10),
  }),
  courses: z.object({ ...sectionCopy, items: z.array(courseSchema).max(20) }),
  services: z.object({
    ...sectionCopy,
    items: z
      .array(z.object({ id, title: shortText, description: text, icon: z.enum(SERVICE_ICONS), accentClassName: shortText }))
      .max(12),
  }),
  pricing: z.object({
    ...sectionCopy,
    oneOnOne: z.object({
      originalPerHour: z.number().nonnegative(),
      discountPerHour: z.number().nonnegative(),
      minHours: z.number().int().min(1),
      maxHours: z.number().int().min(1),
      defaultHours: z.number().int().min(1),
    }),
    group: z.object({ original: z.number().nonnegative(), discount: z.number().nonnegative() }),
  }),
  testimonials: z.object({
    ...sectionCopy,
    items: z
      .array(z.object({ id, name: shortText, role: shortText, course: shortText, content: text, rating: z.number().int().min(1).max(5) }))
      .max(20),
  }),
  faq: z.object({ ...sectionCopy, items: z.array(z.object({ id, question: shortText, answer: text })).max(30) }),
  footer: z.object({ tagline: text }),
  bank: z.object({
    bankName: shortText,
    accountName: shortText,
    iban: shortText,
    swiftCode: shortText,
    currency: shortText,
    stcPayNumber: shortText,
  }),
});
