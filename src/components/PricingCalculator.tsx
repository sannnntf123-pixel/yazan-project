'use client';

import { useState } from 'react';
import { Check, Flame, CreditCard, Clipboard, CheckCircle, Calculator, Percent, Sparkles } from 'lucide-react';

interface PricingCalculatorProps {
  onSelectOption: (optionName: string, amount: number) => void;
}

export default function PricingCalculator({ onSelectOption }: PricingCalculatorProps) {
  const [activePlan, setActivePlan] = useState<'individual' | 'group'>('group');
  const [oneOnOneHours, setOneOnOneHours] = useState(10);
  const [copiedText, setCopiedText] = useState<'iban' | 'stc' | null>(null);

  // Constants requested by user
  const priceOneOnOneOriginal = 400; // SAR / hour
  const priceOneOnOneDiscount = 250; // SAR / hour

  const priceGroupOriginal = 5000; // SAR
  const priceGroupDiscount = 1900; // SAR

  // Calculations
  const calcOneOnOneTotalOriginal = oneOnOneHours * priceOneOnOneOriginal;
  const calcOneOnOneTotalDiscount = oneOnOneHours * priceOneOnOneDiscount;
  const calcOneOnOneTotalSavings = calcOneOnOneTotalOriginal - calcOneOnOneTotalDiscount;

  const groupSavings = priceGroupOriginal - priceGroupDiscount;

  // Real bank placeholders
  const ibanPlaceholder = "SA37 1000 0011 1003 7585 5900";
  const stcPayPlaceholder = "0597621520";

  const handleCopy = (text: string, type: 'iban' | 'stc') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Plan Selector Buttons */}
      <div className="flex justify-center p-1 bg-white/5 border border-white/10 rounded-xl max-w-md mx-auto">
        <button
          onClick={() => setActivePlan('group')}
          className={`flex-1 py-3 text-xs sm:text-sm font-display font-medium rounded-lg transition-all cursor-pointer ${
            activePlan === 'group'
              ? 'bg-gradient-to-r from-electric-blue to-cyan-accent text-white shadow-lg shadow-electric-blue/20'
              : 'text-brand-silver hover:text-white'
          }`}
        >
          🎓 Group Course Plan (Best Value)
        </button>
        <button
          onClick={() => setActivePlan('individual')}
          className={`flex-1 py-3 text-xs sm:text-sm font-display font-medium rounded-lg transition-all cursor-pointer ${
            activePlan === 'individual'
              ? 'bg-gradient-to-r from-electric-blue to-cyan-accent text-white shadow-lg shadow-electric-blue/20'
              : 'text-brand-silver hover:text-white'
          }`}
        >
          ⚡ One-on-One Sessions
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Core Offer Card */}
        <div className="lg:col-span-7 flex">
          {activePlan === 'group' ? (
            /* GROUP COURSE CARD */
            <div className="w-full glass-panel border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl">
              {/* Popular Tag */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-yellow-500/15 text-yellow-400 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-yellow-500/30 animate-pulse">
                <Flame className="w-3.5 h-3.5" />
                Highly Recommended
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl text-white">Group Course Track</h3>
                <p className="text-xs text-brand-silver mt-1.5 uppercase tracking-wide font-mono">
                  Maximum 15 students per class
                </p>

                {/* Price Display */}
                <div className="my-6 flex items-baseline gap-3.5">
                  <div className="text-4xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-accent to-electric-blue">
                    1,900 <span className="text-xs sm:text-sm font-mono font-normal text-white uppercase">SAR</span>
                  </div>
                  <div className="text-sm font-mono text-brand-silver line-through">
                    5,000 SAR
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/25 uppercase">
                    Save {( (priceGroupOriginal - priceGroupDiscount) / priceGroupOriginal * 100 ).toFixed(0)}%
                  </span>
                </div>

                <p className="text-sm text-brand-silver mb-6 leading-relaxed">
                  Our comprehensive small group interactive sessions covering the complete physical framework. Build concepts with fellow top achievers under direct expert mentorship.
                </p>

                {/* Features Checklist */}
                <div className="space-y-3.5 border-t border-white/5 pt-6">
                  {[
                    "Complete Physics curriculum tailored for selected board",
                    "Live interactive classes with digital whiteboard visualizers",
                    "Weekly mock exams modeled on actual AP/Tahsili questions",
                    "Comprehensive revision bootcamps before test dates",
                    "Direct 24/7 student chat support for doubt-clearing",
                    "Recorded sessions library available until final exam"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-brand-silver">
                      <span className="w-5 h-5 rounded-full bg-electric-blue/15 text-cyan-accent flex items-center justify-center shrink-0 font-bold text-[11px]">
                        ✔
                      </span>
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => onSelectOption('Group Course Package', priceGroupDiscount)}
                  id="enroll-group-pkg-btn"
                  className="w-full py-4 text-xs sm:text-sm font-display font-bold rounded-xl bg-gradient-to-r from-electric-blue via-cyan-accent to-electric-blue text-white shadow-xl shadow-electric-blue/20 hover:shadow-cyan-accent/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  Enroll Today
                </button>
              </div>
            </div>
          ) : (
            /* ONE-ON-ONE CARD */
            <div className="w-full glass-panel border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl">
              {/* Special Badge Tag */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-cyan-accent/15 text-cyan-accent px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-cyan-accent/30">
                <Sparkles className="w-3.5 h-3.5" />
                Special Discount
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl text-white">One-on-One Sessions</h3>
                <p className="text-xs text-brand-silver mt-1.5 uppercase tracking-wide font-mono">
                  Personalized 1-on-1 Mentorship
                </p>

                {/* Price Display */}
                <div className="my-6 flex items-baseline gap-3">
                  <div className="text-4xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-accent to-electric-blue">
                    250 <span className="text-xs sm:text-sm font-mono font-normal text-white uppercase">SAR / hour</span>
                  </div>
                  <div className="text-sm font-mono text-brand-silver line-through">
                    400 SAR/hour
                  </div>
                </div>

                <p className="text-sm text-brand-silver mb-6 leading-relaxed">
                  Tailored specifically to your school curriculum and learning speed. Focus exclusively on your unique problem areas and solve difficult physics problems step-by-step.
                </p>

                {/* Interactive slider inside pricing package */}
                <div className="bg-navy-dark/60 border border-white/5 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-brand-silver">Select Hours to Book:</span>
                    <span className="text-xs font-mono text-cyan-accent font-bold bg-cyan-accent/15 px-2 py-0.5 rounded border border-cyan-accent/20">
                      {oneOnOneHours} Hours
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="40"
                    value={oneOnOneHours}
                    onChange={(e) => setOneOnOneHours(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-accent"
                  />
                  <div className="flex justify-between text-[10px] text-brand-silver font-mono mt-1">
                    <span>2 hrs</span>
                    <span>20 hrs</span>
                    <span>40 hrs</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3.5 border-t border-white/5 pt-6">
                  {[
                    "Fully personalized learning tailored to your specific speed",
                    "Highly flexible scheduling matching your daily calendar",
                    "Live online sessions with interactive real-time screen shares",
                    "Direct focus on targeted exam problem areas & test-prep",
                    "Customized study plan & extra assigned self-checks",
                    "Regular parent-teacher feedback loop updates"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-brand-silver">
                      <span className="w-5 h-5 rounded-full bg-electric-blue/15 text-cyan-accent flex items-center justify-center shrink-0 font-bold text-[11px]">
                        ✔
                      </span>
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => onSelectOption(`${oneOnOneHours}-Hour One-on-One Program`, calcOneOnOneTotalDiscount)}
                  id="book-one-on-one-btn"
                  className="w-full py-4 text-xs sm:text-sm font-display font-bold rounded-xl bg-gradient-to-r from-electric-blue via-cyan-accent to-electric-blue text-white shadow-xl shadow-electric-blue/20 hover:shadow-cyan-accent/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  Book Now ({calcOneOnOneTotalDiscount.toLocaleString()} SAR)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Calculator Billing & Payment Methods Workspace */}
        <div className="lg:col-span-5 space-y-6">
          {/* Real-time Invoice Card */}
          <div className="glass-panel border border-white/10 rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-navy-card to-navy-dark shadow-xl">
            <h4 className="font-display font-medium text-sm text-white flex items-center gap-2 mb-4">
              <Calculator className="w-4 h-4 text-cyan-accent" />
              Dynamic Estimation Receipt
            </h4>

            <div className="space-y-3.5 font-mono text-xs">
              <div className="flex justify-between text-brand-silver border-b border-white/5 pb-2.5">
                <span>Selected Track:</span>
                <span className="text-white text-right font-sans font-semibold">
                  {activePlan === 'group' ? "Group Prep Track" : `One-on-One (${oneOnOneHours} Hours)`}
                </span>
              </div>

              <div className="flex justify-between text-brand-silver">
                <span>Standard Base Rate:</span>
                <span className="text-white line-through">
                  {activePlan === 'group'
                    ? `${priceGroupOriginal.toLocaleString()} SAR`
                    : `${calcOneOnOneTotalOriginal.toLocaleString()} SAR`}
                </span>
              </div>

              <div className="flex justify-between text-brand-silver border-b border-white/5 pb-2.5">
                <span className="text-green-400 flex items-center gap-1">
                  <Percent className="w-3 h-3" /> Academy Promotion:
                </span>
                <span className="text-green-400 font-semibold">
                  -{activePlan === 'group'
                    ? `${groupSavings.toLocaleString()} SAR`
                    : `${calcOneOnOneTotalSavings.toLocaleString()} SAR`}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 text-sm">
                <span className="text-white font-sans font-bold">Total Tuition Due:</span>
                <span className="text-xl font-display font-extrabold text-cyan-accent">
                  {activePlan === 'group'
                    ? `${priceGroupDiscount.toLocaleString()} SAR`
                    : `${calcOneOnOneTotalDiscount.toLocaleString()} SAR`}
                </span>
              </div>
            </div>

            {/* Glowing note of academic guarantee */}
            <div className="mt-4 p-3 bg-cyan-accent/5 rounded-xl border border-cyan-accent/10 flex gap-2">
              <span className="text-cyan-accent text-sm shrink-0">🎓</span>
              <p className="text-[10px] text-brand-silver leading-relaxed">
                Fees include complete access to study notes, formula sheets, mock tests, and a dedicated academic dashboard. No hidden charges.
              </p>
            </div>
          </div>

          {/* Clean Payment Information */}
          <div className="glass-panel border border-white/10 rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-navy-card to-navy-dark shadow-xl space-y-4">
            <h4 className="font-display font-medium text-sm text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
              <CreditCard className="w-4 h-4 text-cyan-accent" />
              Secure Tuition Payment Options
            </h4>

            <p className="text-[11px] text-brand-silver leading-relaxed">
              We process tuition via direct Bank Transfer and STC Pay. Copy the details below and share receipt on WhatsApp to finalize registration.
            </p>

            <div className="space-y-3">
              {/* Payment Method 1: Bank Transfer */}
              <div className="p-3 bg-brand-black/40 rounded-xl border border-white/5 space-y-2 relative group">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-display font-bold text-white flex items-center gap-1.5">
                    🏛 Bank Transfer
                  </span>
                  <span className="text-[9px] font-mono text-brand-silver">Al Rajhi Bank</span>
                </div>
                <div className="bg-navy-dark border border-white/5 rounded-lg px-3 py-2 flex items-center justify-between font-mono text-xs">
                  <div className="truncate pr-2">
                    <span className="text-[10px] text-brand-silver block uppercase text-[8px] tracking-wider">IBAN Placeholder</span>
                    <span className="text-cyan-accent select-all text-xs tracking-wider">{ibanPlaceholder}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(ibanPlaceholder, 'iban')}
                    className="p-1.5 rounded bg-white/5 text-brand-silver hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    title="Copy IBAN"
                  >
                    {copiedText === 'iban' ? (
                      <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Clipboard className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <span className="text-[10px] text-brand-silver block">
                  Beneficiary: <strong>Momentum Physics Academy</strong>
                </span>
              </div>

              {/* Payment Method 2: STC Pay */}
              <div className="p-3 bg-brand-black/40 rounded-xl border border-white/5 space-y-2 relative group">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-display font-bold text-white flex items-center gap-1.5">
                    📱 STC Pay Wallet
                  </span>
                  <span className="text-[9px] font-mono text-brand-silver">Instant Direct</span>
                </div>
                <div className="bg-navy-dark border border-white/5 rounded-lg px-3 py-2 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-brand-silver block uppercase text-[8px] tracking-wider">Mobile Account</span>
                    <span className="text-cyan-accent select-all text-sm font-semibold tracking-wider">{stcPayPlaceholder}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(stcPayPlaceholder, 'stc')}
                    className="p-1.5 rounded bg-white/5 text-brand-silver hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    title="Copy Wallet Number"
                  >
                    {copiedText === 'stc' ? (
                      <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Clipboard className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <span className="text-[10px] text-brand-silver block">
                  Click clipboard to instantly copy our STC Pay phone.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
