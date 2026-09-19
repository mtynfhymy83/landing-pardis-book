import { ChevronDown, ChevronLeft } from 'lucide-react';
import { formatNumber, orderSteps } from '../data/site';
import { SectionHeading } from './SectionHeading';

export function OrderProcess() {
  return <section id="order-process" aria-labelledby="order-title" className="mx-auto max-w-[1200px] scroll-mt-6 px-4 pt-7 pb-5 sm:px-6 lg:px-8">
    <SectionHeading id="order-title" title="روند ثبت سفارش" />
    <ol className="grid gap-7 lg:grid-cols-4 lg:gap-8">{orderSteps.map((step, index) => <li key={step.title} className="relative flex items-center gap-3 rounded-xl border border-[#e5edf4] bg-white px-4 py-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-l from-[#00737c] to-[#00a1a8] text-xl font-extrabold text-white">{formatNumber(index + 1)}</span>
      <div><h3 className="text-sm font-bold">{step.title}</h3><p className="mt-1 text-[11px] leading-5 text-muted">{step.description}</p></div>
      {index < orderSteps.length - 1 && <><ChevronLeft aria-hidden="true" size={20} className="absolute top-1/2 -left-[27px] hidden -translate-y-1/2 text-muted lg:block" /><ChevronDown aria-hidden="true" size={19} className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-muted lg:hidden" /></>}
    </li>)}</ol>
  </section>;
}
