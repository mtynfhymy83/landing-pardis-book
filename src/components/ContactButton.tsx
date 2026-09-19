import type { ReactNode } from 'react';

type Props = { href: string | null; children: ReactNode; variant?: 'primary' | 'secondary'; className?: string };

export function ContactButton({ href, children, variant = 'primary', className = '' }: Props) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal ${variant === 'primary' ? 'border border-teal bg-gradient-to-l from-[#00848c] to-[#009da4] text-white shadow-sm enabled:hover:brightness-110' : 'border border-[#a6b8cc] bg-white/80 text-ink enabled:hover:bg-slate-50'} ${className}`;
  return href ? <a className={classes} href={href}>{children}</a> : <button type="button" disabled className={`${classes} cursor-not-allowed`} title="اطلاعات تماس به‌زودی تکمیل می‌شود">{children}</button>;
}
