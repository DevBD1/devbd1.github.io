import { ArrowUpRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { ProjectStatus } from '@/lib/content';
import type { Entry } from '@/lib/timeline';
import { cn } from '@/lib/utils';

const statusDot: Record<ProjectStatus, string> = {
  live: 'bg-emerald-400',
  beta: 'bg-tone',
  building: 'bg-amber-300',
  planned: 'border border-current',
  paused: 'bg-muted-foreground',
  archived: 'bg-muted-foreground/60',
};

const lifeVariants = new Set(['edu', 'work', 'cert']);

interface EntryCardProps {
  entry: Entry;
  /** True when the card sits on a set's tinted background. */
  onSet?: boolean;
}

export function EntryCard({ entry, onSet = false }: EntryCardProps) {
  const { variant, href } = entry;
  const external = !!href && !href.startsWith('mailto:');
  const isLife = lifeVariants.has(variant);

  const card = (
    <Card
      className={cn(
        `tone-${entry.tone}`,
        'gap-1.5 rounded-xl px-3.5 py-3 shadow-none transition-colors',
        variant === 'project' && (onSet ? 'border-tone-line bg-background' : 'bg-card'),
        variant === 'planned' && 'border-[1.5px] border-dashed border-tone-line bg-transparent',
        (variant === 'open' || variant === 'founded') && 'border-tone-line bg-tone-soft',
        isLife && 'border-tone-line/70 bg-card',
        href && 'group-hover:border-tone group-focus-visible:border-tone',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className={cn('text-[15px] font-semibold leading-snug', variant === 'open' && 'text-tone-fg')}>
          {entry.title}
        </h4>
        {href && (
          <ArrowUpRight
            aria-hidden="true"
            className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-tone-fg"
          />
        )}
      </div>

      {entry.summary && <p className="text-[13px] leading-relaxed text-muted-foreground">{entry.summary}</p>}

      {(entry.status || entry.meta.length > 0) && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-0.5 font-mono text-xs">
          {entry.status && (
            <Badge
              variant="outline"
              className="gap-1.5 border-tone-line px-1.5 font-mono text-[11px] font-normal text-tone-muted"
            >
              <span aria-hidden="true" className={cn('size-1.5 rounded-full', statusDot[entry.status.value])} />
              {entry.status.label}
            </Badge>
          )}
          {entry.meta.map((m, i) => (
            <span key={i} className={cn(isLife && i === 0 ? 'text-tone-muted' : 'text-muted-foreground')}>
              {m}
            </span>
          ))}
        </div>
      )}
    </Card>
  );

  if (!href) return card;
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group block rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {card}
    </a>
  );
}
