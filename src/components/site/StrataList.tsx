import type { SetDef } from '@/lib/content';
import type { Strata } from '@/lib/timeline';
import { cn } from '@/lib/utils';
import { EntryCard } from './EntryCard';
import { EntryMarker, SetBadge } from './SetBadge';

/** Phone/tablet view: the sets, then one stacked list per year (newest first). */
export function StrataList({ strata, root }: { strata: Strata; root: SetDef }) {
  return (
    <div className="mt-10 flex flex-col gap-10 lg:hidden">
      {strata.topSets.length > 0 && (
        <ul aria-label="Sets" className="grid gap-3 sm:grid-cols-2">
          {strata.topSets.map((s) => (
            <li
              key={s.id}
              className={cn(`tone-${s.tone}`, 'flex flex-col gap-2 rounded-2xl border-[1.5px] border-tone bg-tone-soft p-4')}
            >
              <div className="flex items-center gap-3">
                <SetBadge symbol={s.symbol} tone={s.tone} />
                <div className="flex flex-col">
                  <span className="font-semibold text-tone-fg">
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                        {s.name}
                      </a>
                    ) : (
                      s.name
                    )}
                  </span>
                  <span className="font-mono text-xs text-tone-muted">{s.role}</span>
                </div>
              </div>
              {s.description && <p className="text-sm text-muted-foreground">{s.description}</p>}
            </li>
          ))}
        </ul>
      )}

      <ol aria-label="Timeline" className="flex flex-col">
        {strata.rows.map((r) => {
          const entries = strata.byYear[r.year] ?? [];
          if (!entries.length) return null;
          return (
            <li key={r.year}>
              <h3 className="sticky top-16 z-10 -mx-2 bg-background/90 px-2 py-2 font-mono text-[13px] backdrop-blur-md">
                <span className={r.current ? 'text-foreground' : 'text-muted-foreground'}>{r.label}</span>
                {r.current && <span className="text-muted-foreground"> · as of {strata.asOf}</span>}
              </h3>
              <ul className="flex flex-col gap-2.5 pb-6 pt-1">
                {entries.map((e) => (
                  <li key={e.key} className="flex gap-3">
                    <span className="pt-2.5">
                      <EntryMarker entry={e} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <EntryCard entry={e} onSet={e.symbol !== root.symbol} />
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
