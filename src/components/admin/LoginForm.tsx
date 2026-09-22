'use client';

import { useActionState } from 'react';
import { Lock, Loader2, ShieldCheck } from 'lucide-react';
import { login } from '@/app/admin/actions';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <main className="min-h-screen bg-brand-black text-white flex items-center justify-center p-4">
      <form
        action={formAction}
        className="w-full max-w-sm glass-panel rounded-2xl p-8 space-y-6 bg-gradient-to-b from-navy-card/80 to-brand-black shadow-2xl"
      >
        <div className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-cyan-accent/10 border border-cyan-accent/20 text-cyan-accent flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-display font-bold text-2xl">Admin Sign In</h1>
          <p className="text-xs text-brand-silver">Manage the Momentum Physics website content.</p>
        </div>

        {state && !state.ok && (
          <p role="alert" className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
            {state.error}
          </p>
        )}

        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs text-brand-silver font-medium">Username</span>
            <input
              name="username"
              autoComplete="username"
              required
              autoFocus
              className="w-full bg-brand-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:border-cyan-accent focus:outline-none"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs text-brand-silver font-medium">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full bg-brand-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:border-cyan-accent focus:outline-none"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-electric-blue to-cyan-accent text-brand-black hover:opacity-95 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
        >
          {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
