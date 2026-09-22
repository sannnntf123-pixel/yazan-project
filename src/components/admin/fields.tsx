'use client';

import type { ReactNode } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';

const control =
  'w-full bg-brand-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-brand-silver/40 focus:border-cyan-accent focus:outline-none';

interface LabelProps {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ label, hint, children, className = '' }: LabelProps) {
  return (
    <label className={`block space-y-1.5 ${className}`}>
      <span className="text-xs text-brand-silver font-medium">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-brand-silver/60">{hint}</span>}
    </label>
  );
}

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  className?: string;
  placeholder?: string;
}

export function TextInput({ label, value, onChange, hint, className, placeholder }: TextInputProps) {
  return (
    <Field label={label} hint={hint} className={className}>
      <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={control} />
    </Field>
  );
}

export function TextArea({ label, value, onChange, hint, className, rows = 3 }: TextInputProps & { rows?: number }) {
  return (
    <Field label={label} hint={hint} className={className}>
      <textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value)} className={`${control} resize-y`} />
    </Field>
  );
}

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberInput({ label, value, onChange, hint, min, max, step }: NumberInputProps) {
  return (
    <Field label={label} hint={hint}>
      <input
        type="number"
        value={Number.isFinite(value) ? value : ''}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
        className={control}
      />
    </Field>
  );
}

interface SelectInputProps<T extends string> {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}

export function SelectInput<T extends string>({ label, value, options, onChange }: SelectInputProps<T>) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value as T)} className={`${control} cursor-pointer`}>
        {options.map((option) => (
          <option key={option} value={option} className="bg-navy-dark">
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-xs text-brand-silver cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-cyan-accent" />
      {label}
    </label>
  );
}

// --- Lists ------------------------------------------------------------------

function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

const iconButton =
  'p-1.5 rounded-md bg-white/5 text-brand-silver hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 cursor-pointer disabled:cursor-default';

interface StringListProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  addLabel?: string;
  multiline?: boolean;
}

/** Editable list of plain strings (curriculum topics, paragraphs, ...). */
export function StringList({ label, values, onChange, addLabel = 'Add item', multiline = false }: StringListProps) {
  const update = (index: number, value: string) => onChange(values.map((v, i) => (i === index ? value : v)));

  return (
    <div className="space-y-2">
      <span className="text-xs text-brand-silver font-medium">{label}</span>
      {values.map((value, index) => (
        <div key={index} className="flex items-start gap-2">
          {multiline ? (
            <textarea value={value} rows={2} onChange={(e) => update(index, e.target.value)} className={`${control} resize-y`} />
          ) : (
            <input type="text" value={value} onChange={(e) => update(index, e.target.value)} className={control} />
          )}
          <ListControls
            index={index}
            count={values.length}
            onMove={(to) => onChange(moveItem(values, index, to))}
            onRemove={() => onChange(values.filter((_, i) => i !== index))}
          />
        </div>
      ))}
      <AddButton label={addLabel} onClick={() => onChange([...values, ''])} />
    </div>
  );
}

function ListControls({ index, count, onMove, onRemove }: { index: number; count: number; onMove: (to: number) => void; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <button type="button" className={iconButton} onClick={() => onMove(index - 1)} disabled={index === 0} aria-label="Move up">
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
      <button type="button" className={iconButton} onClick={() => onMove(index + 1)} disabled={index === count - 1} aria-label="Move down">
        <ArrowDown className="w-3.5 h-3.5" />
      </button>
      <button type="button" className={`${iconButton} hover:text-red-300`} onClick={onRemove} aria-label="Remove">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-accent border border-cyan-accent/30 bg-cyan-accent/5 hover:bg-cyan-accent/15 rounded-lg px-3 py-1.5 cursor-pointer"
    >
      <Plus className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

interface ItemListProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  getTitle: (item: T, index: number) => string;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
  addLabel: string;
}

/** Editable list of objects rendered as cards with reorder/remove controls. */
export function ItemList<T>({ items, onChange, createItem, getTitle, renderItem, addLabel }: ItemListProps<T>) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <details key={index} className="group rounded-xl border border-white/10 bg-brand-black/40 open:border-cyan-accent/30">
          <summary className="flex items-center justify-between gap-3 p-3 cursor-pointer list-none">
            <span className="text-sm font-display font-semibold text-white truncate">
              <span className="text-brand-silver/60 font-mono text-xs mr-2">{index + 1}.</span>
              {getTitle(item, index) || <span className="text-brand-silver/50 italic">Untitled</span>}
            </span>
            <span onClick={(e) => e.preventDefault()}>
              <ListControls
                index={index}
                count={items.length}
                onMove={(to) => onChange(moveItem(items, index, to))}
                onRemove={() => onChange(items.filter((_, i) => i !== index))}
              />
            </span>
          </summary>
          <div className="p-4 pt-1 border-t border-white/5 space-y-3">
            {renderItem(item, (patch) => onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it))))}
          </div>
        </details>
      ))}
      <AddButton label={addLabel} onClick={() => onChange([...items, createItem()])} />
    </div>
  );
}
