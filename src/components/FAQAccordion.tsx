'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 'curricula',
      question: 'Which curricula do you teach?',
      answer: 'We specialize in major high school physical sciences curricula, specifically AP Physics (including AP Physics 1, AP Physics 2, and both AP Physics C Mechanics and Electricity & Magnetism) and the Saudi National Tahsili Physics curriculum (Tahsili Physics).'
    },
    {
      id: 'online',
      question: 'Are lessons online?',
      answer: 'Yes! All classes are conducted fully online via our state-of-the-art interactive digital classroom. We utilize dual-camera write-outs, dynamic physics simulations, and advanced digital whiteboards where students can write, draw free-body diagrams, and solve vectors in real-time alongside the instructor.'
    },
    {
      id: 'recordings',
      question: 'Are recordings available?',
      answer: 'Absolutely. Every live session is automatically recorded and processed in high-definition. Access to these recordings is provided in the student portal within 2 hours of the live session. These recordings remain fully available for revision, 24/7, right up until the final examination day.'
    },
    {
      id: 'payments',
      question: 'How do payments work?',
      answer: 'Payments are secure and flexible. We support Bank Transfers (using a structured IBAN placeholder provided on our invoice) and instant STC Pay mobile wallet transfers. Students can choose to book group courses or purchase blocks of One-on-One sessions. Once a transfer is made, simply share a screenshot of the receipt on our official WhatsApp, and registration is instantly finalized.'
    },
    {
      id: 'enroll',
      question: 'How do I enroll?',
      answer: 'Enrolling is simple: 1. Select either a Group Course or One-on-One sessions on our Pricing calculator. 2. Click the Enroll/Book button which automatically sets up a professional chat on WhatsApp. 3. Send the message! We will immediately share the current session calendars, assign your tutor, and mail your student portal join credentials.'
    }
  ];

  const toggleItem = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqItems.map((item) => {
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
