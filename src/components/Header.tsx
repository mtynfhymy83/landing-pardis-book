import { useEffect, useRef, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { contact, navigation } from '../data/site';
import { Brand } from './Brand';
import { ContactButton } from './ContactButton';

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const reset = (event: MediaQueryListEvent) => { if (event.matches) setOpen(false); };
    window.addEventListener('keydown', close);
    desktop.addEventListener('change', reset);
    return () => { window.removeEventListener('keydown', close); desktop.removeEventListener('change', reset); };
  }, [open]);

  const onHomepage = window.location.pathname === '/';
  const links = navigation.map(item => <a key={item.href} href={item.available ? (onHomepage ? item.href : `/${item.href}`) : undefined} aria-disabled={!item.available} title={item.available ? undefined : 'در مرحله بعد اضافه می‌شود'} onClick={() => setOpen(false)} className={`rounded-md px-3 py-3 text-sm font-semibold text-ink focus-visible:outline-2 focus-visible:outline-teal ${item.available ? 'transition hover:bg-teal/5 hover:text-teal' : 'cursor-default'}`}>{item.label}</a>);
  return <header className="relative z-20 border-b border-slate-100 bg-white/95">
    <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-2 px-4 py-4 sm:px-6 lg:px-8">
      <Brand />
      <nav aria-label="منوی اصلی" className="hidden items-center gap-1 lg:flex">{links}</nav>
      <div className="flex items-center gap-2">
        <ContactButton href={contact.phone ? `tel:${contact.phone}` : null} className="!px-2.5 !py-2.5 sm:!px-4"><Phone size={16} aria-hidden="true" /><span className="text-xs sm:text-sm">تماس فوری</span></ContactButton>
        <button ref={toggle} type="button" aria-label={open ? 'بستن منو' : 'باز کردن منو'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="rounded-lg p-2 text-navy hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-teal lg:hidden">{open ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
    </div>
    <nav id="mobile-menu" aria-label="منوی موبایل" hidden={!open} className="absolute inset-x-0 top-full border-b border-slate-200 bg-white px-4 py-3 shadow-lg lg:hidden"><div className="mx-auto flex max-w-[1200px] flex-col">{links}</div></nav>
  </header>;
}
