import { AlertTriangle, LibraryBig, Phone } from 'lucide-react';
import { contact } from '../data/site';
import { ContactButton } from './ContactButton';

export function UrgencyBanner() {
  return <aside aria-label="اطلاع‌رسانی موجودی" className="mx-auto max-w-[1200px] px-4 pb-6 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center gap-4 rounded-xl bg-[#fff2f2] px-5 py-5 text-center text-[#ed3937] lg:flex-row lg:gap-6 lg:text-right">
      <div className="flex shrink-0 items-center gap-4"><div className="text-sm font-extrabold">فرصت محدود<p className="mt-1 font-medium">برای خرید عمده</p></div><LibraryBig size={43} className="text-[#bdb9b9]" aria-hidden="true" /></div>
      <div className="flex flex-1 items-center justify-center gap-4 lg:border-r lg:border-red-200 lg:pr-5"><AlertTriangle size={36} className="hidden shrink-0 sm:block" aria-hidden="true" /><div><h2 className="text-base font-extrabold sm:text-lg">موجودی برخی عناوین محدود است</h2><p className="mt-1 text-xs leading-6 sm:text-sm">برای دریافت قیمت همکاری و رزرو موجودی همین امروز تماس بگیرید</p></div></div>
      <ContactButton href={contact.phone ? `tel:${contact.phone}` : null} className="w-full !border-[#ff4e43] !from-[#f03936] !to-[#ff5549] sm:w-auto"><Phone size={17} aria-hidden="true" />تماس با واحد فروش</ContactButton>
    </div>
  </aside>;
}
