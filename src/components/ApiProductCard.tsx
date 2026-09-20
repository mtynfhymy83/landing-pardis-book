import { AlertTriangle, BookOpen, Package, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { formatNumber } from '../data/site';
import type { BestSellingProduct } from '../services/products';

export function ApiProductCard({ product }: { product: BestSellingProduct }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasDiscount = product.discountedPrice < product.price;

  return <article aria-labelledby={`product-${product.id}`} className="flex min-w-0 flex-col rounded-xl border border-[#e7edf3] bg-white p-3.5 shadow-[0_3px_14px_rgba(16,57,85,0.04)] transition-shadow hover:shadow-md">
    <div className="flex flex-1 items-start gap-4 md:flex-col md:items-center lg:flex-row lg:gap-3">
      <div className="min-w-0 flex-1 pt-1 md:order-2 md:w-full lg:order-1">
        <h3 id={`product-${product.id}`} dir="auto" className="text-right text-lg leading-tight font-extrabold tracking-tight">{product.title}</h3>
        <p className="mt-2 flex items-center gap-1 text-[11px] leading-5 text-muted"><Package size={15} aria-hidden="true" />مناسب سفارش آموزشگاه‌ها</p>
        <div className="mt-4 flex min-h-7 flex-wrap items-center justify-between gap-1.5">
          {product.discountPercent > 0 && <span className="rounded-lg bg-[#fb463e] px-2 py-1 text-[11px] font-bold text-white">{formatNumber(product.discountPercent)}٪ تخفیف</span>}
          {hasDiscount && <del className="text-[11px] text-muted">{formatNumber(product.price)} تومان</del>}
        </div>
        <p className="mt-1.5 whitespace-nowrap text-2xl font-black tracking-tight"><bdi>{formatNumber(product.discountedPrice)}</bdi> <span className="text-sm font-bold">تومان</span></p>
        <span className="mt-1 inline-block rounded-md bg-[#fff0df] px-2 py-0.5 text-[11px] font-bold text-[#df652d]">قیمت عمده</span>
      </div>
      <div className="flex aspect-[0.72] w-[95px] shrink-0 items-center justify-center overflow-hidden rounded-sm bg-gradient-to-br from-[#edf5f8] to-[#dce8ef] py-2 shadow-lg md:order-1 md:w-[104px] lg:order-2 lg:w-[94px] xl:w-[110px]">
        {product.coverUrl && !imageFailed
          ? <img src={product.coverUrl} alt={product.coverAlt ?? `جلد کتاب ${product.title}`} loading="lazy" onError={() => setImageFailed(true)} className="h-full w-full object-cover" />
          : <div role="img" aria-label={`تصویر جایگزین جلد ${product.title}`} className="flex flex-col items-center gap-2 px-2 text-center text-navy/55"><BookOpen size={38} strokeWidth={1.5} aria-hidden="true" /><span className="line-clamp-3 text-[9px] font-bold">{product.title}</span></div>}
      </div>
    </div>
    <div className="mt-4 flex items-center gap-3 rounded-full bg-[#fff5f2] px-2 py-1">
      <span className="flex items-center gap-1 whitespace-nowrap text-[11px] font-bold text-[#f04d42]"><AlertTriangle size={14} aria-hidden="true" />{product.remainingPercent > 0 ? `${formatNumber(product.remainingPercent)}٪ مانده` : 'ناموجود'}</span>
      <progress aria-label={`درصد موجودی ${product.title}`} max={100} value={product.remainingPercent} className="h-1.5 min-w-0 flex-1 accent-[#ff564c]" />
    </div>
    <a href="/#contact" aria-label={`استعلام و سفارش ${product.title}`} className="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-l from-navy to-[#164767] px-3 py-2 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"><ShoppingCart size={18} aria-hidden="true" />استعلام و سفارش</a>
  </article>;
}
