'use client';

import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQAccordion from '@/components/FAQAccordion';
import { useContent } from '@/components/ContentProvider';

export default function FaqSection() {
  const { faq } = useContent();
  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-white/5 relative">
      <Container className="space-y-12">
        
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} description={faq.description} />

        {/* Accordion Component */}
        <FAQAccordion />

      </Container>
    </section>
  );
}
