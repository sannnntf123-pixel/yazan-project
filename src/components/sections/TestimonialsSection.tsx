'use client';

import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { useContent } from '@/components/ContentProvider';

export default function TestimonialsSection() {
  const { testimonials } = useContent();
  return (
    <section id="testimonials" className="py-16 sm:py-24 border-t border-white/5 bg-gradient-to-b from-brand-black to-navy-dark/30">
      <Container className="text-center space-y-12">
        
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} description={testimonials.description} />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.items.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-panel border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all relative"
            >
              {/* Decorative glowing quote in background */}
              <span className="absolute right-6 top-4 font-serif text-6xl text-cyan-accent/5 select-none pointer-events-none">
                “
              </span>

              <div className="space-y-4">
                {/* Stars requested */}
                <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i} className="text-yellow-400 text-sm" aria-hidden="true">★</span>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-brand-silver leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Student bio */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/5">
                {/* Generates placeholder premium avatar based on seed initials */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-electric-blue to-cyan-accent text-white flex items-center justify-center font-bold text-xs uppercase shadow-md shadow-electric-blue/10 shrink-0">
                  {testimonial.name.slice(0, 2)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-white">
                    {testimonial.name}
                  </h4>
                  <div className="flex gap-1.5 items-center text-[10px] text-brand-silver font-mono uppercase mt-0.5">
                    <span>{testimonial.role}</span>
                    <span>·</span>
                    <span className="text-cyan-accent">{testimonial.course}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
