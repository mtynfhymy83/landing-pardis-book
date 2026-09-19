export function SectionHeading({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return <div className="mb-5 text-center">
    <h2 id={id} className="text-xl leading-relaxed font-extrabold tracking-tight text-ink sm:text-2xl">{title}</h2>
    {subtitle && <p className="mt-1 text-xs leading-6 text-muted sm:text-sm">{subtitle}</p>}
  </div>;
}
