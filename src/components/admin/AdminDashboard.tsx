'use client';

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { Check, ExternalLink, Loader2, LogOut, RotateCcw, Save } from 'lucide-react';
import { loadContent, logout, resetContent, saveContent } from '@/app/admin/actions';
import type { SiteContent } from '@/types';
import {
  AboutEditor,
  BankEditor,
  CoursesEditor,
  FaqEditor,
  FooterEditor,
  HeroEditor,
  PricingEditor,
  ServicesEditor,
  SiteEditor,
  TestimonialsEditor,
} from './editors';

type SectionKey = keyof SiteContent;

const SECTIONS: { key: SectionKey; label: string; description: string }[] = [
  { key: 'site', label: 'Site & Contact', description: 'Name, WhatsApp number, social links' },
  { key: 'hero', label: 'Hero', description: 'Headline, buttons, metrics' },
  { key: 'about', label: 'About', description: 'Why Momentum Physics' },
  { key: 'courses', label: 'Courses', description: 'Course cards and syllabus details' },
  { key: 'services', label: 'Services', description: 'How we deliver results' },
  { key: 'pricing', label: 'Pricing', description: 'Tuition plans and rates' },
  { key: 'testimonials', label: 'Testimonials', description: 'Student reviews' },
  { key: 'faq', label: 'FAQ', description: 'Questions and answers' },
  { key: 'bank', label: 'Payment Details', description: 'Bank account shown after registration' },
  { key: 'footer', label: 'Footer', description: 'Tagline' },
];

interface AdminDashboardProps {
  initialContent: SiteContent;
  storeName: string;
}

export default function AdminDashboard({ initialContent, storeName }: AdminDashboardProps) {
  const [saved, setSaved] = useState(initialContent);
  const [draft, setDraft] = useState(initialContent);
  const [active, setActive] = useState<SectionKey>('site');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const isDirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!isDirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [isDirty]);

  // Auto-hide success toasts.
  useEffect(() => {
    if (status?.type !== 'success') return;
    const id = setTimeout(() => setStatus(null), 3000);
    return () => clearTimeout(id);
  }, [status]);

  const patchSection = useCallback(<K extends SectionKey>(key: K, patch: Partial<SiteContent[K]>) => {
    setDraft((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }, []);

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveContent(draft);
      if (result.ok) {
        setSaved(draft);
        setStatus({ type: 'success', text: 'Changes published to the live site.' });
      } else {
        setStatus({ type: 'error', text: result.error });
      }
    });
  };

  const handleReset = () => {
    if (!window.confirm('Reset ALL content to the original defaults? This cannot be undone.')) return;
    startTransition(async () => {
      const result = await resetContent();
      if (!result.ok) {
        setStatus({ type: 'error', text: result.error });
        return;
      }
      const fresh = await loadContent();
      setSaved(fresh);
      setDraft(fresh);
      setStatus({ type: 'success', text: 'Content reset to defaults.' });
    });
  };

  const handleDiscard = () => setDraft(saved);

  const editor = (() => {
    switch (active) {
      case 'site':
        return <SiteEditor value={draft.site} onChange={(p) => patchSection('site', p)} />;
      case 'hero':
        return <HeroEditor value={draft.hero} onChange={(p) => patchSection('hero', p)} />;
      case 'about':
        return <AboutEditor value={draft.about} onChange={(p) => patchSection('about', p)} />;
      case 'courses':
        return <CoursesEditor value={draft.courses} onChange={(p) => patchSection('courses', p)} />;
      case 'services':
        return <ServicesEditor value={draft.services} onChange={(p) => patchSection('services', p)} />;
      case 'pricing':
        return <PricingEditor value={draft.pricing} onChange={(p) => patchSection('pricing', p)} />;
      case 'testimonials':
        return <TestimonialsEditor value={draft.testimonials} onChange={(p) => patchSection('testimonials', p)} />;
      case 'faq':
        return <FaqEditor value={draft.faq} onChange={(p) => patchSection('faq', p)} />;
      case 'bank':
        return <BankEditor value={draft.bank} onChange={(p) => patchSection('bank', p)} />;
      case 'footer':
        return <FooterEditor value={draft.footer} onChange={(p) => patchSection('footer', p)} />;
    }
  })();

  const activeSection = SECTIONS.find((s) => s.key === active)!;

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-brand-black/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-display font-bold text-base sm:text-lg truncate">Website Content</h1>
            <p className="text-[11px] text-brand-silver hidden sm:block">
              {isDirty ? <span className="text-amber-300">Unsaved changes</span> : 'All changes published'}
              <span className="text-brand-silver/50"> · storage: {storeName}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-brand-silver hover:text-white hover:bg-white/5"
            >
              View site <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {isDirty && (
              <button
                type="button"
                onClick={handleDiscard}
                disabled={isPending}
                className="px-3 py-2 rounded-lg text-xs text-brand-silver hover:text-white hover:bg-white/5 cursor-pointer"
              >
                Discard
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || isPending}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-display font-bold bg-gradient-to-r from-electric-blue to-cyan-accent text-brand-black disabled:opacity-40 disabled:cursor-default cursor-pointer"
            >
              {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save & publish
            </button>
            <form action={logout}>
              <button
                type="submit"
                className="p-2 rounded-lg text-brand-silver hover:text-white hover:bg-white/5 cursor-pointer"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Status toast */}
      {status && (
        <div
          role="status"
          className={`fixed bottom-4 right-4 z-40 max-w-sm rounded-xl border px-4 py-3 text-xs shadow-2xl flex items-start gap-2 ${
            status.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
              : 'bg-red-500/15 border-red-500/40 text-red-200'
          }`}
        >
          {status.type === 'success' && <Check className="w-4 h-4 shrink-0" />}
          <span>{status.text}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Section nav */}
        <nav aria-label="Content sections" className="lg:sticky lg:top-20 self-start">
          <ul className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {SECTIONS.map((section) => (
              <li key={section.key} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(section.key)}
                  aria-current={active === section.key ? 'page' : undefined}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                    active === section.key ? 'bg-cyan-accent/10 text-cyan-accent' : 'text-brand-silver hover:text-white hover:bg-white/5'
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleReset}
            disabled={isPending}
            className="mt-6 hidden lg:inline-flex items-center gap-1.5 text-[11px] text-brand-silver/70 hover:text-red-300 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset all to defaults
          </button>
        </nav>

        {/* Editor */}
        <section className="glass-panel rounded-2xl p-5 sm:p-7 space-y-6 min-w-0">
          <div>
            <h2 className="font-display font-bold text-xl">{activeSection.label}</h2>
            <p className="text-xs text-brand-silver">{activeSection.description}</p>
          </div>
          {editor}
        </section>
      </div>
    </div>
  );
}
