interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}

/** Eyebrow label + h2 + optional blurb, shared by all landing sections. */
export default function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`max-w-xl space-y-3 ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
      <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest font-bold">{eyebrow}</span>
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">{title}</h2>
      {description && <p className="text-xs sm:text-sm text-brand-silver leading-relaxed">{description}</p>}
    </div>
  );
}
