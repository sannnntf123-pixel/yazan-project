'use client';

import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import PricingCalculator from '@/components/PricingCalculator';
import { useContent } from '@/components/ContentProvider';

interface PricingSectionProps {
  onEnroll: (optionName: string) => void;
}

export default function PricingSection({ onEnroll }: PricingSectionProps) {
  const { pricing } = useContent();
  return (
    <section id="pricing" className="py-16 sm:py-24 border-t border-white/5 relative">
      <Container className="space-y-12">
        
        <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} description={pricing.description} />

        {/* Interactive Pricing and Clipboard Payment methods inside */}
        <PricingCalculator onSelectOption={onEnroll} />

      </Container>
    </section>
  );
}
