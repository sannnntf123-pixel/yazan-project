'use client';

import { Atom, Award, BookOpen, GraduationCap, TrendingUp, User, Users, Zap, type LucideIcon } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { useContent } from '@/components/ContentProvider';
import type { ServiceIconName } from '@/types';

const SERVICE_ICON_MAP: Record<ServiceIconName, LucideIcon> = { User, Users, Award, BookOpen, GraduationCap, Zap, Atom, TrendingUp };

export default function ServicesSection() {
  const { services } = useContent();
  return (
    <section id="services" className="py-16 sm:py-24 border-t border-white/5 bg-gradient-to-b from-navy-dark/20 to-brand-black">
      <Container className="text-center space-y-12">
        
        <SectionHeading eyebrow={services.eyebrow} title={services.title} description={services.description} />

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {services.items.map(({ id, title, description, icon, accentClassName }) => {
            const Icon = SERVICE_ICON_MAP[icon] ?? User;
            return (
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
            );
          })}
        </div>

      </Container>
    </section>
  );
}
