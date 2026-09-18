'use client';

import { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Users,
  User,
  Award,
  Clock,
  Phone,
  Mail,
  Zap,
  ArrowRight,
  TrendingUp,
  Atom,
  CheckCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Instagram,
  ArrowUpRight,
  Globe
} from 'lucide-react';

import { Course } from './types';
import ParticleBackground from './components/ParticleBackground';
import physicsLogo from './assets/images/physics_logo_1784026386356.jpg';
import PhysicsSandbox from './components/PhysicsSandbox';
import CourseModal from './components/CourseModal';
import PricingCalculator from './components/PricingCalculator';
import FAQAccordion from './components/FAQAccordion';
import EnrollmentForm from './components/EnrollmentForm';
import RegistrationSuccess from './components/RegistrationSuccess';
import DomainSetupModal from './components/DomainSetupModal';
import { EnrollmentPayload } from './types/enrollment';

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeCourseEnrollName, setActiveCourseEnrollName] = useState<string>('');
  const [currentView, setCurrentView] = useState<'main' | 'registration-success'>('main');
  const [submittedEnrollment, setSubmittedEnrollment] = useState<EnrollmentPayload | null>(null);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState<boolean>(false);

  // Sync hash routing for /registration-success view
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#registration-success' || window.location.pathname === '/registration-success') {
        setCurrentView('registration-success');
      } else if (!window.location.hash || window.location.hash === '#home') {
        setCurrentView('main');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Core Courses Requested by User
  const courses: Course[] = [
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

  // 4 Services with Icons requested
  const services = [
    {
      id: 'service-1',
      title: 'One-on-One Tutoring',
      description: 'Personalized lessons tailored to your pace.',
      icon: User,
      color: 'text-electric-blue bg-electric-blue/10 border-electric-blue/20'
    },
    {
      id: 'service-2',
      title: 'Small Group Courses',
      description: 'Interactive classes with a maximum of 15 students.',
      icon: Users,
      color: 'text-cyan-accent bg-cyan-accent/10 border-cyan-accent/20'
    },
    {
      id: 'service-3',
      title: 'Exam Preparation',
      description: 'Practice exams, revision sessions, and test-taking strategies.',
      icon: Award,
      color: 'text-white bg-white/5 border-white/10'
    },
    {
      id: 'service-4',
      title: 'Homework & Problem Solving',
      description: 'Guided support for assignments and difficult topics.',
      icon: BookOpen,
      color: 'text-cyan-accent bg-cyan-accent/10 border-cyan-accent/20'
    }
  ];

  // Testimonials requested
  const testimonials = [
    {
      id: 't1',
      name: 'Sarah Al-Otaibi',
      role: 'AP Physics 1 Student',
      course: 'AP Physics (Score: 5)',
      content: 'Momentum Physics completely changed the way I understand Physics. What felt like an abstract wall of math became highly visual and intuitive!',
      rating: 5,
      avatarSeed: 'sarah'
    },
    {
      id: 't2',
      name: 'Ryan Al-Harbi',
      role: 'AP Physics C Student',
      course: 'AP Physics C (Score: 5)',
      content: 'The teaching style is clear, organized, and easy to follow. Our tutor explained every formula derivation and gave me strategies that helped me write flawless free-response structures.',
      rating: 5,
      avatarSeed: 'ryan'
    },
    {
      id: 't3',
      name: 'Faisal Al-Qahtani',
      role: 'Saudi Qiyas Prep Track',
      course: 'Tahsili Physics (Physics Score: 98)',
      content: 'I improved my grades significantly. The mental math tricks for Tahsili were absolute lifesavers—I was solving mechanics questions in seconds without a calculator!',
      rating: 5,
      avatarSeed: 'faisal'
    }
  ];

  const handleEnrollClick = (courseName: string) => {
    if (currentView !== 'main') {
      setCurrentView('main');
      window.location.assign('#contact');
    }
    setActiveCourseEnrollName(courseName);
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleEnrollmentSuccess = (payload: EnrollmentPayload) => {
    setSubmittedEnrollment(payload);
    setCurrentView('registration-success');
    window.location.hash = '#registration-success';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnHome = () => {
    setCurrentView('main');
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-brand-black text-white font-sans antialiased overflow-x-hidden">
      {/* Premium Particles Dynamic Background */}
      <ParticleBackground />

      {/* Background Glow Effects from Clean Minimalism Theme */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none select-none z-0"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-[300px] h-[300px] bg-cyan-accent/10 rounded-full blur-[100px] pointer-events-none select-none z-0"></div>

      {/* 1. Header & Navigation (Sticky glassmorphism nav) */}
      <header id="app-header" className="sticky top-0 z-40 w-full bg-brand-black/75 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Logo Brand Frame */}
          <button
            onClick={handleReturnHome}
            id="brand-logo-nav"
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <img 
              src={physicsLogo.src} 
              alt="Momentum Physics" 
              className="h-10 sm:h-12 w-auto object-contain rounded-lg transition-transform group-hover:scale-105 duration-300"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-display font-medium tracking-wide text-brand-silver">
            <button onClick={handleReturnHome} className="hover:text-white transition-colors cursor-pointer">Home</button>
            <a href="#about" onClick={() => currentView !== 'main' && setCurrentView('main')} className="hover:text-white transition-colors">About</a>
            <a href="#courses" onClick={() => currentView !== 'main' && setCurrentView('main')} className="hover:text-white transition-colors">Courses</a>
            <a href="#pricing" onClick={() => currentView !== 'main' && setCurrentView('main')} className="hover:text-white transition-colors">Pricing</a>
            <a href="#contact" onClick={() => currentView !== 'main' && setCurrentView('main')} className="hover:text-white transition-colors">Registration</a>
          </nav>

          {/* Call to action Header buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDomainModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-cyan-accent border border-cyan-accent/20 bg-cyan-accent/5 hover:bg-cyan-accent/15 transition-all cursor-pointer"
              title="How to buy a domain for this website"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Domain Guide</span>
            </button>

            <a
              href="#contact"
              onClick={() => currentView !== 'main' && setCurrentView('main')}
              id="nav-enroll-btn"
              className="px-4 py-2.5 rounded-lg text-xs font-display font-semibold border border-electric-blue/30 bg-electric-blue/10 text-white hover:bg-electric-blue hover:shadow-lg hover:shadow-electric-blue/20 transition-all cursor-pointer block text-center"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </header>

      {/* Main Container Wrapper */}
      <main className="relative z-10">

        {/* 2. Hero Section */}
        <section id="home" className="relative pt-8 pb-16 sm:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left: Headlines */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              
              {/* Premium Top Badge */}
              <div className="inline-flex items-center gap-2 bg-electric-blue/10 text-cyan-accent px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-electric-blue/20">
                <Sparkles className="w-3.5 h-3.5" />
                Clarity · Strategy · Momentum
              </div>

              <div className="space-y-4">
                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
                  Master Physics.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent via-electric-blue to-white">
                    Achieve Higher Scores.
                  </span>
                </h1>

                <p className="text-sm sm:text-lg text-brand-silver font-sans max-w-xl leading-relaxed">
                  Expert Physics tutoring designed for students preparing for AP Physics and Tahsili. Build complete conceptual mastery and top test taking strategies.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  id="hero-enroll-now-btn"
                  className="px-8 py-4 rounded-xl text-xs sm:text-sm font-display font-bold bg-gradient-to-r from-electric-blue to-cyan-accent text-white shadow-xl shadow-electric-blue/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Enroll Now
                  <ArrowRight className="w-4.5 h-4.5" />
                </a>

                <a
                  href="#courses"
                  id="hero-view-courses-btn"
                  className="px-8 py-4 rounded-xl text-xs sm:text-sm font-display font-semibold border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  View Courses
                </a>
              </div>

              {/* Faint metric ribbon */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 max-w-md font-mono">
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-white">A* / 5</span>
                  <span className="text-[10px] text-brand-silver uppercase tracking-wider">Target Score</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-cyan-accent">100%</span>
                  <span className="text-[10px] text-brand-silver uppercase tracking-wider">Online HD</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-white">1-on-1</span>
                  <span className="text-[10px] text-brand-silver uppercase tracking-wider">&amp; Groups</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Tech Blueprint Mockup representing Physics */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-square glass-panel border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl bg-gradient-to-br from-navy-card/60 to-brand-black">
                {/* Background decorative planet orbits */}
                <div className="absolute inset-0 border border-white/5 rounded-full scale-75 animate-pulse" />
                <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />
                
                <div className="flex justify-between items-start z-10">
                  <span className="text-[10px] font-mono text-brand-silver bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    SYS.VECTORS
                  </span>
                  <Zap className="w-5 h-5 text-cyan-accent animate-bounce" />
                </div>

                {/* Conceptual vector canvas render */}
                <div className="my-auto py-8 relative flex flex-col items-center justify-center space-y-3 z-10">
                  <div className="w-16 h-16 rounded-full bg-electric-blue/20 border-2 border-electric-blue flex items-center justify-center text-xl text-white font-display font-black relative shadow-lg shadow-electric-blue/30">
                    p
                    <span className="absolute -top-1.5 -right-1.5 text-[9px] font-mono text-cyan-accent uppercase bg-brand-black px-1 border border-cyan-accent/20 rounded">
                      vector
                    </span>
                  </div>
                  
                  {/* Connect arrow lines */}
                  <div className="h-10 border-r border-dashed border-cyan-accent relative">
                    <div className="absolute bottom-0 -right-1 border-t-4 border-t-cyan-accent border-x-4 border-x-transparent" />
                  </div>

                  <div className="text-center">
                    <div className="font-mono text-xs text-white uppercase tracking-wider font-semibold">momentum = mass × velocity</div>
                    <div className="font-mono text-[10px] text-brand-silver mt-1">p_net = Σm_i·v_i</div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-brand-silver pt-2 border-t border-white/5 z-10">
                  <span>CLARITY</span>
                  <span>STRATEGY</span>
                  <span>MOMENTUM</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. About Us Section ("Why Momentum Physics?") */}
        <section id="about" className="py-16 sm:py-24 border-t border-white/5 relative bg-gradient-to-b from-brand-black to-navy-dark/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content Column */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="space-y-3">
                  <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest font-bold">ABOUT THE ACADEMY</span>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                    Why Momentum Physics?
                  </h2>
                </div>

                <div className="space-y-4 text-brand-silver text-sm sm:text-base leading-relaxed">
                  <p className="text-white font-semibold font-display">
                    At Momentum Physics, we believe that Physics shouldn't feel complicated.
                  </p>
                  
                  <p>
                    Our teaching focuses on building deep understanding, problem-solving skills, and exam strategies that help students achieve top results.
                  </p>

                  <p>
                    Whether you're preparing for AP Physics or Tahsili, our structured lessons simplify difficult concepts and build confidence. We strip away memory mechanics and replace them with intuitive physical frameworks.
                  </p>
                </div>

                {/* Features list under About Us */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-brand-silver">
                    <span className="w-5 h-5 rounded bg-electric-blue/15 text-cyan-accent flex items-center justify-center shrink-0 font-bold">✓</span>
                    <span><strong>Concept Mastery First</strong> — Core visualizations and simulations over boring memorization.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-brand-silver">
                    <span className="w-5 h-5 rounded bg-electric-blue/15 text-cyan-accent flex items-center justify-center shrink-0 font-bold">✓</span>
                    <span><strong>Exam-focused Answering</strong> — Precise syllabus terminology that locks down maximum points.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-brand-silver">
                    <span className="w-5 h-5 rounded bg-electric-blue/15 text-cyan-accent flex items-center justify-center shrink-0 font-bold">✓</span>
                    <span><strong>Proven Results Record</strong> — Over 90% of cohorts secure premium grade bands annually.</span>
                  </div>
                </div>
              </div>

              {/* Right Content Column: Live Interactive Sandbox Lab */}
              <div className="lg:col-span-6">
                <PhysicsSandbox />
              </div>

            </div>
          </div>
        </section>

        {/* 4. Courses Section */}
        <section id="courses" className="py-16 sm:py-24 border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            {/* Header Title block */}
            <div className="max-w-xl mx-auto space-y-3">
              <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest font-bold">ACADEMIC PATHWAYS</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Syllabus Specialized Courses
              </h2>
              <p className="text-xs sm:text-sm text-brand-silver leading-relaxed">
                We design structured courses mapped specifically to official exam boards. Select your curriculum track to access topic lists and syllabus outlines.
              </p>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 text-left">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="glass-panel border border-white/10 rounded-2xl p-6 flex flex-col justify-between glass-panel-hover"
                >
                  <div className="space-y-4">
                    {/* Icon Circle */}
                    <div className="w-10 h-10 rounded-xl bg-electric-blue/10 border border-electric-blue/20 text-cyan-accent flex items-center justify-center font-bold text-lg shadow">
                      ⚡
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cyan-accent transition-colors">
                        {course.title}
                      </h3>
                      <span className="text-[10px] font-mono text-brand-silver uppercase block tracking-wider">
                        {course.difficulty} · {course.duration}
                      </span>
                    </div>

                    <p className="text-xs text-brand-silver leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex gap-2">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      id={`learn-more-${course.id}-btn`}
                      className="flex-1 py-2 px-3 text-xs font-display font-medium rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all text-center cursor-pointer"
                    >
                      Learn More
                    </button>
                    
                    <button
                      onClick={() => handleEnrollClick(course.title)}
                      id={`enroll-shortcut-${course.id}-btn`}
                      className="px-3 py-2 text-xs font-display font-bold rounded-lg bg-electric-blue/15 text-cyan-accent border border-electric-blue/20 hover:bg-electric-blue hover:text-white transition-all cursor-pointer"
                      title="Direct Register"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Our Services Section */}
        <section id="services" className="py-16 sm:py-24 border-t border-white/5 bg-gradient-to-b from-navy-dark/20 to-brand-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            {/* Header Title */}
            <div className="max-w-xl mx-auto space-y-3">
              <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest font-bold">METHODOLOGY & SERVICES</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                How We Deliver Results
              </h2>
              <p className="text-xs sm:text-sm text-brand-silver leading-relaxed">
                From specialized group classes to tailored private session blocks, we adapt to the individual pacing and calendar of every high school student.
              </p>
            </div>

            {/* Services Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="glass-panel border border-white/10 rounded-2xl p-6 space-y-4 hover:border-cyan-accent/30 hover:bg-navy-card/40 transition-all shadow-md"
                  >
                    {/* Icon container */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${service.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-sm sm:text-base text-white">
                        {service.title}
                      </h4>
                      <p className="text-xs text-brand-silver leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 6. Pricing & Payments Calculator Section */}
        <section id="pricing" className="py-16 sm:py-24 border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header title */}
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest font-bold">SIMPLE TRANSPARENT TUITION</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Tutoring Pricing Plans
              </h2>
              <p className="text-xs sm:text-sm text-brand-silver leading-relaxed">
                Premium physics instruction at clear, accessible rates. Toggle plans or estimate cost based on your custom hours below.
              </p>
            </div>

            {/* Interactive Pricing and Clipboard Payment methods inside */}
            <PricingCalculator onSelectOption={handleEnrollClick} />

          </div>
        </section>

        {/* 7. Testimonials Section */}
        <section id="testimonials" className="py-16 sm:py-24 border-t border-white/5 bg-gradient-to-b from-brand-black to-navy-dark/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            {/* Header Title */}
            <div className="max-w-xl mx-auto space-y-3">
              <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest font-bold">STUDENT & PARENT SUCCESS</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Hear From Our Alumni
              </h2>
              <p className="text-xs sm:text-sm text-brand-silver leading-relaxed">
                Hundreds of high school students have transformed their physics performance, scoring 5s on APs and top-tier Tahsili percentages.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="glass-panel border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all relative"
                >
                  {/* Decorative glowing quote in background */}
                  <span className="absolute right-6 top-4 font-serif text-6xl text-cyan-accent/5 select-none pointer-events-none">
                    “
                  </span>

                  <div className="space-y-4">
                    {/* Stars requested */}
                    <div className="flex gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">★</span>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-brand-silver leading-relaxed italic">
                      "{test.content}"
                    </p>
                  </div>

                  {/* Student bio */}
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/5">
                    {/* Generates placeholder premium avatar based on seed initials */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-electric-blue to-cyan-accent text-white flex items-center justify-center font-bold text-xs uppercase shadow-md shadow-electric-blue/10 shrink-0">
                      {test.name.substring(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-white">
                        {test.name}
                      </h4>
                      <div className="flex gap-1.5 items-center text-[10px] text-brand-silver font-mono uppercase mt-0.5">
                        <span>{test.role}</span>
                        <span>·</span>
                        <span className="text-cyan-accent">{test.course}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 8. FAQ Section */}
        <section id="faq" className="py-16 sm:py-24 border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header title */}
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest font-bold">FREQUENTLY ASKED QUESTIONS</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Got Questions? We Have Answers.
              </h2>
              <p className="text-xs sm:text-sm text-brand-silver leading-relaxed">
                Find answers regarding online digital whiteboards, session recordings access, curricula details, and payment transfers.
              </p>
            </div>

            {/* Accordion Component */}
            <FAQAccordion />

          </div>
        </section>

        {/* 9. Enrollment Section */}
        {currentView === 'registration-success' ? (
          <RegistrationSuccess
            enrollmentData={submittedEnrollment}
            onReturnHome={handleReturnHome}
          />
        ) : (
          <section id="contact" className="py-16 sm:py-24 border-t border-white/5 relative bg-gradient-to-b from-brand-black to-navy-dark/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <EnrollmentForm
                onSuccess={handleEnrollmentSuccess}
                preselectedCourse={activeCourseEnrollName}
              />
            </div>
          </section>
        )}

      </main>

      {/* 10. Footer Section */}
      <footer id="app-footer-brand" className="border-t border-white/5 bg-brand-black py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
            {/* Logo and tag */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img 
                  src={physicsLogo.src} 
                  alt="Momentum Physics" 
                  className="h-10 w-auto object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-brand-silver max-w-xs leading-relaxed">
                Clarity. Strategy. Momentum. Bridging the gap between physical mechanics and examination mastery.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs text-brand-silver font-display font-medium">
              <button onClick={handleReturnHome} className="hover:text-white transition-colors cursor-pointer">Home</button>
              <a href="#about" onClick={() => currentView !== 'main' && setCurrentView('main')} className="hover:text-white transition-colors">About</a>
              <a href="#courses" onClick={() => currentView !== 'main' && setCurrentView('main')} className="hover:text-white transition-colors">Courses</a>
              <a href="#pricing" onClick={() => currentView !== 'main' && setCurrentView('main')} className="hover:text-white transition-colors">Pricing</a>
              <a href="#contact" onClick={() => currentView !== 'main' && setCurrentView('main')} className="hover:text-white transition-colors">Registration</a>
              <button onClick={() => setIsDomainModalOpen(true)} className="hover:text-cyan-accent transition-colors cursor-pointer flex items-center gap-1 text-cyan-accent">
                <Globe className="w-3 h-3" />
                <span>Domain Guide</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-brand-silver">
            <p className="text-center sm:text-left">
              &copy; 2026 Momentum Physics. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/966597621520"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-accent transition-colors flex items-center gap-1"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/momentum.physics"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-accent transition-colors flex items-center gap-1"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* Course Detail Modal render overlay */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnroll={(courseName) => {
          setSelectedCourse(null);
          handleEnrollClick(courseName);
        }}
      />

      {/* Domain Purchasing & Setup Guide Modal */}
      <DomainSetupModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
      />
    </div>
  );
}
