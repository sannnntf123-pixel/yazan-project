'use client';

import React from 'react';
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  Globe,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';
import { useEnrollmentForm } from '../hooks/useEnrollmentForm';
import { ACADEMY_WHATSAPP, AVAILABLE_COURSES, COUNTRIES_LIST, PAYMENT_METHODS, PREFERRED_BATCHES, STUDY_MODES } from '../config/bankDetails';
import { EnrollmentPayload, PaymentMethod } from '../types/enrollment';

interface EnrollmentFormProps {
  onSuccess: (data: EnrollmentPayload) => void;
  preselectedCourse?: string;
}

export default function EnrollmentForm({ onSuccess, preselectedCourse }: EnrollmentFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    submissionProgress,
    statusMessage,
    handleChange,
    handleStudyModeChange,
    handlePaymentMethodChange,
    handleSubmit,
    setFormData
  } = useEnrollmentForm(onSuccess);

  // If preselected course passed from Course Cards
  React.useEffect(() => {
    if (preselectedCourse) {
      setFormData((prev) => ({ ...prev, course: preselectedCourse }));
    }
  }, [preselectedCourse, setFormData]);

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Momentum Physics! I am interested in enrolling in the ${formData.course || 'Physics'} program (${formData.studyMode} mode). Please send me enrollment details!`
    );
    window.open(`https://wa.me/${ACADEMY_WHATSAPP}?text=${text}`, '_blank');
  };

  return (
    <div id="enrollment-form-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column: Academy Info & Direct Quick Connect */}
      <div className="lg:col-span-5 space-y-6">
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-electric-blue/10 text-cyan-accent px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border border-electric-blue/20">
            <Sparkles className="w-3.5 h-3.5" />
            Official Student Registration
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-4xl text-white leading-tight">
            Reserve Your Spot in Next Cohort
          </h3>

          <p className="text-xs sm:text-sm text-brand-silver leading-relaxed">
            Fill out the official enrollment application below. Submitting opens WhatsApp with your details pre-filled — send the message and our admissions officer will confirm your spot and provide portal onboarding.
          </p>
        </div>

        {/* Feature Highlights Card */}
        <div className="glass-panel border border-white/10 rounded-2xl p-5 space-y-3.5 bg-gradient-to-b from-navy-card/60 to-navy-dark/90 shadow-xl">
          <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
            <ShieldCheck className="w-4 h-4 text-cyan-accent" />
            What Happens After Registration?
          </h4>

          <ul className="space-y-2.5 text-xs text-brand-silver">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-accent/10 text-cyan-accent flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">1</span>
              <span>Your registration details are sent to our admissions team on WhatsApp with status <strong className="text-amber-400">Pending Payment</strong>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-accent/10 text-cyan-accent flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">2</span>
              <span>Complete tuition payment via <strong>IBAN Bank Transfer</strong> or <strong>Cash</strong>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-accent/10 text-cyan-accent flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">3</span>
              <span>Upon verification, we send you your <strong>Microsoft Teams invitation link</strong>, course calendar, formula handbook, and recording platform credentials.</span>
            </li>
          </ul>
        </div>

        {/* Quick WhatsApp Support Callout */}
        <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5 flex items-center justify-between text-left group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-lg shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider block font-bold">Have Questions First?</span>
              <span className="text-white font-display font-semibold text-xs sm:text-sm">Speak with Admissions Advisor</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDirectWhatsApp}
            className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white transition-all text-xs font-semibold cursor-pointer shrink-0"
          >
            WhatsApp
          </button>
        </div>

      </div>

      {/* Right Column: Main Enrollment Form */}
      <div className="lg:col-span-7">
        <form
          onSubmit={handleSubmit}
          className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-navy-card/90 via-navy-dark to-brand-black shadow-2xl relative overflow-hidden space-y-6"
        >
          {/* Top Progress bar while submitting */}
          {isSubmitting && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-navy-dark overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-electric-blue via-cyan-accent to-emerald-400 transition-all duration-300"
                style={{ width: `${submissionProgress}%` }}
              />
            </div>
          )}

          {/* Form Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-accent/10 border border-cyan-accent/20 flex items-center justify-center text-cyan-accent">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-white">Enrollment Application</h4>
                <p className="text-[11px] text-brand-silver">All fields marked with * are required</p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/20 px-2.5 py-1 rounded-full">
              Intake 2026
            </span>
          </div>

          {/* Global Status Banner if Error or Success */}
          {statusMessage.text && (
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                statusMessage.type === 'error'
                  ? 'bg-red-500/10 border-red-500/30 text-red-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}
            >
              {statusMessage.type === 'error' ? (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* SECTION 1: Student Information */}
          <div className="space-y-4">
            <h5 className="text-xs font-mono uppercase tracking-wider text-cyan-accent font-semibold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              1. Student Details
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Student Full Name */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs text-brand-silver font-medium flex items-center justify-between">
                  <span>Student Full Name *</span>
                  {errors.studentName && <span className="text-red-400 text-[10px]">{errors.studentName}</span>}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-brand-silver/60" />
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="e.g. Faisal Al-Mansoor"
                    disabled={isSubmitting}
                    className={`w-full bg-brand-black/60 border rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-brand-silver/40 focus:outline-none transition-all ${
                      errors.studentName ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-cyan-accent'
                    }`}
                  />
                </div>
              </div>

              {/* Student Email */}
              <div className="space-y-1.5">
                <label className="text-xs text-brand-silver font-medium flex items-center justify-between">
                  <span>Student Email *</span>
                  {errors.studentEmail && <span className="text-red-400 text-[10px]">{errors.studentEmail}</span>}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-brand-silver/60" />
                  <input
                    type="email"
                    name="studentEmail"
                    value={formData.studentEmail}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    disabled={isSubmitting}
                    className={`w-full bg-brand-black/60 border rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-brand-silver/40 focus:outline-none transition-all ${
                      errors.studentEmail ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-cyan-accent'
                    }`}
                  />
                </div>
              </div>

              {/* Student Phone */}
              <div className="space-y-1.5">
                <label className="text-xs text-brand-silver font-medium flex items-center justify-between">
                  <span>Student Phone *</span>
                  {errors.studentPhone && <span className="text-red-400 text-[10px]">{errors.studentPhone}</span>}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-brand-silver/60" />
                  <input
                    type="tel"
                    name="studentPhone"
                    value={formData.studentPhone}
                    onChange={handleChange}
                    placeholder="+966 50 123 4567"
                    disabled={isSubmitting}
                    className={`w-full bg-brand-black/60 border rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-brand-silver/40 focus:outline-none transition-all ${
                      errors.studentPhone ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-cyan-accent'
                    }`}
                  />
                </div>
              </div>

              {/* Parent Name (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs text-brand-silver font-medium">
                  Parent / Guardian Name <span className="text-brand-silver/40 text-[10px]">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  placeholder="e.g. Mohammed Al-Mansoor"
                  disabled={isSubmitting}
                  className="w-full bg-brand-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-brand-silver/40 focus:border-cyan-accent focus:outline-none transition-all"
                />
              </div>

              {/* Parent Phone (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs text-brand-silver font-medium flex justify-between">
                  <span>Parent / Guardian Phone <span className="text-brand-silver/40 text-[10px]">(Optional)</span></span>
                  {errors.parentPhone && <span className="text-red-400 text-[10px]">{errors.parentPhone}</span>}
                </label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  placeholder="+961 76 688 522"
                  disabled={isSubmitting}
                  className={`w-full bg-brand-black/60 border rounded-xl px-3 py-2.5 text-xs text-white placeholder-brand-silver/40 focus:outline-none transition-all ${
                    errors.parentPhone ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-cyan-accent'
                  }`}
                />
              </div>

              {/* Country */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs text-brand-silver font-medium flex items-center justify-between">
                  <span>Country of Residence *</span>
                  {errors.country && <span className="text-red-400 text-[10px]">{errors.country}</span>}
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3 top-3 text-brand-silver/60" />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-brand-black/60 border border-white/10 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white focus:border-cyan-accent focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    {COUNTRIES_LIST.map((c) => (
                      <option key={c} value={c} className="bg-navy-dark text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Course & Academic Selection */}
          <div className="space-y-4 pt-2 border-t border-white/5">
            <h5 className="text-xs font-mono uppercase tracking-wider text-cyan-accent font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              2. Academic Selection
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Course selection */}
              <div className="space-y-1.5">
                <label className="text-xs text-brand-silver font-medium flex items-center justify-between">
                  <span>Target Physics Course *</span>
                  {errors.course && <span className="text-red-400 text-[10px]">{errors.course}</span>}
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full bg-brand-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-cyan-accent focus:outline-none transition-all cursor-pointer"
                >
                  {AVAILABLE_COURSES.map((c) => (
                    <option key={c} value={c} className="bg-navy-dark text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Batch */}
              <div className="space-y-1.5">
                <label className="text-xs text-brand-silver font-medium flex items-center justify-between">
                  <span>Preferred Batch Schedule *</span>
                  {errors.preferredBatch && <span className="text-red-400 text-[10px]">{errors.preferredBatch}</span>}
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-3 text-brand-silver/60" />
                  <select
                    name="preferredBatch"
                    value={formData.preferredBatch}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-brand-black/60 border border-white/10 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white focus:border-cyan-accent focus:outline-none transition-all cursor-pointer appearance-none"
                  >
                    {PREFERRED_BATCHES.map((b) => (
                      <option key={b} value={b} className="bg-navy-dark text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Study Mode Radio Buttons */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs text-brand-silver font-medium block">
                  Study Format / Mode *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STUDY_MODES.map((mode) => {
                    const isSelected = formData.studyMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => handleStudyModeChange(mode.id)}
                        disabled={isSubmitting}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-electric-blue/15 border-cyan-accent shadow-lg shadow-electric-blue/10'
                            : 'bg-brand-black/40 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'border-cyan-accent bg-cyan-accent' : 'border-brand-silver/40'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-brand-black" />}
                        </div>
                        <div>
                          <span className="font-display font-semibold text-xs text-white block">
                            {mode.label}
                          </span>
                          <span className="text-[10px] text-brand-silver block leading-tight mt-0.5">
                            {mode.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Payment Method Selection */}
          <div className="space-y-4 pt-2 border-t border-white/5">
            <h5 className="text-xs font-mono uppercase tracking-wider text-cyan-accent font-semibold flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" />
              3. Payment Method
            </h5>

            <div className="grid grid-cols-1 gap-3">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = formData.paymentMethod === method.id;
                const isComingSoon = method.status === 'coming_soon';

                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => handlePaymentMethodChange(method.id as PaymentMethod)}
                    disabled={isSubmitting || isComingSoon}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isComingSoon
                        ? 'bg-brand-black/20 border-white/5 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-electric-blue/15 border-cyan-accent shadow-md'
                        : 'bg-brand-black/40 border-white/10 hover:border-white/20 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-cyan-accent bg-cyan-accent' : 'border-brand-silver/40'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-brand-black" />}
                      </div>
                      <div>
                        <span className="font-display font-semibold text-xs text-white block">
                          {method.label}
                        </span>
                        <span className="text-[10px] text-brand-silver block mt-0.5">
                          {method.desc}
                        </span>
                      </div>
                    </div>

                    {isComingSoon && (
                      <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full font-bold">
                        COMING SOON
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: Additional Notes */}
          <div className="space-y-1.5 pt-2 border-t border-white/5">
            <label className="text-xs text-brand-silver font-medium flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-accent" />
              Additional Notes or Specific Goals <span className="text-brand-silver/40 text-[10px]">(Optional)</span>
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              placeholder="e.g. Preparing for May AP exam, seeking help with rotational dynamics..."
              disabled={isSubmitting}
              className="w-full bg-brand-black/60 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-brand-silver/40 focus:border-cyan-accent focus:outline-none transition-all resize-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-6 rounded-xl font-display font-bold text-sm tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                isSubmitting
                  ? 'bg-cyan-accent/30 text-white/50 cursor-wait'
                  : 'bg-gradient-to-r from-electric-blue via-cyan-accent to-electric-blue text-brand-black hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] shadow-cyan-accent/20'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Opening WhatsApp...</span>
                </>
              ) : (
                <>
                  <span>Register via WhatsApp</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
