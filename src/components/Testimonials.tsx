import { Quote } from 'lucide-react';
import { testimonials } from '../data/site';
import { SectionHeading } from './SectionHeading';

export function Testimonials() {
  return <section aria-labelledby="testimonials-title" className="mx-auto max-w-[1200px] px-4 pb-8 sm:px-6 lg:px-8">
    <SectionHeading id="testimonials-title" title="نظر مدیران آموزشگاه‌ها" subtitle="اعتماد شما، بزرگ‌ترین سرمایه ماست" />
    <div className="grid gap-4 md:grid-cols-3">{testimonials.map(item => <figure key={item.name} className="flex flex-col rounded-xl border border-[#e7edf3] bg-white p-4 shadow-[0_3px_14px_rgba(16,57,85,0.03)]">
      <div className="flex flex-1 items-start gap-3"><Quote size={28} fill="currentColor" strokeWidth={0} className="shrink-0 text-[#d0d8e2]" aria-hidden="true" /><blockquote className="text-xs leading-6 text-[#6c7b92]">{item.text}</blockquote></div>
      <figcaption className="mt-4 flex items-center gap-2"><span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#dce8ed] bg-[#edf5f5] text-xs font-bold text-teal">{item.initials}</span><div><p className="text-xs font-bold">{item.name}</p><p className="mt-1 text-[10px] text-muted">{item.role}</p></div></figcaption>
    </figure>)}</div>
    <p className="mt-3 text-center text-[10px] text-muted">نظرات بالا نمونه محتوای نمایشی هستند.</p>
  </section>;
}
