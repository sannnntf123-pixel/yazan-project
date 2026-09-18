import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { SERVICES } from '@/data/services';

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24 border-t border-white/5 bg-gradient-to-b from-navy-dark/20 to-brand-black">
      <Container className="text-center space-y-12">
        
        <SectionHeading
          eyebrow="Methodology & Services"
          title="How We Deliver Results"
          description="From specialized group classes to tailored private session blocks, we adapt to the individual pacing and calendar of every high school student."
        />

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {SERVICES.map(({ id, title, description, icon: Icon, accentClassName }) => (
            <div
              key={id}
              className="glass-panel border border-white/10 rounded-2xl p-6 space-y-4 hover:border-cyan-accent/30 hover:bg-navy-card/40 transition-all shadow-md"
            >
              {/* Icon container */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${accentClassName}`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm sm:text-base text-white">
                  {title}
                </h4>
                <p className="text-xs text-brand-silver leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
