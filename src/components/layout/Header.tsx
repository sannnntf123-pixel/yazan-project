'use client';

import Image from 'next/image';
import { Globe } from 'lucide-react';
import Container from '@/components/ui/Container';
import { NAV_LINKS } from '@/data/navigation';
import { SITE_SHORT_NAME } from '@/config/site';
import physicsLogo from '@/assets/images/physics_logo_1784026386356.jpg';

interface HeaderProps {
  onHomeClick: () => void;
  onDomainGuideClick: () => void;
}

export default function Header({ onHomeClick, onDomainGuideClick }: HeaderProps) {
  return (
    <header id="app-header" className="sticky top-0 z-40 w-full bg-brand-black/75 backdrop-blur-md border-b border-white/5">
      <Container className="h-18 sm:h-20 flex items-center justify-between">
        <button onClick={onHomeClick} id="brand-logo-nav" className="flex items-center gap-2 group cursor-pointer text-left" aria-label="Back to top">
          <Image
            src={physicsLogo}
            alt={SITE_SHORT_NAME}
            width={48}
            height={48}
            sizes="48px"
            priority
            className="h-10 sm:h-12 w-auto object-contain rounded-lg transition-transform group-hover:scale-105 duration-300"
          />
        </button>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-display font-medium tracking-wide text-brand-silver">
          <button onClick={onHomeClick} className="hover:text-white transition-colors cursor-pointer">
            Home
          </button>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onDomainGuideClick}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-cyan-accent border border-cyan-accent/20 bg-cyan-accent/5 hover:bg-cyan-accent/15 transition-all cursor-pointer"
            title="How to buy a domain for this website"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Domain Guide</span>
          </button>

          <a
            href="#contact"
            id="nav-enroll-btn"
            className="px-4 py-2.5 rounded-lg text-xs font-display font-semibold border border-electric-blue/30 bg-electric-blue/10 text-white hover:bg-electric-blue hover:shadow-lg hover:shadow-electric-blue/20 transition-all cursor-pointer block text-center"
          >
            Enroll Now
          </a>
        </div>
      </Container>
    </header>
  );
}
