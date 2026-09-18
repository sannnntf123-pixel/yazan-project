import { Award, BookOpen, User, Users } from 'lucide-react';
import type { Service } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'service-1',
    title: 'One-on-One Tutoring',
    description: 'Personalized lessons tailored to your pace.',
    icon: User,
    accentClassName: 'text-electric-blue bg-electric-blue/10 border-electric-blue/20'
  },
  {
    id: 'service-2',
    title: 'Small Group Courses',
    description: 'Interactive classes with a maximum of 15 students.',
    icon: Users,
    accentClassName: 'text-cyan-accent bg-cyan-accent/10 border-cyan-accent/20'
  },
  {
    id: 'service-3',
    title: 'Exam Preparation',
    description: 'Practice exams, revision sessions, and test-taking strategies.',
    icon: Award,
    accentClassName: 'text-white bg-white/5 border-white/10'
  },
  {
    id: 'service-4',
    title: 'Homework & Problem Solving',
    description: 'Guided support for assignments and difficult topics.',
    icon: BookOpen,
    accentClassName: 'text-cyan-accent bg-cyan-accent/10 border-cyan-accent/20'
  }
];
