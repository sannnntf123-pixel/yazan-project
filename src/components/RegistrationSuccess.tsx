'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Building2,
  Calendar,
  BookOpen,
  Video,
  FileCheck,
  Mail,
  ArrowLeft,
  Clock,
  Sparkles
} from 'lucide-react';
import type { EnrollmentPayload } from '@/types';
import { BANK_DETAILS } from '@/config/bankDetails';
import { ENROLLMENT_STORAGE_KEY } from '@/config/site';
import { openWhatsApp } from '@/lib/whatsapp';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface RegistrationSuccessProps {
  enrollmentData: EnrollmentPayload | null;
  onReturnHome: () => void;
}

const FALLBACK_ENROLLMENT: EnrollmentPayload = {
  studentName: 'Valued Student',
  studentEmail: 'student@example.com',
  studentPhone: '+966 59 762 1520',
  country: 'Saudi Arabia',
  course: 'AP Physics 1',
  studyMode: 'Group',
  preferredBatch: 'Fall 2026 Regular Cohort',
  paymentMethod: 'IBAN Bank Transfer',
  status: 'Pending Payment',
  timestamp: new Date().toISOString(),
};

function readStoredEnrollment(): EnrollmentPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(ENROLLMENT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EnrollmentPayload) : null;
  } catch {
    return null;
  }
}

export default function RegistrationSuccess({ enrollmentData, onReturnHome }: RegistrationSuccessProps) {
  const { copiedKey, copy } = useCopyToClipboard<'iban'>();
  const copiedIban = copiedKey === 'iban';
  // 6-digit reference generated once per mount
  const [refCode] = useState(() => Date.now().toString().slice(-6));

  // Fall back to the last submission saved in sessionStorage (e.g. after a reload).
  // Read once in a state initializer so render stays pure and SSR-safe.
  const [data] = useState<EnrollmentPayload>(() => enrollmentData ?? readStoredEnrollment() ?? FALLBACK_ENROLLMENT);

  const handleCopyIban = () => copy(BANK_DETAILS.iban, 'iban');

  const getWhatsAppTransferText = () => {
    return (
      `Hello Momentum Physics Academy!\n\n` +
      `I have submitted my enrollment registration and completed my payment transfer.\n\n` +
      `• Student Name: ${data.studentName || 'Student'}\n` +
      `• Course: ${data.course || 'Physics'}\n` +
      `• Study Mode: ${data.studyMode || 'Group'}\n` +
      `• Payment Method: ${data.paymentMethod || 'IBAN Bank Transfer'}\n` +
      `• Bank Account: Al Rajhi Bank\n\n` +
      `Attached is my transfer receipt screenshot for verification. Please activate my Microsoft Teams portal!`
    );
  };

  const handleWhatsAppTransferNotification = () => openWhatsApp(getWhatsAppTransferText());

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20 space-y-8 animate-fade-in">
      
      {/* Top Banner & Status Badge */}
      <div className="text-center space-y-4">
        
        {/* Animated Success Badge Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cyan-accent/10 border-2 border-cyan-accent/30 text-cyan-accent shadow-2xl shadow-cyan-accent/20 mx-auto relative group">
          <div className="absolute inset-0 rounded-full bg-cyan-accent/20 animate-ping opacity-25" />
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 relative z-10 text-cyan-accent" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Registration Recorded
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Registration Submitted Successfully
          </h1>

          <p className="text-sm sm:text-base text-brand-silver max-w-2xl mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{data.studentName}</strong>! Your application for <strong className="text-cyan-accent">{data.course}</strong> has been sent to our admissions team on WhatsApp.
          </p>
        </div>

        {/* Verification Warning Notice */}
        <div className="max-w-2xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-left">
          <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200 leading-relaxed">
            <strong className="font-bold text-amber-300 block mb-0.5">Important Enrollment Notice:</strong>
            Enrollment is <strong className="underline">NOT complete</strong> until tuition payment is verified by our finance team. Your initial status is currently set to <strong className="text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded font-mono">Pending Payment</strong>.
          </div>
        </div>

      </div>

      {/* Main Grid: Payment Instructions & Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: Payment Instructions Box */}
        <div className="md:col-span-7 glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-navy-card via-navy-dark to-brand-black shadow-2xl flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-accent font-semibold flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                Payment Instructions
              </span>
              <span className="text-[10px] font-mono bg-white/10 px-2.5 py-0.5 rounded-full text-white font-bold">
                {data.paymentMethod}
              </span>
            </div>

            {/* PAYMENT METHOD TYPE CONDITIONAL CONTENT */}
            {data.paymentMethod === 'Cash' ? (
              <div className="p-4 bg-brand-black/60 rounded-2xl border border-white/10 space-y-2">
                <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                  💵 Cash Payment Selected
                </h4>
                <p className="text-xs text-brand-silver leading-relaxed">
                  Our admissions office team will contact you shortly via phone or WhatsApp to arrange in-person payment or cash pickup.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-brand-silver leading-relaxed">
                  Please transfer the course fee to the following official bank account:
                </p>

                {/* Bank Account Details Card */}
                <div className="p-4 rounded-2xl bg-brand-black/80 border border-cyan-accent/20 space-y-3 relative group">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-brand-silver font-mono text-[10px] uppercase tracking-wider">Beneficiary Bank</span>
                    <span className="text-white font-bold">{BANK_DETAILS.bankName}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-brand-silver font-mono text-[10px] uppercase tracking-wider">Account Name</span>
                    <span className="text-white font-semibold">{BANK_DETAILS.accountName}</span>
                  </div>

                  {/* IBAN Box with 1-Click Copy */}
                  <div className="p-3 bg-navy-dark rounded-xl border border-white/10 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] font-mono text-brand-silver block uppercase tracking-wider">Official IBAN Number</span>
                      <span className="font-mono text-cyan-accent font-bold text-xs sm:text-sm select-all tracking-wider">
                        {BANK_DETAILS.iban}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyIban}
                      className={`p-2 rounded-lg transition-all flex items-center gap-1 text-xs cursor-pointer ${
                        copiedIban
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      title="Copy IBAN"
                    >
                      {copiedIban ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-brand-silver pt-1">
                    <span>SWIFT / BIC Code: <strong className="text-white font-mono">{BANK_DETAILS.swiftCode}</strong></span>
                    <span>Currency: <strong className="text-white font-mono">{BANK_DETAILS.currency}</strong></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Button: I've Sent the Transfer */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleWhatsAppTransferNotification}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-display font-bold text-sm tracking-wide shadow-xl shadow-green-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>I've Sent the Transfer (Share Receipt on WhatsApp)</span>
            </button>
            <p className="text-[10px] text-center text-brand-silver">
              Opens WhatsApp with prefilled confirmation text for fast verification.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Submitted Application Summary */}
        <div className="md:col-span-5 glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-navy-dark/90 to-brand-black shadow-2xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-white flex items-center justify-between border-b border-white/10 pb-3">
              <span>Application Summary</span>
              <span className="text-[10px] font-mono text-cyan-accent">REF: #{refCode}</span>
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-brand-silver">Student Name</span>
                <span className="text-white font-medium">{data.studentName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-brand-silver">Email</span>
                <span className="text-white font-medium truncate max-w-[160px]">{data.studentEmail}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-brand-silver">Phone</span>
                <span className="text-white font-mono">{data.studentPhone}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-brand-silver">Target Course</span>
                <span className="text-cyan-accent font-bold">{data.course}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-brand-silver">Study Mode</span>
                <span className="text-white font-medium">{data.studyMode} Mode</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-brand-silver">Preferred Batch</span>
                <span className="text-white font-medium text-right max-w-[160px]">{data.preferredBatch}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-brand-silver">Payment Method</span>
                <span className="text-white font-medium">{data.paymentMethod}</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-brand-silver">Status</span>
                <span className="text-amber-400 font-mono font-bold bg-amber-400/10 px-2 py-0.5 rounded text-[10px]">
                  {data.status || 'Pending Payment'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onReturnHome}
              className="w-full py-3 px-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Academy Homepage</span>
            </button>
          </div>
        </div>

      </div>

      {/* PART 6 & 5: Post-Payment Microsoft Teams & Onboarding Roadmap */}
      <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-navy-card/80 to-navy-dark shadow-2xl space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest font-bold">AUTOMATED STUDENT ONBOARDING</span>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            What You Receive After Payment Confirmation
          </h3>
          <p className="text-xs sm:text-sm text-brand-silver leading-relaxed">
            Once our finance admin confirms your payment and changes your status from <strong className="text-amber-300">Pending Payment</strong> to <strong className="text-emerald-400">Paid</strong>, we email you the following access kit:
          </p>
        </div>

        {/* 4 Deliverables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          <div className="p-4 rounded-2xl bg-brand-black/50 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-electric-blue/20 text-cyan-accent flex items-center justify-center font-bold">
              <Video className="w-4 h-4" />
            </div>
            <h5 className="font-display font-bold text-xs text-white">1. Microsoft Teams Invitation</h5>
            <p className="text-[11px] text-brand-silver leading-relaxed">
              Direct access link to our live digital classroom equipped with interactive whiteboards and write-out cameras.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-brand-black/50 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <h5 className="font-display font-bold text-xs text-white">2. Course Schedule & Calendar</h5>
            <p className="text-[11px] text-brand-silver leading-relaxed">
              Complete live lesson timetable, office hour slots, and exam review milestone dates.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-brand-black/50 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <h5 className="font-display font-bold text-xs text-white">3. Student Handbook & Sheets</h5>
            <p className="text-[11px] text-brand-silver leading-relaxed">
              High-resolution formula quick-sheets, vector mechanics guides, and practice problem workbooks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-brand-black/50 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <FileCheck className="w-4 h-4" />
            </div>
            <h5 className="font-display font-bold text-xs text-white">4. Recordings & Portal Access</h5>
            <p className="text-[11px] text-brand-silver leading-relaxed">
              24/7 on-demand access to past class recordings and homework submission portal.
            </p>
          </div>

        </div>

        {/* Visual Workflow Diagram */}
        <div className="p-4 rounded-2xl bg-brand-black/80 border border-white/5 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block font-bold">
            Email Automation Architecture:
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-silver">
            <div className="flex items-center gap-2 bg-navy-dark px-3 py-1.5 rounded-lg border border-white/10 w-full sm:w-auto">
              <FileCheck className="w-3.5 h-3.5 text-cyan-accent" />
              <span>Student Submits Form</span>
            </div>
            <span className="text-cyan-accent font-mono text-sm hidden sm:inline">➔</span>
            <div className="flex items-center gap-2 bg-navy-dark px-3 py-1.5 rounded-lg border border-white/10 w-full sm:w-auto">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Admissions (Pending)</span>
            </div>
            <span className="text-cyan-accent font-mono text-sm hidden sm:inline">➔</span>
            <div className="flex items-center gap-2 bg-navy-dark px-3 py-1.5 rounded-lg border border-white/10 w-full sm:w-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Sets "Paid"</span>
            </div>
            <span className="text-cyan-accent font-mono text-sm hidden sm:inline">➔</span>
            <div className="flex items-center gap-2 bg-navy-dark px-3 py-1.5 rounded-lg border border-white/10 w-full sm:w-auto">
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              <span>Welcome Email Sent</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
