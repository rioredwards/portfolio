interface ListPageHeaderProps {
  title: string;
  subtitle: string;
}

export function ListPageHeader({ title, subtitle }: ListPageHeaderProps) {
  return (
    <header className="mb-5 md:mb-6">
      <h1 className="font-mazaeni text-4xl leading-none text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-1.5 max-w-prose-max text-sm tracking-wide text-secondary-foreground/70 sm:text-[0.95rem]">
        {subtitle}
      </p>
    </header>
  );
}
