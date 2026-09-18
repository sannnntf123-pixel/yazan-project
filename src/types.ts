export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  curriculum: string[];
  keyTopics?: string[];
  features: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | 'Algebra-Based' | 'Calculus-Based';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  course: string;
  avatarSeed: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricePackage {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  unit: string;
  badge?: string;
  description: string;
  features: string[];
  ctaText: string;
}
