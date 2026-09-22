'use client';

import { useCallback, useState } from 'react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import CoursesSection from '@/components/sections/CoursesSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PricingSection from '@/components/sections/PricingSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqSection from '@/components/sections/FaqSection';
import EnrollmentSection from '@/components/sections/EnrollmentSection';
import RegistrationSuccess from '@/components/RegistrationSuccess';
import CourseModal from '@/components/CourseModal';
import DomainSetupModal from '@/components/DomainSetupModal';
import ParticleBackground from '@/components/ParticleBackground';
import { ContentProvider } from '@/components/ContentProvider';

import { useHashView } from '@/hooks/useHashView';
import { useSmoothAnchorScroll } from '@/hooks/useSmoothAnchorScroll';
import type { Course, EnrollmentPayload, SiteContent } from '@/types';

interface AppProps {
  content: SiteContent;
}

export default function App({ content }: AppProps) {
  const { view, showMain, showSuccess, setView } = useHashView();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [preselectedCourse, setPreselectedCourse] = useState('');
  const [submittedEnrollment, setSubmittedEnrollment] = useState<EnrollmentPayload | null>(null);
  const [isDomainGuideOpen, setIsDomainGuideOpen] = useState(false);

  // Any in-page link should bring the user back to the main landing view.
  const returnToMain = useCallback(() => setView('main'), [setView]);
  useSmoothAnchorScroll(returnToMain);

  const handleEnrollClick = useCallback(
    (courseName: string) => {
      setSelectedCourse(null);
      setPreselectedCourse(courseName);
      setView('main');
      // The contact section may only mount after the view switches, so defer the scroll a tick.
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    [setView]
  );

  const handleEnrollmentSuccess = useCallback(
    (payload: EnrollmentPayload) => {
      setSubmittedEnrollment(payload);
      showSuccess();
    },
    [showSuccess]
  );

  const openDomainGuide = useCallback(() => setIsDomainGuideOpen(true), []);
  const closeDomainGuide = useCallback(() => setIsDomainGuideOpen(false), []);
  const closeCourseModal = useCallback(() => setSelectedCourse(null), []);

  return (
    <ContentProvider content={content}>
      <div className="relative min-h-screen bg-brand-black text-white font-sans antialiased">
        <ParticleBackground />

        {/* Ambient background glows, clipped so they never extend the page */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
          <div className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(30,144,255,0.14)_0%,rgba(30,144,255,0)_65%)]" />
          <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(66,183,255,0.14)_0%,rgba(66,183,255,0)_65%)]" />
        </div>

        <Header onHomeClick={showMain} onDomainGuideClick={openDomainGuide} />

        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <CoursesSection onLearnMore={setSelectedCourse} onEnroll={handleEnrollClick} />
          <ServicesSection />
          <PricingSection onEnroll={handleEnrollClick} />
          <TestimonialsSection />
          <FaqSection />

          {view === 'registration-success' ? (
            <RegistrationSuccess enrollmentData={submittedEnrollment} onReturnHome={showMain} />
          ) : (
            <EnrollmentSection preselectedCourse={preselectedCourse} onSuccess={handleEnrollmentSuccess} />
          )}
        </main>

        <Footer onHomeClick={showMain} onDomainGuideClick={openDomainGuide} />

        <CourseModal course={selectedCourse} onClose={closeCourseModal} onEnroll={handleEnrollClick} />
        <DomainSetupModal isOpen={isDomainGuideOpen} onClose={closeDomainGuide} />
      </div>
    </ContentProvider>
  );
}
