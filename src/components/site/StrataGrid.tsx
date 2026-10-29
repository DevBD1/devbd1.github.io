import type { CSSProperties } from 'react';
import type { Column, Strata } from '@/lib/timeline';
import { cn } from '@/lib/utils';
import { EntryCard } from './EntryCard';
import { SetBadge } from './SetBadge';

/**
 * Desktop view: sets as columns, years as rows (newest on top).
 * A set's tinted column runs from the header down to the year it was founded.
 */
export function StrataGrid({ strata }: { strata: Strata }) {
  const { rows, columns, cells, asOf } = strata;
  const lifeIndex = columns.findIndex((c) => c.kind === 'life');
  const col = (i: number) => i + 2; // grid column of columns[i]; column 1 is the year gutter
  const row = (i: number) => i + 2; // grid row of rows[i]; row 1 is the header

  return (
    <div
      className="mt-12 hidden gap-x-4 lg:grid"
      style={{
        gridTemplateColumns: `88px repeat(${columns.length}, minmax(0, 1fr))`,
        gridTemplateRows: `auto repeat(${rows.length}, minmax(112px, auto))`,
      }}
    >
      {/* Year rules */}
      {rows.map((r, i) => (
        <div key={`rule-${r.year}`} aria-hidden="true" className="border-t border-rule" style={{ gridColumn: '1 / -1', gridRow: row(i) }} />
      ))}

      {/* Life spine */}
      {lifeIndex >= 0 && (
        <div
          aria-hidden="true"
          className="ml-[13px] w-0.5 justify-self-start bg-border"
          style={{ gridColumn: col(lifeIndex), gridRow: `2 / ${rows.length + 2}` }}
        />
      )}

      {/* Set columns */}
      {columns.map((c, i) =>
        c.kind === 'set' && c.foundedRow !== undefined ? (
          <div
            key={`bg-${c.id}`}
            aria-hidden="true"
            className={cn(`tone-${c.tone}`, 'rounded-t-[28px] rounded-b-[50%_64px] border-[1.5px] border-tone bg-tone-soft')}
            style={{ gridColumn: col(i), gridRow: `1 / ${row(c.foundedRow) + 1}` }}
          />
        ) : null,
      )}

      {/* Header row */}
      <div className="py-6 font-mono text-xs leading-normal text-muted-foreground" style={{ gridColumn: 1, gridRow: 1 }}>
        as of
        <br />
        {asOf}
      </div>
      {columns.map((c, i) => (
        <ColumnHeader key={`head-${c.id}`} column={c} style={{ gridColumn: col(i), gridRow: 1 }} />
      ))}

      {/* Year labels */}
      {rows.map((r, i) => (
        <div
          key={`year-${r.year}`}
          className={cn('pt-5 font-mono text-[13px]', r.current ? 'text-foreground' : 'text-muted-foreground')}
          style={{ gridColumn: 1, gridRow: row(i) }}
        >
          {r.label}
        </div>
      ))}

      {/* Cells */}
      {columns.map((c, ci) =>
        rows.map((r, ri) => {
          const entries = cells[c.id]?.[r.year] ?? [];
          const isFoundation = c.kind === 'set' && c.foundedRow === ri;
          if (!entries.length && !isFoundation) return null;
          return (
            <div
              key={`cell-${c.id}-${r.year}`}
              className={cn(
                `tone-${c.tone}`,
                'flex flex-col gap-2 py-4',
                c.kind === 'set' && 'px-5',
                c.kind === 'life' && 'pl-8',
                isFoundation && 'pb-14',
              )}
              style={{ gridColumn: col(ci), gridRow: row(ri) }}
            >
              {entries.map((e) => (
                <EntryCard key={e.key} entry={e} onSet={c.kind === 'set'} />
              ))}
              {isFoundation && (
                <span className="mt-auto self-center pt-2 font-mono text-xs text-tone-muted">est. {c.foundedLabel}</span>
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}

function ColumnHeader({ column, style }: { column: Column; style: CSSProperties }) {
  if (column.kind !== 'set' || !column.set) {
    return (
      <div className="flex flex-col gap-1 py-6" style={style}>
        <h3 className="text-[17px] font-semibold">{column.title}</h3>
        {column.subtitle && <p className="font-mono text-xs text-muted-foreground">{column.subtitle}</p>}
      </div>
    );
  }
  const s = column.set;
  return (
    <div className={cn(`tone-${s.tone}`, 'flex flex-col gap-3 px-5 py-5')} style={style}>
      <div className="flex items-center gap-3">
        <SetBadge symbol={s.symbol} tone={s.tone} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="text-[17px] font-semibold text-tone-fg">
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                {s.name}
              </a>
            ) : (
              s.name
            )}
          </h3>
          <p className="font-mono text-xs text-tone-muted">{s.role}</p>
        </div>
      </div>
      {s.description && <p className="text-[13px] leading-relaxed text-muted-foreground">{s.description}</p>}
    </div>
  );
}
