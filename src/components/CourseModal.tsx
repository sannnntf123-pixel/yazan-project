'use client';

import { useState } from 'react';
import { X, Check, Award, Clock, BookOpen, Layers, ArrowRight } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import type { Course } from '@/types';

type CourseTab = 'syllabus' | 'format' | 'features';

const COURSE_TABS: { id: CourseTab; label: string }[] = [
  { id: 'syllabus', label: 'Syllabus & Topics' },
  { id: 'format', label: 'Course Structure & Duration' },
  { id: 'features', label: "What's Included" },
];

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (courseName: string) => void;
}

export default function CourseModal({ course, onClose, onEnroll }: CourseModalProps) {
  const [activeTab, setActiveTab] = useState<CourseTab>('syllabus');

  if (!course) return null;

  return (
    <Modal
      open
      onClose={onClose}
      labelledBy="course-modal-title"
      className="relative w-full max-w-2xl glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
    >
        {/* Header Ambient Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-electric-blue via-cyan-accent to-electric-blue" />
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-1 bg-electric-blue/10 text-cyan-accent px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase mb-2 border border-electric-blue/20">
              <Award className="w-3.5 h-3.5" />
              {course.difficulty}
            </div>
            <h3 id="course-modal-title" className="font-display font-bold text-2xl text-white flex items-center gap-2">
              {course.title}
            </h3>
            <p className="text-sm text-brand-silver mt-1">{course.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 text-brand-silver hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div role="tablist" className="flex border-b border-white/5 bg-navy-dark/30 px-6">
          {COURSE_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-xs font-display font-medium tracking-wide border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-cyan-accent text-cyan-accent font-bold'
                  : 'border-transparent text-brand-silver hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <p className="text-sm text-brand-silver leading-relaxed">
            {course.description}
          </p>

          {activeTab === 'syllabus' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-accent uppercase tracking-wider font-semibold">
                <BookOpen className="w-4 h-4" /> Core Physics Pillars Covered:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.curriculum.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-start gap-2.5 hover:bg-white/10 transition-all"
                  >
                    <span className="font-mono text-xs text-electric-blue bg-electric-blue/15 w-5 h-5 rounded-md flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-white leading-relaxed">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'format' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-accent uppercase tracking-wider font-semibold">
                <Clock className="w-4 h-4" /> Curriculum Structure Details:
              </div>
              <div className="p-4 bg-navy-dark/40 border border-white/5 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                  <span className="text-brand-silver">Target Examinations:</span>
                  <span className="text-white font-semibold">{course.title} standard boards</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                  <span className="text-brand-silver">Format:</span>
                  <span className="text-white font-semibold">Interactive Online Classroom</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                  <span className="text-brand-silver">Ideal For:</span>
                  <span className="text-white font-semibold">Grades 10, 11, 12, and Pre-College</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-silver">Average Prep Time:</span>
                  <span className="text-white font-semibold text-cyan-accent">{course.duration}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-accent uppercase tracking-wider font-semibold">
                  <Layers className="w-4 h-4" /> Typical Curriculum Milestones:
                </div>
                <ul className="text-xs text-brand-silver space-y-2 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-accent font-bold">✓</span>
                    <span><strong>Phase 1: Conceptual Building</strong> — Intuitive, math-stripped visualizations first, followed by mathematical modeling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-accent font-bold">✓</span>
                    <span><strong>Phase 2: Mathematical Rigor</strong> — Developing formula derivations, vector systems, and free-body diagrams.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-accent font-bold">✓</span>
                    <span><strong>Phase 3: Strategic Practice</strong> — Timing drills, identifying conceptual traps, and solving high-weightage questions.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-accent uppercase tracking-wider font-semibold mb-2">
                <Check className="w-4 h-4 text-green-400" /> Key Features of the {course.title} Program:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-brand-silver">
                    <span className="w-5 h-5 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center shrink-0 text-[10px]">
                      ✔
                    </span>
                    <span className="leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-white/5 bg-navy-dark/20 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-left">
            <span className="text-xs text-brand-silver block">Looking to enroll or have queries?</span>
            <span className="text-xs text-white font-mono">Curriculum: {course.title} Specialized Track</span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => onEnroll(course.title)}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-display font-semibold rounded-lg bg-gradient-to-r from-electric-blue to-cyan-accent text-white hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-electric-blue/20"
            >
              Enroll Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
    </Modal>
  );
}
