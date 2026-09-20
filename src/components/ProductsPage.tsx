import { ArrowRight, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { ProductCollection } from './ProductCollection';
import { TopBar } from './TopBar';

export function ProductsPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    document.title = 'محصولات | کتابسرای پردیس';
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim().length >= 2 ? search.trim() : ''), 400);
    return () => window.clearTimeout(timer);
  }, [search]);

  return <div id="home" className="min-h-screen bg-[#f8fbfd] font-sans text-ink antialiased">
    <a href="#main" className="sr-only z-50 rounded bg-white p-3 text-ink focus:fixed focus:top-2 focus:right-2 focus:not-sr-only">رفتن به محتوای اصلی</a>
    <TopBar />
    <Header />
    <main id="main" className="mx-auto min-h-[70vh] max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
      <a href="/" className="inline-flex items-center gap-2 rounded-lg text-sm font-bold text-teal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"><ArrowRight size={18} aria-hidden="true" />بازگشت به صفحه اصلی</a>
      <div className="mt-5 flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div><h1 className="text-3xl font-black tracking-tight sm:text-4xl">محصولات</h1><p className="mt-2 text-sm leading-7 text-muted">کتاب مورد نظرتان را میان عناوین پرفروش پیدا کنید.</p></div>
        <div className="w-full lg:max-w-md">
          <label htmlFor="product-search" className="mb-2 block text-sm font-bold">جست‌وجوی کتاب</label>
          <div className="relative"><Search size={20} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted" aria-hidden="true" /><input id="product-search" type="text" role="searchbox" value={search} onChange={event => setSearch(event.target.value)} placeholder="مثلاً Family یا فمیلی" className="min-h-12 w-full rounded-xl border border-slate-300 bg-white pr-11 pl-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal focus:ring-3 focus:ring-teal/10" />{search && <button type="button" onClick={() => setSearch('')} aria-label="پاک کردن جست‌وجو" className="absolute top-1/2 left-3 -translate-y-1/2 rounded p-1 text-muted hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-teal"><X size={17} /></button>}</div>
          {search.trim().length === 1 && <p className="mt-1.5 text-xs text-muted">برای جست‌وجو حداقل ۲ کاراکتر وارد کنید.</p>}
        </div>
      </div>
      <div className="pt-6"><ProductCollection limit={60} query={debouncedSearch} columns="sm:grid-cols-2 lg:grid-cols-3" /></div>
    </main>
    <Footer />
  </div>;
}
