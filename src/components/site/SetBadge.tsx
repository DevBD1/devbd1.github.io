import { Award, BriefcaseBusiness, GraduationCap, Sparkles } from 'lucide-react';

import type { Tone } from '@/lib/content';
import type { Entry } from '@/lib/timeline';
import { cn } from '@/lib/utils';

interface SetBadgeProps {
  symbol: string;
  tone: Tone;
  size?: 'sm' | 'md';
  className?: string;
}

/** The circled letter that names a set (U, K, W …). */
export function SetBadge({ symbol, tone, size = 'md', className }: SetBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        `tone-${tone}`,
        'inline-flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-tone bg-background font-mono font-semibold text-tone-fg',
        size === 'sm' ? 'size-7 text-xs' : 'size-8 text-[13px]',
        className,
      )}
    >
      {symbol}
    </span>
  );
}

const lifeIcons = {
  edu: GraduationCap,
  work: BriefcaseBusiness,
  cert: Award,
  open: Sparkles,
} as const;

/** Marker for an entry in the stacked (phone) timeline. */
export function EntryMarker({ entry }: { entry: Entry }) {
  if (entry.variant in lifeIcons) {
    const Icon = lifeIcons[entry.variant as keyof typeof lifeIcons];
    return (
      <span
        aria-hidden="true"
        className={cn(
          `tone-${entry.tone}`,
          'inline-flex size-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-tone-line bg-background text-tone-muted',
        )}
      >
        <Icon className="size-3.5" />
      </span>
    );
  }
  return <SetBadge symbol={entry.symbol ?? '·'} tone={entry.tone} size="sm" />;
}
