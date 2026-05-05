type SectionHeaderProps = {
  id?: string;
  label: string;
  marker: string;
};

export function SectionHeader({ id, label, marker }: SectionHeaderProps) {
  return (
    <div
      id={id}
      data-scroll-anchor={id ? "true" : undefined}
      className="mb-10 flex items-center justify-between gap-4 text-[length:var(--label)] uppercase tracking-[0.35em] text-muted md:mb-16"
    >
      <span>© {label}</span>
      <span>{marker}</span>
    </div>
  );
}
