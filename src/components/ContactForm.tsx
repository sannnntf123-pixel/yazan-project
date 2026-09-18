'use client';

import React, { useState } from 'react';
import { Send, MessageCircle, Instagram, CheckCircle2, Phone, AlertCircle, ArrowRight } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    curriculum: 'AP Physics',
    mode: 'Group Course',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const academyWhatsApp = '966597621520'; // Clean country code format
  const academyInstagram = 'momentum.physics';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getPrefilledText = () => {
    return `Hello Momentum Physics! I would like to inquire about physics tutoring.\n\n` +
      `• Name: ${formData.name || 'Interested Student'}\n` +
      `• Email: ${formData.email || 'N/A'}\n` +
      `• Phone: ${formData.phone || 'N/A'}\n` +
      `• Curriculum: ${formData.curriculum}\n` +
      `• Preferred Format: ${formData.mode}\n` +
      `• Message: ${formData.message || 'I want to enroll in the upcoming intake!'}`;
  };

  const handleWhatsAppDirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide your name to generate a customized WhatsApp message.');
      return;
    }
    setError('');
    
    // Encode message for WhatsApp link
    const encodedText = encodeURIComponent(getPrefilledText());
    const whatsappUrl = `https://wa.me/${academyWhatsApp}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  const handleSubmitEmailForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in both your Name and Email address.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  const triggerDirectWhatsAppOnly = () => {
    const text = encodeURIComponent("Hello Momentum Physics! I am ready to master Physics and would love to learn more about your AP and Tahsili courses. Please send me info on upcoming cohorts!");
    window.open(`https://wa.me/${academyWhatsApp}?text=${text}`, '_blank');
  };

  const triggerDirectInstagram = () => {
    window.open(`https://www.instagram.com/${academyInstagram}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Brand CTA and Direct Link Cards */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-electric-blue/10 text-cyan-accent px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-electric-blue/20">
            <Phone className="w-3.5 h-3.5" />
            Connect Instantly
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Ready to master Physics?
          </h3>
          <p className="text-sm sm:text-base text-brand-silver leading-relaxed">
            Contact us today and start your journey toward higher scores. Our advisors are available 7 days a week to guide your curriculum selection and enrollment.
          </p>
        </div>

        {/* Quick click CTA blocks */}
        <div className="space-y-3.5">
          {/* WhatsApp Direct */}
          <button
            onClick={triggerDirectWhatsAppOnly}
            id="direct-whatsapp-btn"
            className="w-full p-4 rounded-xl border border-green-500/10 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/30 transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-xl shadow-lg">
                <MessageCircle className="w-5 h-5 fill-green-400/20" />
              </span>
              <div>
                <span className="text-[11px] font-mono text-green-400 uppercase tracking-wider block">Chat on WhatsApp</span>
                <span className="text-white font-display font-semibold text-sm sm:text-base">+966 59 762 1520</span>
              </div>
            </div>
            <span className="p-1.5 rounded-lg bg-white/5 text-brand-silver group-hover:text-white transition-all group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          {/* Instagram Direct */}
          <button
            onClick={triggerDirectInstagram}
            id="direct-instagram-btn"
            className="w-full p-4 rounded-xl border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/35 transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl shadow-lg">
                <Instagram className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block">Direct Message</span>
                <span className="text-white font-display font-semibold text-sm sm:text-base">@momentum.physics</span>
              </div>
            </div>
            <span className="p-1.5 rounded-lg bg-white/5 text-brand-silver group-hover:text-white transition-all group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* Faint physics note */}
        <div className="bg-navy-dark/40 border border-white/5 rounded-xl p-3.5 text-[11px] text-brand-silver">
          📍 Lessons are conducted globally in Arabic & English. Custom materials are shared via individual student profiles.
        </div>
      </div>

      {/* Interactive Form Workspace */}
      <div className="lg:col-span-7">
        <div className="glass-panel border border-white/10 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-navy-card/80 to-navy-dark/80 relative overflow-hidden shadow-2xl">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-xl text-white">Inquiry Sent Successfully!</h4>
              <p className="text-sm text-brand-silver max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. If you selected the WhatsApp option, your chat thread is ready. Otherwise, our student advisor will email you at <strong>{formData.email}</strong> within the next few hours!
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', curriculum: 'AP Physics', mode: 'Group Course', message: '' });
                }}
                className="px-4 py-2 text-xs font-display font-semibold text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/20 rounded-lg hover:bg-cyan-accent/20 transition-all cursor-pointer"
              >
                Submit New Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppDirect} className="space-y-4">
              <h4 className="font-display font-bold text-lg text-white mb-2">Send an Academic Inquiry</h4>
              
              {error && (
                <div className="p-3 bg-red-500/15 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="name-input" className="text-xs font-mono text-brand-silver">Full Name *</label>
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    required
                    placeholder="Enter student name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-brand-silver/50 focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email-input" className="text-xs font-mono text-brand-silver">Email Address *</label>
                  <input
                    type="email"
                    id="email-input"
                    name="email"
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-brand-silver/50 focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone number */}
                <div className="space-y-1">
                  <label htmlFor="phone-input" className="text-xs font-mono text-brand-silver">Phone Number</label>
                  <input
                    type="tel"
                    id="phone-input"
                    name="phone"
                    placeholder="e.g. +966 50 000 0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-brand-silver/50 focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent outline-none transition-all"
                  />
                </div>

                {/* Curriculum Selection */}
                <div className="space-y-1">
                  <label htmlFor="curriculum-select" className="text-xs font-mono text-brand-silver">Curriculum of Interest</label>
                  <select
                    id="curriculum-select"
                    name="curriculum"
                    value={formData.curriculum}
                    onChange={handleInputChange}
                    className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:border-cyan-accent outline-none transition-all"
                  >
                    <option value="AP Physics">⚡ AP Physics (1, 2, C)</option>
                    <option value="Tahsili Physics">⚡ Tahsili Physics</option>
                    <option value="Other Curriculum">🎓 Other Physics Curriculum</option>
                  </select>
                </div>
              </div>

              {/* Preferred Format */}
              <div className="space-y-1">
                <label htmlFor="format-select" className="text-xs font-mono text-brand-silver">Preferred Class Format</label>
                <select
                  id="format-select"
                  name="mode"
                  value={formData.mode}
                  onChange={handleInputChange}
                  className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:border-cyan-accent outline-none transition-all"
                >
                  <option value="Group Course">🎓 Interactive Group Course (Max 15 students)</option>
                  <option value="One-on-One Sessions">⚡ One-on-One Private Tutoring Sessions</option>
                  <option value="Not Sure">📋 Unsure / Request Consultation first</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="message-input" className="text-xs font-mono text-brand-silver">Additional Message / Question</label>
                <textarea
                  id="message-input"
                  name="message"
                  rows={3}
                  placeholder="Tell us about your learning goals or target exam dates..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-brand-silver/50 focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent outline-none transition-all resize-none"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* WhatsApp Action */}
                <button
                  type="submit"
                  id="whatsapp-submit-btn"
                  className="py-3 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-display font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-green-600/10 active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  Inquire via WhatsApp
                </button>

                {/* Email Action */}
                <button
                  type="button"
                  onClick={handleSubmitEmailForm}
                  id="email-submit-btn"
                  className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-display font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all"
                >
                  <Send className="w-4 h-4 text-cyan-accent" />
                  Submit via Email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
