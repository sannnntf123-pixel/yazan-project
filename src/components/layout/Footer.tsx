'use client';

import Image from 'next/image';
import { ArrowUpRight, Globe } from 'lucide-react';
import Container from '@/components/ui/Container';
import { NAV_LINKS } from '@/data/navigation';
import { COPYRIGHT_YEAR, INSTAGRAM_URL, SITE_SHORT_NAME } from '@/config/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import physicsLogo from '@/assets/images/physics_logo_1784026386356.jpg';

interface FooterProps {
  onHomeClick: () => void;
  onDomainGuideClick: () => void;
}

const SOCIAL_LINKS = [
  { label: 'WhatsApp', href: buildWhatsAppUrl() },
  { label: 'Instagram', href: INSTAGRAM_URL },
];

export default function Footer({ onHomeClick, onDomainGuideClick }: FooterProps) {
  return (
    <footer id="app-footer-brand" className="border-t border-white/5 bg-brand-black py-12 relative z-10">
      <Container className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <Image
              src={physicsLogo}
              alt={SITE_SHORT_NAME}
              width={40}
              height={40}
              sizes="40px"
              loading="lazy"
              className="h-10 w-auto object-contain rounded-lg"
            />
            <p className="text-xs text-brand-silver max-w-xs leading-relaxed">
              Clarity. Strategy. Momentum. Bridging the gap between physical mechanics and examination mastery.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs text-brand-silver font-display font-medium">
            <button onClick={onHomeClick} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
            <button onClick={onDomainGuideClick} className="hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1 text-cyan-accent">
              <Globe className="w-3 h-3" />
              <span>Domain Guide</span>
            </button>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-brand-silver">
          <p className="text-center sm:text-left">
            &copy; {COPYRIGHT_YEAR} {SITE_SHORT_NAME}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-accent transition-colors flex items-center gap-1"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
