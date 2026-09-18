import type { Course } from '@/types';

export const COURSES: Course[] = [
  {
    id: 'ap-physics-1',
    title: 'AP Physics 1',
    subtitle: 'Algebra-Based',
    description: 'Master kinematics, force systems, rotational dynamics, work-energy-power, and fluids. Fully aligned with the latest algebraic examination patterns.',
    duration: '12 - 14 Weeks',
    difficulty: 'Algebra-Based',
    curriculum: [
      'Kinematics',
      'Force & Translational Dynamics',
      'Work, Energy & Power',
      'Linear Momentum',
      'Torque & Rotational Dynamics',
      'Energy & Momentum of Rotating Systems',
      'Oscillations',
      'Fluids'
    ],
    features: [
      'Strictly aligned with official College Board syllabus guidelines',
      'Over 80+ actual past paper FRQ (Free Response Questions) solved live',
      'Advanced conceptual understanding with hands-on simulation tools',
      'Weekly worksheets filled with multiple-choice questions & grids'
    ]
  },
  {
    id: 'ap-physics-2',
    title: 'AP Physics 2',
    subtitle: 'Algebra-Based',
    description: 'Delve into thermodynamics, electromagnetism, optics, and modern physics. Build deep physical insight into the microscopic behavior of matter and waves.',
    duration: '12 - 14 Weeks',
    difficulty: 'Algebra-Based',
    curriculum: [
      'Thermodynamics',
      'Electric Force, Field & Potential',
      'Electric Circuits',
      'Magnetism & Electromagnetism',
      'Geometric Optics',
      'Waves, Sound & Physical Optics',
      'Modern Physics'
    ],
    features: [
      'Detailed lessons on circuit analysis and electromagnetic induction',
      'Full review of ray-tracing models and wave optics patterns',
      'Comprehensive quick-sheets containing all required equations',
      'Step-by-step guidance on complex qualitative/quantitative translation questions'
    ]
  },
  {
    id: 'ap-physics-c-mech',
    title: 'AP Physics C: Mech',
    subtitle: 'Calculus-Based',
    description: 'A highly rigorous, calculus-based path focusing on kinematics, Newton’s laws, momentum, rotational inertia, oscillations, and universal gravitation.',
    duration: '14 - 16 Weeks',
    difficulty: 'Calculus-Based',
    curriculum: [
      'Kinematics',
      'Force & Translational Dynamics',
      'Work, Energy & Power',
      'Linear Momentum',
      'Torque & Rotational Dynamics',
      'Energy & Momentum of Rotating Systems',
      'Oscillations',
      'Gravitation'
    ],
    features: [
      'Integrates derivative and integral calculus to resolve physical equations',
      'Intensive training on solving multi-tier rotational mechanics problems',
      'Step-by-step solutions to past AP Physics C mechanics exams',
      'Advanced vector mathematics and calculus helper tutorials'
    ]
  },
  {
    id: 'ap-physics-c-em',
    title: 'AP Physics C: E&M',
    subtitle: 'Calculus-Based',
    description: 'Advanced calculus-based exploration of electrostatics, Gauss’s Law, electric potential, capacitors, magnetic fields, and electromagnetic induction.',
    duration: '14 - 16 Weeks',
    difficulty: 'Calculus-Based',
    curriculum: [
      'Electric Charges, Fields & Gauss\'s Law',
      'Electric Potential',
      'Conductors & Capacitors',
      'Electric Circuits',
      'Magnetic Fields & Electromagnetism',
      'Electromagnetic Induction'
    ],
    features: [
      'Detailed derivations of Maxwell’s key electromagnetic relations',
      'Exhaustive analysis of RC, RL, and LC circuits via differential equations',
      'Comprehensive library of solved past paper problems and FRQs',
      'Custom interactive virtual experiments for magnetic flux visualization'
    ]
  },
  {
    id: 'tahsili-physics',
    title: 'Tahsili Physics',
    subtitle: 'Saudi National Exam',
    description: 'Bilingual (Arabic/English) exam prep designed to build high-speed multiple choice solving skills. Master critical equations and solve complicated calculations in under 45 seconds without a calculator!',
    duration: '6 - 8 Weeks',
    difficulty: 'All Levels',
    curriculum: [
      'Kinematics, Projectile equations, Force equilibrium, & Elastic collisions',
      'Thermal expansion, Specific heat, & Thermodynamic laws',
      'Wave harmonics, Sound interference, Mirror optics, & Light refraction',
      'Static Charges, Ohm’s Law circuits, & Magnetic force vectors',
      'Atomic shells, Semiconductor physics, & Modern Nuclear radiation'
    ],
    features: [
      'Delivered with fully bilingual Arabic/English scientific terminology',
      'Over 1,200+ actual past Tahsili questions reviewed and classified',
      'Advanced calculator-free mental arithmetic shortcuts & memorization tricks',
      'Full-length timed exam simulations mimicking SAEC (Qiyas) parameters'
    ]
  }
];
