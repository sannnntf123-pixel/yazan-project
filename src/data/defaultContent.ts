import type { SiteContent } from '@/types';
import { COURSES } from './courses';
import { SERVICES } from './services';
import { TESTIMONIALS } from './testimonials';
import { FAQ_ITEMS } from './faq';

/**
 * The content the site ships with. The admin CMS stores overrides on top of
 * this, and any field missing from the stored version falls back to it.
 */
export const DEFAULT_CONTENT: SiteContent = {
  site: {
    name: 'Momentum Physics Academy',
    shortName: 'Momentum Physics',
    metaDescription: 'Premium physics tutoring academy for AP, IGCSE, A Level, and Tahsili physics exams.',
    whatsappNumber: '966597621520',
    instagramUrl: 'https://www.instagram.com/momentum.physics',
    copyrightYear: 2026,
  },
  hero: {
    badge: 'Clarity · Strategy · Momentum',
    titleLine1: 'Master Physics.',
    titleLine2: 'Achieve Higher Scores.',
    description:
      'Expert Physics tutoring designed for students preparing for AP Physics and Tahsili. Build complete conceptual mastery and top test taking strategies.',
    primaryCta: 'Enroll Now',
    secondaryCta: 'View Courses',
    metrics: [
      { value: 'A* / 5', label: 'Target Score', accent: false },
      { value: '100%', label: 'Online HD', accent: true },
      { value: '1-on-1', label: '& Groups', accent: false },
    ],
  },
  about: {
    eyebrow: 'About the Academy',
    title: 'Why Momentum Physics?',
    lead: "At Momentum Physics, we believe that Physics shouldn't feel complicated.",
    paragraphs: [
      'Our teaching focuses on building deep understanding, problem-solving skills, and exam strategies that help students achieve top results.',
      "Whether you're preparing for AP Physics or Tahsili, our structured lessons simplify difficult concepts and build confidence. We strip away memory mechanics and replace them with intuitive physical frameworks.",
    ],
    highlights: [
      { title: 'Concept Mastery First', text: 'Core visualizations and simulations over boring memorization.' },
      { title: 'Exam-focused Answering', text: 'Precise syllabus terminology that locks down maximum points.' },
      { title: 'Proven Results Record', text: 'Over 90% of cohorts secure premium grade bands annually.' },
    ],
  },
  courses: {
    eyebrow: 'Academic Pathways',
    title: 'Syllabus Specialized Courses',
    description:
      'We design structured courses mapped specifically to official exam boards. Select your curriculum track to access topic lists and syllabus outlines.',
    items: COURSES,
  },
  services: {
    eyebrow: 'Methodology & Services',
    title: 'How We Deliver Results',
    description:
      'From specialized group classes to tailored private session blocks, we adapt to the individual pacing and calendar of every high school student.',
    items: SERVICES,
  },
  pricing: {
    eyebrow: 'Simple Transparent Tuition',
    title: 'Tutoring Pricing Plans',
    description:
      'Premium physics instruction at clear, accessible rates. Toggle plans or estimate cost based on your custom hours below.',
    oneOnOne: { originalPerHour: 400, discountPerHour: 250, minHours: 2, maxHours: 40, defaultHours: 10 },
    group: { original: 5000, discount: 1900 },
  },
  testimonials: {
    eyebrow: 'Student & Parent Success',
    title: 'Hear From Our Alumni',
    description:
      'Hundreds of high school students have transformed their physics performance, scoring 5s on APs and top-tier Tahsili percentages.',
    items: TESTIMONIALS,
  },
  faq: {
    eyebrow: 'Frequently Asked Questions',
    title: 'Got Questions? We Have Answers.',
    description:
      'Find answers regarding online digital whiteboards, session recordings access, curricula details, and payment transfers.',
    items: FAQ_ITEMS,
  },
  footer: {
    tagline: 'Clarity. Strategy. Momentum. Bridging the gap between physical mechanics and examination mastery.',
  },
  bank: {
    bankName: 'Al Rajhi Bank',
    accountName: 'Momentum Physics Academy',
    iban: 'SA37 1000 0011 1003 7585 5900',
    swiftCode: 'RJHISARI',
    currency: 'SAR',
    stcPayNumber: '+966 59 762 1520',
  },
};
