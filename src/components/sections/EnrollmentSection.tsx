import Container from '@/components/ui/Container';
import EnrollmentForm from '@/components/EnrollmentForm';
import type { EnrollmentPayload } from '@/types';

interface EnrollmentSectionProps {
  preselectedCourse: string;
  onSuccess: (payload: EnrollmentPayload) => void;
}

export default function EnrollmentSection({ preselectedCourse, onSuccess }: EnrollmentSectionProps) {
  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-white/5 relative bg-gradient-to-b from-brand-black to-navy-dark/30">
      <Container>
        <EnrollmentForm onSuccess={onSuccess} preselectedCourse={preselectedCourse} />
      </Container>
    </section>
  );
}
