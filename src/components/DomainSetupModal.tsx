'use client';

import { Globe, X, ExternalLink } from 'lucide-react';
import Modal from '@/components/ui/Modal';

interface DomainSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DomainSetupModal({ isOpen, onClose }: DomainSetupModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      labelledBy="domain-guide-title"
      className="relative w-full max-w-2xl glass-panel border border-cyan-accent/30 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-navy-card via-navy-dark to-brand-black shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close guide"
        className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-brand-silver hover:text-white transition-all cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Modal Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-cyan-accent/10 text-cyan-accent px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border border-cyan-accent/20">
          <Globe className="w-3.5 h-3.5" />
          Domain Purchasing & Setup Guide
        </div>
        <h3 id="domain-guide-title" className="font-display font-bold text-2xl sm:text-3xl text-white">
          How to Buy a Custom Domain for Momentum Physics
        </h3>
        <p className="text-xs sm:text-sm text-brand-silver leading-relaxed">
          Connect a professional domain name like <strong className="text-white">momentumphysics.com</strong> or <strong className="text-white">momentumphysics.sa</strong> to your website in 3 easy steps.
        </p>
      </div>

      {/* STEP 1: Select Registrar */}
      <div className="p-4 rounded-2xl bg-brand-black/60 border border-white/10 space-y-3">
        <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-electric-blue/20 text-cyan-accent flex items-center justify-center text-xs font-mono font-bold">1</span>
          Choose a Recommended Domain Registrar
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <a
            href="https://www.namecheap.com"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-navy-dark border border-white/10 hover:border-cyan-accent/40 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-white block group-hover:text-cyan-accent">Namecheap</span>
              <span className="text-[10px] text-brand-silver">Popular & affordable ($10-$14/yr)</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-brand-silver group-hover:text-cyan-accent" />
          </a>

          <a
            href="https://www.cloudflare.com/products/registrar/"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-navy-dark border border-white/10 hover:border-cyan-accent/40 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-white block group-hover:text-cyan-accent">Cloudflare Registrar</span>
              <span className="text-[10px] text-brand-silver">At-cost pricing & free SSL/DDoS</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-brand-silver group-hover:text-cyan-accent" />
          </a>

          <a
            href="https://godaddy.com"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-navy-dark border border-white/10 hover:border-cyan-accent/40 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-white block group-hover:text-cyan-accent">GoDaddy</span>
              <span className="text-[10px] text-brand-silver">Global domain manager</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-brand-silver group-hover:text-cyan-accent" />
          </a>

          <a
            href="https://nic.sa"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-navy-dark border border-white/10 hover:border-cyan-accent/40 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-white block group-hover:text-cyan-accent">SaudiNIC (.sa)</span>
              <span className="text-[10px] text-brand-silver">Official Saudi national domain</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-brand-silver group-hover:text-cyan-accent" />
          </a>
        </div>
      </div>

      {/* STEP 2: Purchase Search */}
      <div className="p-4 rounded-2xl bg-brand-black/60 border border-white/10 space-y-2">
        <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-electric-blue/20 text-cyan-accent flex items-center justify-center text-xs font-mono font-bold">2</span>
          Search and Register Your Brand Name
        </h4>
        <p className="text-xs text-brand-silver leading-relaxed">
          Search for <strong className="text-cyan-accent">momentumphysics.com</strong>, <strong className="text-cyan-accent">momentumphysics.academy</strong>, or <strong className="text-cyan-accent">momentumphysics.sa</strong>. Complete registration checkout with privacy protection enabled.
        </p>
      </div>

      {/* STEP 3: Configure DNS */}
      <div className="p-4 rounded-2xl bg-brand-black/60 border border-white/10 space-y-3">
        <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-electric-blue/20 text-cyan-accent flex items-center justify-center text-xs font-mono font-bold">3</span>
          Add DNS Records in Registrar Dashboard
        </h4>
        <p className="text-xs text-brand-silver leading-relaxed">
          In your domain provider DNS settings, add a CNAME record pointing your domain or subdomain (e.g., <code className="text-cyan-accent">www</code>) to your Cloud Run / AI Studio hosting URL:
        </p>

        <div className="p-3 bg-navy-dark rounded-xl border border-white/10 space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center text-brand-silver text-[10px] uppercase">
            <span>Type</span>
            <span>Host / Name</span>
            <span>Value / Target</span>
          </div>
          <div className="flex justify-between items-center text-white py-1 border-t border-white/5">
            <span className="text-cyan-accent font-bold">CNAME</span>
            <span>www</span>
            <span className="truncate max-w-[200px] text-brand-silver">ais-dev-gcnabza6t4lrpmxgtumjew...</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl bg-cyan-accent text-brand-black font-display font-bold text-xs hover:opacity-90 transition-all cursor-pointer"
        >
          Got It!
        </button>
      </div>

    </Modal>
  );
}
