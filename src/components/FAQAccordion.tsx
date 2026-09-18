'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/faq';

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => setOpenId((current) => (current === id ? null : id));

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`glass-panel border rounded-2xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-cyan-accent/40 bg-navy-card/80 shadow-lg shadow-electric-blue/5'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span className="font-display font-medium text-sm sm:text-base text-white flex items-center gap-3 pr-4 group-hover:text-cyan-accent transition-colors">
                <HelpCircle className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform ${isOpen ? 'text-cyan-accent' : 'text-brand-silver'}`} />
                {item.question}
              </span>
              <span className={`p-1 rounded-lg bg-white/5 text-brand-silver group-hover:text-white transition-all ${isOpen ? 'rotate-180 bg-cyan-accent/10 text-cyan-accent' : ''}`}>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </button>

            {/* Collapsible Answer wrapper */}
            <div
              id={`faq-answer-${item.id}`}
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[300px] border-t border-white/5' : 'max-h-0'
              }`}
            >
              <p className="p-5 text-xs sm:text-sm text-brand-silver leading-relaxed bg-brand-black/20">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
