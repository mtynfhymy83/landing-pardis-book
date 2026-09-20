import { Phone } from 'lucide-react';
import { contact } from '../data/site';
import { Brand } from './Brand';
import { ContactButton } from './ContactButton';

export function CTABar() {
  return <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-[1232px] scroll-mt-6 px-4 pb-5 sm:px-6 lg:px-8">
    <div className="grid overflow-hidden rounded-2xl border border-[#dfe8f0] bg-gradient-to-l from-[#edf3f9] to-[#dae6f2] lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col items-center justify-center gap-6 px-5 py-6 sm:flex-row lg:flex-col lg:gap-4 xl:flex-row">
        <Brand />
        <div className="space-y-4">
          <div className="flex flex-row-reverse items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white bg-white/70 text-navy shadow-sm"><Phone size={19} aria-hidden="true" /></span>
            <div className="text-left"><a dir="ltr" href={`tel:${contact.mobile}`} className="whitespace-nowrap rounded text-base font-extrabold focus-visible:outline-2 focus-visible:outline-teal">{contact.mobile}</a><p className="mt-0.5 text-[10px] text-muted">شماره تماس</p></div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-l from-[#1c5275] to-[#0b3352] px-5 py-6 text-center text-white lg:rounded-r-[48px] lg:px-7 lg:text-right">
        <h2 id="contact-title" className="text-lg leading-8 font-extrabold">برای دریافت لیست قیمت و ثبت سفارش عمده تماس بگیرید</h2>
        <p className="mt-1 text-xs leading-6 text-[#d2deec]">کارشناسان ما آماده پاسخگویی به شما هستند.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><ContactButton href={contact.phone ? `tel:${contact.phone}` : null} className="!border-[#7dc7d0]"><Phone size={17} aria-hidden="true" />تماس تلفنی</ContactButton><ContactButton href={contact.eitaa} variant="secondary" className="!bg-white !text-[#f36524]"><img src="/messengers/eitaa.png" alt="" className="size-[18px] object-contain" />پیام در ایتا</ContactButton><ContactButton href={contact.bale} variant="secondary" className="!bg-white"><img src="/messengers/bale.svg" alt="" className="size-[18px] rounded object-contain" />پیام در بله</ContactButton></div>
        {(!contact.bale || !contact.eitaa) && <p className="mt-2 text-[10px] text-[#d2deec]">لینک پیام‌رسان‌ها پس از تکمیل اطلاعات فعال می‌شود.</p>}
      </div>
    </div>
  </section>;
}
