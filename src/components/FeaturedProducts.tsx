import { AlertTriangle, Package, ShoppingCart } from 'lucide-react';
import { books, formatNumber, products } from '../data/site';
import { BookCover } from './BookDisplay';
import { SectionHeading } from './SectionHeading';

function ProductCard({ product }: { product: typeof products[number] }) {
  const book = books.find(item => item.id === product.bookId)!;
  return <article aria-labelledby={`product-${book.id}`} className="flex min-w-0 flex-col rounded-xl border border-[#e7edf3] bg-white p-3.5 shadow-[0_3px_14px_rgba(16,57,85,0.04)] transition-shadow hover:shadow-md">
    <div className="flex flex-1 items-start gap-4 md:flex-col md:items-center lg:flex-row lg:gap-3">
      <div className="min-w-0 flex-1 pt-1 md:w-full md:order-2 lg:order-1">
        <h3 id={`product-${book.id}`} dir="ltr" className="text-right text-lg leading-tight font-extrabold tracking-tight">{book.title}</h3>
        <p className="mt-2 text-[11px] leading-5 text-muted">{product.audience}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-1.5">
          <span className="rounded-lg bg-[#fb463e] px-2 py-1 text-[11px] font-bold text-white">{formatNumber(product.discount)}٪ تخفیف</span>
          <del className="text-[11px] text-muted">{formatNumber(product.originalPrice)} تومان</del>
        </div>
        <p className="mt-1.5 whitespace-nowrap text-2xl font-black tracking-tight"><bdi>{formatNumber(product.price)}</bdi> <span className="text-sm font-bold">تومان</span></p>
        <span className="mt-1 inline-block rounded-md bg-[#fff0df] px-2 py-0.5 text-[11px] font-bold text-[#df652d]">قیمت عمده</span>
        <p className="mt-3 flex items-center gap-1 text-[10px] text-muted"><Package size={15} aria-hidden="true" />مناسب سفارش آموزشگاه‌ها</p>
      </div>
      <div className="w-[95px] shrink-0 py-2 md:order-1 md:w-[104px] lg:order-2 lg:w-[94px] xl:w-[110px]"><BookCover book={book} compact /></div>
    </div>
    <div className="mt-4 flex items-center gap-3 rounded-full bg-[#fff5f2] px-2 py-1">
      <span className="flex items-center gap-1 whitespace-nowrap text-[11px] font-bold text-[#f04d42]"><AlertTriangle size={14} aria-hidden="true" />موجودی محدود</span>
      <div aria-hidden="true" dir="ltr" className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#fbdac9]"><div className="h-full rounded-full bg-gradient-to-r from-[#ff302e] to-[#ff9d79]" style={{ width: `${product.stockIndicator}%` }} /></div>
    </div>
    <a href="#contact" aria-label={`استعلام و سفارش ${book.title}`} className="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-l from-navy to-[#164767] px-3 py-2 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"><ShoppingCart size={18} aria-hidden="true" />استعلام و سفارش</a>
  </article>;
}

export function FeaturedProducts() {
  return <section id="products" aria-labelledby="products-title" className="mx-auto max-w-[1200px] scroll-mt-6 px-4 py-7 sm:px-6 lg:px-8">
    <SectionHeading id="products-title" title="پرفروش‌ترین عناوین کمپین" subtitle="محبوب‌ترین سری‌های آموزش زبان با بهترین قیمت عمده" />
    <div className="grid gap-4 md:grid-cols-3">{products.map(product => <ProductCard key={product.bookId} product={product} />)}</div>
    <p className="mt-3 text-center text-[10px] text-muted">قیمت‌ها و وضعیت موجودی نمونه‌اند؛ قیمت روز و موجودی نهایی را از واحد فروش استعلام کنید.</p>
  </section>;
}
