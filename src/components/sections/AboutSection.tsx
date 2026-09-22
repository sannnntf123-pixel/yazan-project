'use client';

import Container from '@/components/ui/Container';
import PhysicsSandbox from '@/components/PhysicsSandbox';
import { useContent } from '@/components/ContentProvider';

export default function AboutSection() {
  const { about } = useContent();
  return (
    <section id="about" className="py-16 sm:py-24 border-t border-white/5 relative bg-gradient-to-b from-brand-black to-navy-dark/40">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest font-bold">{about.eyebrow}</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">{about.title}</h2>
            </div>

            <div className="space-y-4 text-brand-silver text-sm sm:text-base leading-relaxed">
              <p className="text-white font-semibold font-display">{about.lead}</p>
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Features list under About Us */}
            <ul className="space-y-3 pt-4 border-t border-white/5">
              {about.highlights.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-xs sm:text-sm text-brand-silver">
                  <span className="w-5 h-5 rounded bg-electric-blue/15 text-cyan-accent flex items-center justify-center shrink-0 font-bold" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <strong>{item.title}</strong> — {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content Column: Live Interactive Sandbox Lab */}
          <div className="lg:col-span-6">
            <PhysicsSandbox />
          </div>

        </div>
      </Container>
    </section>
  );
}
