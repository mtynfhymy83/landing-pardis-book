import { AlarmClock, Megaphone } from 'lucide-react';

export function TopBar() {
  return <div className="bg-navy text-white">
    <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-4 px-4 py-2.5 text-[10px] font-semibold sm:px-6 sm:text-xs lg:px-8">
      <span className="hidden items-center gap-1.5 text-[#f4c34f] lg:flex"><AlarmClock size={16} aria-hidden="true" />فرصت را از دست ندهید!</span>
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center lg:flex-1"><span>فروش ویژه عمده کتاب‌های زبان</span><span aria-hidden="true" className="text-white/40">|</span><span className="text-[#ffd064]">تا ۶۵٪ تخفیف</span><span aria-hidden="true" className="text-white/40">|</span><span>فروش شرایطی با چک</span><span className="inline-flex items-center gap-1 text-[#ff8071]"><Megaphone size={15} className="text-[#ffd064]" aria-hidden="true" />موجودی محدود</span></p>
      <span className="hidden w-36 lg:block" aria-hidden="true" />
    </div>
  </div>;
}
