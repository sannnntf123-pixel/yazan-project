import Container from '@/components/ui/Container';
import PhysicsSandbox from '@/components/PhysicsSandbox';

const ABOUT_HIGHLIGHTS = [
  { title: 'Concept Mastery First', text: 'Core visualizations and simulations over boring memorization.' },
  { title: 'Exam-focused Answering', text: 'Precise syllabus terminology that locks down maximum points.' },
  { title: 'Proven Results Record', text: 'Over 90% of cohorts secure premium grade bands annually.' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 border-t border-white/5 relative bg-gradient-to-b from-brand-black to-navy-dark/40">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest font-bold">ABOUT THE ACADEMY</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Why Momentum Physics?
              </h2>
            </div>

            <div className="space-y-4 text-brand-silver text-sm sm:text-base leading-relaxed">
              <p className="text-white font-semibold font-display">
                At Momentum Physics, we believe that Physics shouldn't feel complicated.
              </p>
              
              <p>
                Our teaching focuses on building deep understanding, problem-solving skills, and exam strategies that help students achieve top results.
              </p>

              <p>
                Whether you're preparing for AP Physics or Tahsili, our structured lessons simplify difficult concepts and build confidence. We strip away memory mechanics and replace them with intuitive physical frameworks.
              </p>
            </div>

            {/* Features list under About Us */}
            <ul className="space-y-3 pt-4 border-t border-white/5">
              {ABOUT_HIGHLIGHTS.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-xs sm:text-sm text-brand-silver">
                  <span className="w-5 h-5 rounded bg-electric-blue/15 text-cyan-accent flex items-center justify-center shrink-0 font-bold" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <strong>{item.title}</strong> — {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content Column: Live Interactive Sandbox Lab */}
          <div className="lg:col-span-6">
            <PhysicsSandbox />
          </div>

        </div>
      </Container>
    </section>
  );
}
