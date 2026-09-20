import { Heart } from 'lucide-react';
import { navigation } from '../data/site';

export function Footer() {
  const onHomepage = window.location.pathname === '/';
  return <footer className="border-t border-[#e9eff5] bg-[#f8fbfd]">
    <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-6 text-[11px] text-muted sm:px-6 lg:flex-row lg:px-8">
      <p className="flex items-center gap-2 text-[#52627b]"><Heart size={17} fill="currentColor" aria-hidden="true" />کتاب خوب، آینده روشن</p>
      <nav aria-label="لینک‌های پایین صفحه" className="flex flex-wrap justify-center gap-x-3 gap-y-2">{navigation.map(item => <a key={item.href} href={onHomepage ? item.href : `/${item.href}`} className="rounded px-1 py-1 hover:text-teal focus-visible:outline-2 focus-visible:outline-teal">{item.label}</a>)}</nav>
      <p className="text-center text-[10px]">© کتابسرای پردیس. تمامی حقوق محفوظ است.</p>
    </div>
  </footer>;
}
