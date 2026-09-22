'use client';

import { Checkbox, ItemList, NumberInput, SelectInput, StringList, TextArea, TextInput } from './fields';
import { SERVICE_ICONS, type Course, type Service, type SiteContent } from '@/types';

/** Each editor receives one top-level slice of SiteContent and patches it. */
export interface EditorProps<K extends keyof SiteContent> {
  value: SiteContent[K];
  onChange: (patch: Partial<SiteContent[K]>) => void;
}

const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}`;

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Algebra-Based', 'Calculus-Based'] as const;

const ACCENTS = [
  'text-electric-blue bg-electric-blue/10 border-electric-blue/20',
  'text-cyan-accent bg-cyan-accent/10 border-cyan-accent/20',
  'text-white bg-white/5 border-white/10',
] as const;

function SectionCopyFields({ value, onChange }: { value: { eyebrow: string; title: string; description: string }; onChange: (p: Partial<typeof value>) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextInput label="Eyebrow label" value={value.eyebrow} onChange={(eyebrow) => onChange({ eyebrow })} />
      <TextInput label="Section title" value={value.title} onChange={(title) => onChange({ title })} />
      <TextArea label="Description" value={value.description} onChange={(description) => onChange({ description })} className="sm:col-span-2" />
    </div>
  );
}

export function SiteEditor({ value, onChange }: EditorProps<'site'>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextInput label="Site name" value={value.name} onChange={(name) => onChange({ name })} hint="Browser tab title" />
      <TextInput label="Short name" value={value.shortName} onChange={(shortName) => onChange({ shortName })} hint="Used in the footer and logo alt text" />
      <TextArea label="Meta description" value={value.metaDescription} onChange={(metaDescription) => onChange({ metaDescription })} className="sm:col-span-2" hint="Shown in search results" />
      <TextInput
        label="WhatsApp number"
        value={value.whatsappNumber}
        onChange={(whatsappNumber) => onChange({ whatsappNumber: whatsappNumber.replace(/\D/g, '') })}
        hint="Digits only with country code, e.g. 966597621520. Every WhatsApp button and the enrollment form use this."
      />
      <TextInput label="Instagram URL" value={value.instagramUrl} onChange={(instagramUrl) => onChange({ instagramUrl })} hint="Leave empty to hide the link" />
      <NumberInput label="Copyright year" value={value.copyrightYear} onChange={(copyrightYear) => onChange({ copyrightYear })} min={2000} max={2100} />
    </div>
  );
}

export function HeroEditor({ value, onChange }: EditorProps<'hero'>) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput label="Badge" value={value.badge} onChange={(badge) => onChange({ badge })} className="sm:col-span-2" />
        <TextInput label="Headline line 1" value={value.titleLine1} onChange={(titleLine1) => onChange({ titleLine1 })} />
        <TextInput label="Headline line 2 (gradient)" value={value.titleLine2} onChange={(titleLine2) => onChange({ titleLine2 })} />
        <TextArea label="Description" value={value.description} onChange={(description) => onChange({ description })} className="sm:col-span-2" />
        <TextInput label="Primary button" value={value.primaryCta} onChange={(primaryCta) => onChange({ primaryCta })} hint="Also used for the header button" />
        <TextInput label="Secondary button" value={value.secondaryCta} onChange={(secondaryCta) => onChange({ secondaryCta })} />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-display font-semibold">Metrics ribbon</h3>
        <ItemList
          items={value.metrics}
          onChange={(metrics) => onChange({ metrics })}
          createItem={() => ({ value: '', label: '', accent: false })}
          getTitle={(m) => `${m.value} — ${m.label}`}
          addLabel="Add metric"
          renderItem={(m, update) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <TextInput label="Value" value={m.value} onChange={(v) => update({ value: v })} />
              <TextInput label="Label" value={m.label} onChange={(label) => update({ label })} />
              <Checkbox label="Highlight in accent colour" checked={m.accent} onChange={(accent) => update({ accent })} />
            </div>
          )}
        />
      </div>
    </div>
  );
}

export function AboutEditor({ value, onChange }: EditorProps<'about'>) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput label="Eyebrow label" value={value.eyebrow} onChange={(eyebrow) => onChange({ eyebrow })} />
        <TextInput label="Title" value={value.title} onChange={(title) => onChange({ title })} />
        <TextArea label="Lead sentence" value={value.lead} onChange={(lead) => onChange({ lead })} className="sm:col-span-2" rows={2} />
      </div>
      <StringList label="Paragraphs" values={value.paragraphs} onChange={(paragraphs) => onChange({ paragraphs })} addLabel="Add paragraph" multiline />
      <div className="space-y-2">
        <h3 className="text-sm font-display font-semibold">Highlights</h3>
        <ItemList
          items={value.highlights}
          onChange={(highlights) => onChange({ highlights })}
          createItem={() => ({ title: '', text: '' })}
          getTitle={(h) => h.title}
          addLabel="Add highlight"
          renderItem={(h, update) => (
            <div className="grid gap-3">
              <TextInput label="Title" value={h.title} onChange={(title) => update({ title })} />
              <TextInput label="Text" value={h.text} onChange={(text) => update({ text })} />
            </div>
          )}
        />
      </div>
    </div>
  );
}

export function CoursesEditor({ value, onChange }: EditorProps<'courses'>) {
  return (
    <div className="space-y-6">
      <SectionCopyFields value={value} onChange={onChange} />
      <ItemList
        items={value.items}
        onChange={(items) => onChange({ items })}
        createItem={(): Course => ({ id: newId('course'), title: '', subtitle: '', description: '', duration: '', difficulty: 'All Levels', curriculum: [], features: [] })}
        getTitle={(c) => c.title}
        addLabel="Add course"
        renderItem={(c, update) => (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextInput label="Title" value={c.title} onChange={(title) => update({ title })} />
              <TextInput label="Subtitle" value={c.subtitle} onChange={(subtitle) => update({ subtitle })} />
              <TextInput label="Duration" value={c.duration} onChange={(duration) => update({ duration })} placeholder="e.g. 12 - 14 Weeks" />
              <SelectInput label="Difficulty" value={c.difficulty} options={DIFFICULTIES} onChange={(difficulty) => update({ difficulty })} />
              <TextArea label="Description" value={c.description} onChange={(description) => update({ description })} className="sm:col-span-2" />
            </div>
            <StringList label="Curriculum topics" values={c.curriculum} onChange={(curriculum) => update({ curriculum })} addLabel="Add topic" />
            <StringList label="What's included" values={c.features} onChange={(features) => update({ features })} addLabel="Add feature" />
          </div>
        )}
      />
    </div>
  );
}

export function ServicesEditor({ value, onChange }: EditorProps<'services'>) {
  return (
    <div className="space-y-6">
      <SectionCopyFields value={value} onChange={onChange} />
      <ItemList
        items={value.items}
        onChange={(items) => onChange({ items })}
        createItem={(): Service => ({ id: newId('service'), title: '', description: '', icon: 'User', accentClassName: ACCENTS[0] })}
        getTitle={(s) => s.title}
        addLabel="Add service"
        renderItem={(s, update) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextInput label="Title" value={s.title} onChange={(title) => update({ title })} />
            <SelectInput label="Icon" value={s.icon} options={SERVICE_ICONS} onChange={(icon) => update({ icon })} />
            <TextArea label="Description" value={s.description} onChange={(description) => update({ description })} className="sm:col-span-2" rows={2} />
            <SelectInput label="Colour" value={s.accentClassName as (typeof ACCENTS)[number]} options={ACCENTS} onChange={(accentClassName) => update({ accentClassName })} />
          </div>
        )}
      />
    </div>
  );
}

export function PricingEditor({ value, onChange }: EditorProps<'pricing'>) {
  const patchOneOnOne = (p: Partial<typeof value.oneOnOne>) => onChange({ oneOnOne: { ...value.oneOnOne, ...p } });
  const patchGroup = (p: Partial<typeof value.group>) => onChange({ group: { ...value.group, ...p } });
  return (
    <div className="space-y-6">
      <SectionCopyFields value={value} onChange={onChange} />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-white/10 p-4">
          <h3 className="text-sm font-display font-semibold">Group course (SAR)</h3>
          <NumberInput label="Original price" value={value.group.original} onChange={(original) => patchGroup({ original })} min={0} />
          <NumberInput label="Discounted price" value={value.group.discount} onChange={(discount) => patchGroup({ discount })} min={0} />
        </div>
        <div className="space-y-3 rounded-xl border border-white/10 p-4">
          <h3 className="text-sm font-display font-semibold">One-on-one (SAR per hour)</h3>
          <NumberInput label="Original price / hour" value={value.oneOnOne.originalPerHour} onChange={(originalPerHour) => patchOneOnOne({ originalPerHour })} min={0} />
          <NumberInput label="Discounted price / hour" value={value.oneOnOne.discountPerHour} onChange={(discountPerHour) => patchOneOnOne({ discountPerHour })} min={0} />
          <div className="grid grid-cols-3 gap-3">
            <NumberInput label="Min hours" value={value.oneOnOne.minHours} onChange={(minHours) => patchOneOnOne({ minHours })} min={1} />
            <NumberInput label="Max hours" value={value.oneOnOne.maxHours} onChange={(maxHours) => patchOneOnOne({ maxHours })} min={1} />
            <NumberInput label="Default" value={value.oneOnOne.defaultHours} onChange={(defaultHours) => patchOneOnOne({ defaultHours })} min={1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsEditor({ value, onChange }: EditorProps<'testimonials'>) {
  return (
    <div className="space-y-6">
      <SectionCopyFields value={value} onChange={onChange} />
      <ItemList
        items={value.items}
        onChange={(items) => onChange({ items })}
        createItem={() => ({ id: newId('t'), name: '', role: '', course: '', content: '', rating: 5 })}
        getTitle={(t) => t.name}
        addLabel="Add testimonial"
        renderItem={(t, update) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextInput label="Name" value={t.name} onChange={(name) => update({ name })} />
            <TextInput label="Role" value={t.role} onChange={(role) => update({ role })} placeholder="e.g. AP Physics 1 Student" />
            <TextInput label="Course / result" value={t.course} onChange={(course) => update({ course })} placeholder="e.g. AP Physics (Score: 5)" />
            <NumberInput label="Rating (1–5)" value={t.rating} onChange={(rating) => update({ rating: Math.min(5, Math.max(1, Math.round(rating))) })} min={1} max={5} />
            <TextArea label="Quote" value={t.content} onChange={(content) => update({ content })} className="sm:col-span-2" />
          </div>
        )}
      />
    </div>
  );
}

export function FaqEditor({ value, onChange }: EditorProps<'faq'>) {
  return (
    <div className="space-y-6">
      <SectionCopyFields value={value} onChange={onChange} />
      <ItemList
        items={value.items}
        onChange={(items) => onChange({ items })}
        createItem={() => ({ id: newId('faq'), question: '', answer: '' })}
        getTitle={(f) => f.question}
        addLabel="Add question"
        renderItem={(f, update) => (
          <div className="grid gap-3">
            <TextInput label="Question" value={f.question} onChange={(question) => update({ question })} />
            <TextArea label="Answer" value={f.answer} onChange={(answer) => update({ answer })} rows={4} />
          </div>
        )}
      />
    </div>
  );
}

export function FooterEditor({ value, onChange }: EditorProps<'footer'>) {
  return <TextArea label="Footer tagline" value={value.tagline} onChange={(tagline) => onChange({ tagline })} rows={2} />;
}

export function BankEditor({ value, onChange }: EditorProps<'bank'>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextInput label="Bank name" value={value.bankName} onChange={(bankName) => onChange({ bankName })} />
      <TextInput label="Account name" value={value.accountName} onChange={(accountName) => onChange({ accountName })} />
      <TextInput label="IBAN" value={value.iban} onChange={(iban) => onChange({ iban })} className="sm:col-span-2" />
      <TextInput label="SWIFT / BIC" value={value.swiftCode} onChange={(swiftCode) => onChange({ swiftCode })} />
      <TextInput label="Currency" value={value.currency} onChange={(currency) => onChange({ currency })} />
      <TextInput label="STC Pay number" value={value.stcPayNumber} onChange={(stcPayNumber) => onChange({ stcPayNumber })} />
    </div>
  );
}
