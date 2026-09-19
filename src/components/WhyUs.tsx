import { Package, ReceiptText, Tag, Truck } from 'lucide-react';
import { advantages } from '../data/site';
import { SectionHeading } from './SectionHeading';

const icons = { tag: Tag, receipt: ReceiptText, package: Package, truck: Truck };

export function WhyUs() {
  return <section aria-labelledby="why-title" className="bg-[#f0f5f8] py-6">
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <SectionHeading id="why-title" title="چرا آموزشگاه‌ها از کتابسرای پردیس خرید می‌کنند؟" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{advantages.map(item => {
        const Icon = icons[item.icon];
        return <article key={item.title} className="rounded-xl border border-white bg-white px-4 py-5 text-center">
          <Icon size={34} strokeWidth={1.8} className="mx-auto mb-3 text-teal" aria-hidden="true" />
          <h3 className="text-sm font-extrabold sm:text-base">{item.title}</h3>
          <p className="mx-auto mt-2 max-w-48 text-xs leading-6 text-muted">{item.description}</p>
        </article>;
      })}</div>
    </div>
  </section>;
}
