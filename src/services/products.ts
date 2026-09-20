export type BestSellingProduct = {
  id: string;
  title: string;
  coverUrl: string;
  coverAlt: string | null;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  remainingPercent: number;
};

type ApiResponse<T> = {
  data: T;
  meta: { requestId: string; serverTime: string };
};

const API_BASE_URL = '/api/v1';

const numberOr = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

function normalizeProduct(value: unknown): BestSellingProduct | null {
  if (!value || typeof value !== 'object') return null;
  const item = value as Record<string, unknown>;
  const sku = item.defaultSku && typeof item.defaultSku === 'object' ? item.defaultSku as Record<string, unknown> : {};
  const cover = item.cover && typeof item.cover === 'object' ? item.cover as Record<string, unknown> : {};
  const title = typeof item.title === 'string' ? item.title : '';
  if (!title) return null;

  const price = numberOr(item.price, numberOr(sku.referenceUnitPrice, numberOr(sku.startingUnitPrice)));
  const discountedPrice = numberOr(item.discountedPrice, numberOr(sku.startingUnitPrice, price));
  const calculatedDiscount = price > discountedPrice && price > 0 ? Math.round((1 - discountedPrice / price) * 100) : 0;
  const availability = typeof sku.availability === 'string' ? sku.availability : '';
  const rawCover = item.coverUrl ?? cover.url ?? cover.publicUrl;

  return {
    id: String(item.id ?? item.slug ?? title),
    title,
    coverUrl: typeof rawCover === 'string' ? rawCover : '',
    coverAlt: typeof item.coverAlt === 'string' ? item.coverAlt : `جلد کتاب ${title}`,
    price,
    discountedPrice,
    discountPercent: numberOr(item.discountPercent, calculatedDiscount),
    remainingPercent: Math.min(100, Math.max(0, numberOr(item.remainingPercent, availability === 'in_stock' ? 100 : 0))),
  };
}

async function requestProducts(path: string, signal?: AbortSignal): Promise<BestSellingProduct[]> {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) {
    let message = 'دریافت محصولات ناموفق بود';
    try {
      const body = await response.json() as { error?: { message?: string } };
      if (body.error?.message) message = body.error.message;
    } catch { /* پاسخ خطا ممکن است JSON نباشد. */ }
    const error = new Error(message) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  const result = await response.json() as ApiResponse<unknown[]>;
  return Array.isArray(result.data)
    ? result.data.map(normalizeProduct).filter((item): item is BestSellingProduct => item !== null)
    : [];
}

export function getBestSellingProducts(limit = 12, signal?: AbortSignal) {
  const safeLimit = Math.min(60, Math.max(1, limit));
  return requestProducts(`/products/best-selling?limit=${safeLimit}`, signal);
}

export async function searchBestSellingProducts(query: string, limit = 12, signal?: AbortSignal) {
  const normalizedQuery = query.trim();
  if (normalizedQuery.length < 2) return [];
  const safeLimit = Math.min(60, Math.max(1, limit));
  const params = new URLSearchParams({ q: normalizedQuery, limit: String(safeLimit) });

  try {
    return await requestProducts(`/products/best-selling/search?${params}`, signal);
  } catch (error) {
    if ((error as Error & { status?: number }).status !== 404) throw error;
    const products = await getBestSellingProducts(60, signal);
    const searchTerm = normalizedQuery.toLocaleLowerCase('fa');
    return products.filter(product => product.title.toLocaleLowerCase('fa').includes(searchTerm)).slice(0, safeLimit);
  }
}
