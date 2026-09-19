import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/site';

function AccordionItem({ item, open, onToggle }: { item: typeof faqs[number]; open: boolean; onToggle: () => void }) {
  return <div className="self-start overflow-hidden rounded-lg border border-[#e3eaf1] bg-white">
    <h3><button id={`faq-trigger-${item.id}`} type="button" aria-expanded={open} aria-controls={`faq-panel-${item.id}`} onClick={onToggle} className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-right text-xs leading-6 font-semibold transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal"><span>{item.question}</span><ChevronDown aria-hidden="true" size={17} className={`shrink-0 transition-transform motion-reduce:transition-none ${open ? 'rotate-180 text-teal' : ''}`} /></button></h3>
    <div id={`faq-panel-${item.id}`} role="region" aria-labelledby={`faq-trigger-${item.id}`} hidden={!open} className="border-t border-slate-100 px-4 py-3 text-xs leading-7 text-muted">{item.answer}</div>
  </div>;
}

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  return <section id="faq" aria-labelledby="faq-title" className="mx-auto grid max-w-[1200px] scroll-mt-6 gap-5 px-4 pb-6 sm:px-6 lg:grid-cols-[180px_1fr] lg:px-8">
    <div className="text-center lg:pt-1 lg:text-right"><h2 id="faq-title" className="text-xl font-extrabold">سوالات متداول</h2><p className="mt-2 text-xs leading-6 text-muted">پاسخ به سوالات پرتکرار<br className="hidden lg:block" /> آموزشگاه‌های زبان</p></div>
    <div className="grid items-start gap-3 md:grid-cols-2">{faqs.map(item => <AccordionItem key={item.id} item={item} open={openId === item.id} onToggle={() => setOpenId(current => current === item.id ? null : item.id)} />)}</div>
  </section>;
}
