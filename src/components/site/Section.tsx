import type { ReactNode } from 'react';

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t pt-6 print:pt-4">
      <h2 id={id} className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="mt-5 flex flex-col gap-7 print:mt-3 print:gap-4">{children}</div>
    </section>
  );
}

/** Text that becomes an underlined link when it has an href. */
export function MaybeLink({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <>{children}</>;
  const external = !href.startsWith('mailto:');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
    </a>
  );
}

interface ItemProps {
  title: string;
  titleHref?: string;
  /** Shown after the title, e.g. the company. */
  subtitle?: string;
  subtitleHref?: string;
  /** Small labels under the title, joined with " · ". */
  meta?: string[];
  date?: string;
  summary?: string;
  stack?: string[];
}

export function Item({ title, titleHref, subtitle, subtitleHref, meta = [], date, summary, stack = [] }: ItemProps) {
  return (
    <article className="flex flex-col gap-1.5 print:gap-0.5">
      <div className="flex flex-col gap-x-6 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between print:flex-row print:items-baseline print:justify-between">
        <h3 className="font-semibold leading-snug">
          <MaybeLink href={titleHref}>{title}</MaybeLink>
          {subtitle && (
            <span className="font-normal text-muted-foreground">
              {' · '}
              <MaybeLink href={subtitleHref}>{subtitle}</MaybeLink>
            </span>
          )}
        </h3>
        {date && <p className="shrink-0 text-sm tabular-nums text-muted-foreground">{date}</p>}
      </div>
      {meta.length > 0 && <p className="text-sm text-muted-foreground">{meta.join(' · ')}</p>}
      {summary && <p className="max-w-2xl text-[0.9375rem] leading-relaxed">{summary}</p>}
      {stack.length > 0 && <p className="font-mono text-xs text-muted-foreground">{stack.join(' · ')}</p>}
    </article>
  );
}
