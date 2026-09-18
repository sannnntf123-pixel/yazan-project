import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

interface FieldLabelProps {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor?: string;
}

function FieldLabel({ label, required, error, htmlFor }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-xs text-brand-silver font-medium flex items-center justify-between gap-2">
      <span>
        {label}
        {required ? ' *' : <span className="text-brand-silver/40 text-[10px]"> (Optional)</span>}
      </span>
      {error && (
        <span role="alert" className="text-red-400 text-[10px] text-right">
          {error}
        </span>
      )}
    </label>
  );
}

const controlBase =
  'w-full bg-brand-black/60 border rounded-xl py-2.5 text-xs text-white placeholder-brand-silver/40 focus:outline-none transition-all';

function borderClass(error?: string) {
  return error ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-cyan-accent';
}

interface FieldWrapperProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  icon?: LucideIcon;
  className?: string;
  children: ReactNode;
}

function FieldWrapper({ label, name, required, error, icon: Icon, className = '', children }: FieldWrapperProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <FieldLabel label={label} required={required} error={error} htmlFor={name} />
      {Icon ? (
        <div className="relative">
          <Icon className="w-4 h-4 absolute left-3 top-3 text-brand-silver/60 pointer-events-none" />
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

type TextFieldProps = Omit<FieldWrapperProps, 'children'> & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, name, required, error, icon, className, ...inputProps }: TextFieldProps) {
  return (
    <FieldWrapper label={label} name={name} required={required} error={error} icon={icon} className={className}>
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        className={`${controlBase} ${icon ? 'pl-9 pr-3' : 'px-3'} ${borderClass(error)}`}
        {...inputProps}
      />
    </FieldWrapper>
  );
}

type SelectFieldProps = Omit<FieldWrapperProps, 'children'> &
  SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[] };

export function SelectField({ label, name, required, error, icon, className, options, ...selectProps }: SelectFieldProps) {
  return (
    <FieldWrapper label={label} name={name} required={required} error={error} icon={icon} className={className}>
      <select
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        className={`${controlBase} ${icon ? 'pl-9 pr-8 appearance-none' : 'px-3'} cursor-pointer ${borderClass(error)}`}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-navy-dark text-white">
            {option}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
