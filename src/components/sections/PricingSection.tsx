import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import PricingCalculator from '@/components/PricingCalculator';

interface PricingSectionProps {
  onEnroll: (optionName: string) => void;
}

export default function PricingSection({ onEnroll }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-16 sm:py-24 border-t border-white/5 relative">
      <Container className="space-y-12">
        
        <SectionHeading
          eyebrow="Simple Transparent Tuition"
          title="Tutoring Pricing Plans"
          description="Premium physics instruction at clear, accessible rates. Toggle plans or estimate cost based on your custom hours below."
        />

        {/* Interactive Pricing and Clipboard Payment methods inside */}
        <PricingCalculator onSelectOption={onEnroll} />

      </Container>
    </section>
  );
}
