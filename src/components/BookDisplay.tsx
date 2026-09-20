import { books, type Book } from '../data/site';

export function BookCover({ book, index = 0, compact = false }: { book: Book; index?: number; compact?: boolean }) {
  return <div className={`relative shrink-0 ${compact ? 'w-full -rotate-3' : `w-[30%] ${index === 0 ? 'z-10 translate-y-3 -rotate-3' : index === 1 ? 'z-20 -rotate-2' : 'z-10 rotate-1'}`}`}>
    {book.cover ? <img src={book.cover} alt={`جلد ${book.title}`} loading="eager" decoding="async" fetchPriority="high" className="h-auto w-full rounded-sm object-contain shadow-xl" /> : <div dir="ltr" role="img" aria-label={`جای‌نگهدار جلد ${book.title}`} className={`relative aspect-[0.59] overflow-hidden rounded-r-sm border-l-[5px] border-black/20 bg-gradient-to-br shadow-[8px_14px_22px_-10px_rgba(15,40,60,0.5)] ${book.palette}`}>
      <div className="absolute inset-y-0 left-1 w-px bg-white/25" />
      <div className={`relative z-10 ${compact ? 'px-2 pt-4' : 'px-3 pt-5 sm:px-4 sm:pt-7'}`}>
        <p className={`${compact ? 'text-[15px]' : 'text-[clamp(16px,3.4vw,30px)]'} max-w-28 leading-[1.02] font-extrabold tracking-tight`}>{book.title}</p>
        <p className={`mt-2 ${compact ? 'text-[6px]' : 'text-[clamp(7px,1vw,10px)]'} leading-snug opacity-85`}>{book.subtitle}</p>
      </div>
      <div className={`absolute -right-[40%] bottom-[-24%] h-[82%] w-[150%] -rotate-25 rounded-t-full border-[12px] border-white/35 bg-gradient-to-br sm:border-[18px] ${book.art}`}><div className="absolute inset-4 rounded-t-full border-[10px] border-white/35 sm:inset-6 sm:border-[16px]" /></div>
      <p className={`absolute right-2 bottom-4 left-3 z-10 max-w-20 leading-relaxed ${compact ? 'text-[6px]' : 'text-[8px] sm:text-[10px]'}`}>{book.caption}</p>
      <span className="absolute top-0 right-0 bottom-0 w-1 bg-black/10" />
    </div>}
  </div>;
}

export function BookDisplay() {
  return <div className="relative isolate mx-auto flex min-h-[340px] w-full max-w-[530px] items-end px-3 pt-20 pb-10 sm:min-h-[420px] sm:px-5 lg:min-h-[450px] lg:pt-24" aria-label="مجموعه کتاب‌های زبان">
    <div aria-hidden="true" className="absolute inset-x-1 bottom-2 -z-10 h-20 rounded-[50%] bg-slate-400/15 blur-xl" />
    <div aria-hidden="true" className="absolute top-3 left-2 -z-10 h-36 w-24 -rotate-35 rounded-full bg-[#728e53]/15 blur-2xl" />
    <div dir="ltr" className="flex w-full items-end justify-center gap-3 sm:gap-4">{books.map((book, index) => <BookCover key={book.id} book={book} index={index} />)}</div>
    <div className="absolute top-3 left-5 z-30 flex size-[108px] -rotate-12 flex-col items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-[#ff5449] to-[#ed2728] text-white shadow-lg sm:top-5 sm:left-8 sm:size-[130px]">
      <span className="text-2xl leading-tight font-black sm:text-3xl">تا ۶۵٪</span><span className="text-xl font-extrabold sm:text-2xl">تخفیف</span><span className="absolute -bottom-2 whitespace-nowrap rounded-md bg-white px-3 py-1 text-xs font-extrabold text-[#ef3934] shadow-sm sm:text-sm">موجودی محدود</span>
    </div>
  </div>;
}
