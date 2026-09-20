import { ArrowLeft } from 'lucide-react';
import { ProductCollection } from './ProductCollection';
import { SectionHeading } from './SectionHeading';

export function FeaturedProducts() {
  return <section id="products" aria-labelledby="products-title" className="mx-auto max-w-[1200px] scroll-mt-6 px-4 py-7 sm:px-6 lg:px-8">
    <SectionHeading id="products-title" title="محصولات" subtitle="پرفروش‌ترین کتاب‌های آموزش زبان با قیمت همکاری" />
    <ProductCollection limit={3} />
    <div className="mt-6 text-center"><a href="/products" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-navy px-6 py-2.5 text-sm font-extrabold text-navy transition hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">مشاهده همه محصولات<ArrowLeft size={18} aria-hidden="true" /></a></div>
  </section>;
}
