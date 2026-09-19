import { Check, Heart, Package, Phone, Send, Tag, Truck, UsersRound } from 'lucide-react';
import { contact } from '../data/site';
import { ContactButton } from './ContactButton';
import { BookDisplay } from './BookDisplay';

const benefits = [{ label: 'ارسال سریع', icon: Truck }, { label: 'فروش عمده', icon: Package }, { label: 'مناسب آموزشگاه‌ها', icon: UsersRound }, { label: 'قیمت پایین‌تر', icon: Tag }];

export function Hero() {
  return <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-l from-white via-white to-[#edf0ef]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent" />
    <div className="relative mx-auto grid max-w-[1200px] items-center gap-1 px-4 pt-3 pb-6 sm:px-6 lg:grid-cols-2 lg:gap-5 lg:px-8 lg:pt-6 lg:pb-3">
      <div className="order-2 min-w-0 pb-2 lg:order-1 lg:py-4">
        <p className="mb-4 inline-flex rounded-full bg-[#edf1f5] px-3 py-1.5 text-[11px] font-semibold text-[#52627b] sm:text-xs">انتخاب مطمئن آموزشگاه‌های زبان در سراسر ایران</p>
        <h1 id="hero-title" className="text-[30px] leading-[1.65] font-black tracking-tight text-ink sm:text-[40px] lg:text-[39px] xl:text-[44px]">خرید عمده کتاب‌های زبان<br /><span>با <span className="text-teal">قیمت همکاری</span></span></h1>
        <p className="mt-2 text-sm leading-8 font-medium text-[#4d607a] sm:text-base">تأمین ویژه آموزشگاه‌های زبان با <strong className="font-extrabold text-ink">تخفیف تا ۶۵٪</strong>، فروش شرایطی با چک و ارسال سریع</p>
        <p className="mt-3 text-xs leading-7 font-medium text-[#4d607a] sm:text-sm">سری‌های پرتقاضا: <bdi dir="ltr">Family and Friends، First Friends، Top Notch</bdi></p>
        <div className="mt-3">
          <ContactButton href={contact.phone ? `tel:${contact.phone}` : null} className="w-full !py-3.5 sm:!text-base"><Phone size={20} fill="currentColor" aria-hidden="true" />تماس تلفنی برای ثبت سفارش</ContactButton>
          <div className="mt-2.5 grid grid-cols-2 gap-3">
            <ContactButton href={contact.eitaa} variant="secondary" className="!py-2.5"><span className="flex size-6 items-center justify-center rounded-md bg-[#ff681b] text-white"><Send size={17} aria-hidden="true" /></span>پیام در ایتا</ContactButton>
            <ContactButton href={contact.bale} variant="secondary" className="!py-2.5"><span className="relative flex size-6 items-center justify-center rounded-full bg-[#0086a5] text-white"><Heart size={17} fill="white" aria-hidden="true" /><Check size={10} className="absolute text-[#0086a5]" aria-hidden="true" /></span>پیام در بله</ContactButton>
          </div>
          <p className="mt-2 text-[10px] text-muted">اطلاعات تماس به‌زودی تکمیل می‌شود.</p>
        </div>
        <ul aria-label="مزایای خرید" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:gap-1.5">{benefits.map(({ label, icon: Icon }) => <li key={label} className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e8eef4] bg-white/80 px-2 py-2.5 text-[11px] font-medium text-[#52627b]"><Icon size={20} strokeWidth={1.8} className="shrink-0 text-teal" aria-hidden="true" />{label}</li>)}</ul>
      </div>
      <div className="order-1 min-w-0 lg:order-2"><BookDisplay /></div>
    </div>
  </section>;
}
