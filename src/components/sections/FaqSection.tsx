import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQAccordion from '@/components/FAQAccordion';

export default function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-white/5 relative">
      <Container className="space-y-12">
        
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Got Questions? We Have Answers."
          description="Find answers regarding online digital whiteboards, session recordings access, curricula details, and payment transfers."
        />

        {/* Accordion Component */}
        <FAQAccordion />

      </Container>
    </section>
  );
}
