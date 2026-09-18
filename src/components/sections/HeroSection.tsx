import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import Container from '@/components/ui/Container';

const HERO_METRICS = [
  { value: 'A* / 5', label: 'Target Score', accent: false },
  { value: '100%', label: 'Online HD', accent: true },
  { value: '1-on-1', label: '& Groups', accent: false },
];

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-8 pb-16 sm:py-24 overflow-hidden">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Hero Left: Headlines */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
          
          {/* Premium Top Badge */}
          <div className="inline-flex items-center gap-2 bg-electric-blue/10 text-cyan-accent px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-electric-blue/20">
            <Sparkles className="w-3.5 h-3.5" />
            Clarity · Strategy · Momentum
          </div>

          <div className="space-y-4">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
              Master Physics.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent via-electric-blue to-white">
                Achieve Higher Scores.
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-brand-silver font-sans max-w-xl leading-relaxed">
              Expert Physics tutoring designed for students preparing for AP Physics and Tahsili. Build complete conceptual mastery and top test taking strategies.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              id="hero-enroll-now-btn"
              className="px-8 py-4 rounded-xl text-xs sm:text-sm font-display font-bold bg-gradient-to-r from-electric-blue to-cyan-accent text-white shadow-xl shadow-electric-blue/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Enroll Now
              <ArrowRight className="w-4.5 h-4.5" />
            </a>

            <a
              href="#courses"
              id="hero-view-courses-btn"
              className="px-8 py-4 rounded-xl text-xs sm:text-sm font-display font-semibold border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              View Courses
            </a>
          </div>

          {/* Faint metric ribbon */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 max-w-md font-mono">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label}>
                <span className={`block text-xl sm:text-2xl font-bold ${metric.accent ? 'text-cyan-accent' : 'text-white'}`}>
                  {metric.value}
                </span>
                <span className="text-[10px] text-brand-silver uppercase tracking-wider">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Right: Tech Blueprint Mockup representing Physics */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-sm aspect-square glass-panel border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl bg-gradient-to-br from-navy-card/60 to-brand-black">
            {/* Background decorative planet orbits */}
            <div className="absolute inset-0 border border-white/5 rounded-full scale-75 animate-pulse" />
            <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />
            
            <div className="flex justify-between items-start z-10">
              <span className="text-[10px] font-mono text-brand-silver bg-white/5 px-2 py-0.5 rounded border border-white/5">
                SYS.VECTORS
              </span>
              <Zap className="w-5 h-5 text-cyan-accent animate-bounce" />
            </div>

            {/* Conceptual vector canvas render */}
            <div className="my-auto py-8 relative flex flex-col items-center justify-center space-y-3 z-10">
              <div className="w-16 h-16 rounded-full bg-electric-blue/20 border-2 border-electric-blue flex items-center justify-center text-xl text-white font-display font-black relative shadow-lg shadow-electric-blue/30">
                p
                <span className="absolute -top-1.5 -right-1.5 text-[9px] font-mono text-cyan-accent uppercase bg-brand-black px-1 border border-cyan-accent/20 rounded">
                  vector
                </span>
              </div>
              
              {/* Connect arrow lines */}
              <div className="h-10 border-r border-dashed border-cyan-accent relative">
                <div className="absolute bottom-0 -right-1 border-t-4 border-t-cyan-accent border-x-4 border-x-transparent" />
              </div>

              <div className="text-center">
                <div className="font-mono text-xs text-white uppercase tracking-wider font-semibold">momentum = mass × velocity</div>
                <div className="font-mono text-[10px] text-brand-silver mt-1">p_net = Σm_i·v_i</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-brand-silver pt-2 border-t border-white/5 z-10">
              <span>CLARITY</span>
              <span>STRATEGY</span>
              <span>MOMENTUM</span>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
