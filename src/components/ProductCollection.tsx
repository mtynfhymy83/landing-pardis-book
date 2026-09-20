import { AlertCircle, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getBestSellingProducts, searchBestSellingProducts, type BestSellingProduct } from '../services/products';
import { ApiProductCard } from './ApiProductCard';

export function ProductCollection({ limit, query = '', columns = 'md:grid-cols-3' }: { limit: number; query?: string; columns?: string }) {
  const [products, setProducts] = useState<BestSellingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    const request = query.trim().length >= 2
      ? searchBestSellingProducts(query, limit, controller.signal)
      : getBestSellingProducts(limit, controller.signal);

    request.then(setProducts).catch(reason => {
      if (reason instanceof DOMException && reason.name === 'AbortError') return;
      setError(reason instanceof Error ? reason.message : 'ارتباط با سرور برقرار نشد');
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [limit, query, retry]);

  if (loading) return <div aria-label="در حال دریافت محصولات" aria-busy="true" className={`grid gap-4 ${columns}`}>{Array.from({ length: Math.min(limit, 8) }, (_, index) => <div key={index} className="h-[330px] animate-pulse rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100" />)}</div>;

  if (error) return <div role="alert" className="rounded-2xl border border-red-100 bg-red-50 px-5 py-8 text-center"><AlertCircle size={34} className="mx-auto text-[#ef4c43]" aria-hidden="true" /><p className="mt-3 font-bold text-ink">{error}</p><button type="button" onClick={() => setRetry(value => value + 1)} className="mx-auto mt-4 inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"><RefreshCw size={17} aria-hidden="true" />تلاش مجدد</button></div>;

  if (products.length === 0) return <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center font-bold text-muted">کتابی پیدا نشد</p>;

  return <div className={`grid gap-4 ${columns}`}>{products.map(product => <ApiProductCard key={product.id} product={product} />)}</div>;
}
