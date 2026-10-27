/**
 * Turns the validated data into the strata model: rows = years (newest first),
 * columns = Life | Only in U | one per top-level set.
 */
import {
  certificates,
  education,
  experience,
  profile,
  projects,
  rootSet,
  sets,
  site,
  type ProjectStatus,
  type SetDef,
  type Tone,
} from './content';

export type Variant = 'project' | 'planned' | 'edu' | 'work' | 'cert' | 'open' | 'founded';

export interface Entry {
  key: string;
  variant: Variant;
  title: string;
  summary?: string;
  /** Small mono labels under the title. */
  meta: string[];
  status?: { label: string; value: ProjectStatus };
  href?: string;
  tone: Tone;
  /** Symbol of the set this entry belongs to (for the stacked mobile view). */
  symbol?: string;
  sort: number;
  year: number;
}

export interface Column {
  id: string;
  kind: 'life' | 'root' | 'set';
  title: string;
  subtitle: string;
  tone: Tone;
  set?: SetDef;
  /** Index into rows of the year this set was founded (set columns only). */
  foundedRow?: number;
  foundedLabel?: string;
}

export interface Row {
  year: number;
  label: string;
  current: boolean;
}

export interface Strata {
  asOf: string;
  rows: Row[];
  columns: Column[];
  /** cells[columnId][year] */
  cells: Record<string, Record<number, Entry[]>>;
  /** Every entry in a row across columns, for the mobile list. */
  byYear: Record<number, Entry[]>;
  topSets: SetDef[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function parseDate(value: string) {
  const [y, m] = value.split('-');
  return { year: Number(y), month: m ? Number(m) : 0 };
}

export function formatDate(value: string) {
  if (value === 'present') return 'present';
  const { year, month } = parseDate(value);
  return month ? `${MONTHS[month - 1]} ${year}` : String(year);
}

function range(start: string, end: string) {
  const a = formatDate(start);
  const b = formatDate(end);
  return a === b ? a : `${a} – ${b}`;
}

function hostOf(href?: string) {
  if (!href) return undefined;
  try {
    return new URL(href).host.replace(/^www\./, '');
  } catch {
    return undefined;
  }
}

const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  beta: 'Beta',
  building: 'Building',
  planned: 'Planned',
  paused: 'Paused',
  archived: 'Archived',
};

export function buildStrata(now = new Date()): Strata {
  const currentYear = now.getFullYear();
  const byId = new Map(sets.map((s) => [s.id, s]));

  const topSets = sets.filter((s) => s.parent === rootSet.id);
  const topAncestor = (id: string): SetDef | null => {
    let s = byId.get(id);
    while (s && s.parent !== null && s.parent !== rootSet.id) s = byId.get(s.parent);
    return s && s.parent === rootSet.id ? s : null;
  };

  const placed: { column: string; entry: Entry }[] = [];
  const place = (column: string, when: string | null, entry: Omit<Entry, 'sort' | 'year'>) => {
    const d = when ? parseDate(when) : { year: currentYear, month: now.getMonth() + 1 };
    placed.push({ column, entry: { ...entry, year: d.year, sort: d.year * 12 + d.month } });
  };

  /* Life column */
  for (const e of education) {
    place('life', e.start, {
      key: `edu-${e.id}`,
      variant: 'edu',
      title: e.field,
      meta: ['edu', e.institution, range(e.start, e.end)],
      tone: 'violet',
      symbol: rootSet.symbol,
    });
  }
  for (const x of experience.filter((x) => site.timeline.experienceKinds.includes(x.kind))) {
    place('life', x.start, {
      key: `work-${x.id}`,
      variant: 'work',
      title: x.position,
      summary: x.summary || undefined,
      meta: [x.kind === 'internship' ? 'internship' : 'work', x.company, range(x.start, x.end)],
      href: x.url,
      tone: 'green',
      symbol: rootSet.symbol,
    });
  }
  for (const c of certificates) {
    place('life', c.issued, {
      key: `cert-${c.id}`,
      variant: 'cert',
      title: c.name,
      meta: ['cert', c.provider],
      href: c.url,
      tone: 'teal',
      symbol: rootSet.symbol,
    });
  }
  if (profile.openToWork.enabled) {
    place('life', null, {
      key: 'open-to-work',
      variant: 'open',
      title: profile.openToWork.headline,
      summary: profile.openToWork.detail || undefined,
      meta: [],
      href: `mailto:${profile.email}`,
      tone: 'green',
      symbol: rootSet.symbol,
    });
  }

  /* Projects */
  for (const p of projects) {
    const top = p.set === rootSet.id ? null : topAncestor(p.set);
    const owner = top ?? rootSet;
    const href = p.links.site ?? p.links.store ?? p.links.repo;
    let when = p.started ?? null;
    // A project can't appear before its set existed.
    if (top?.founded && when && parseDate(when).year < parseDate(top.founded).year) when = top.founded;
    place(top ? top.id : 'root', when, {
      key: `project-${p.id}`,
      variant: p.status === 'planned' ? 'planned' : 'project',
      title: p.title,
      summary: p.summary || undefined,
      meta: [p.kind, hostOf(p.links.site)].filter(Boolean) as string[],
      status: { value: p.status, label: p.statusNote ?? statusLabels[p.status] },
      href,
      tone: owner.tone,
      symbol: owner.symbol,
    });
  }

  /* Rows */
  const years = new Set<number>([currentYear]);
  placed.forEach(({ entry }) => years.add(entry.year));
  topSets.forEach((s) => s.founded && years.add(parseDate(s.founded).year));
  let yearList = [...years].sort((a, b) => b - a);
  if (!site.timeline.hideEmptyYears && yearList.length > 1) {
    const min = yearList[yearList.length - 1];
    yearList = Array.from({ length: currentYear - min + 1 }, (_, i) => currentYear - i);
  }
  const rows: Row[] = yearList.map((year) => ({ year, label: String(year), current: year === currentYear }));
  const rowIndex = (year: number) => rows.findIndex((r) => r.year === year);

  /* Columns */
  const hasLife = placed.some((p) => p.column === 'life');
  const columns: Column[] = [];
  if (hasLife) {
    columns.push({
      id: 'life',
      kind: 'life',
      title: site.timeline.lifeColumn.title,
      subtitle: site.timeline.lifeColumn.subtitle,
      tone: 'neutral',
    });
  }
  columns.push({
    id: 'root',
    kind: 'root',
    title: site.timeline.rootColumn.title,
    subtitle: site.timeline.rootColumn.subtitle,
    tone: rootSet.tone,
    set: rootSet,
  });
  for (const s of topSets) {
    const founded = parseDate(s.founded!);
    columns.push({
      id: s.id,
      kind: 'set',
      title: s.name,
      subtitle: s.role,
      tone: s.tone,
      set: s,
      foundedRow: rowIndex(founded.year),
      foundedLabel: formatDate(s.founded!),
    });
  }

  /* Cells */
  const cells: Strata['cells'] = {};
  const byYear: Strata['byYear'] = {};
  const order = (a: Entry, b: Entry) =>
    Number(b.variant === 'open') - Number(a.variant === 'open') ||
    Number(b.variant === 'planned') - Number(a.variant === 'planned') ||
    b.sort - a.sort;

  for (const { column, entry } of placed) {
    ((cells[column] ??= {})[entry.year] ??= []).push(entry);
    (byYear[entry.year] ??= []).push(entry);
  }
  for (const s of topSets) {
    const d = parseDate(s.founded!);
    (byYear[d.year] ??= []).push({
      key: `founded-${s.id}`,
      variant: 'founded',
      title: `${s.name} founded`,
      meta: [s.role],
      href: s.url,
      tone: s.tone,
      symbol: s.symbol,
      year: d.year,
      sort: d.year * 12 + d.month - 0.5,
    });
  }
  Object.values(cells).forEach((col) => Object.values(col).forEach((list) => list.sort(order)));
  Object.values(byYear).forEach((list) => list.sort(order));

  return {
    asOf: `${MONTHS[now.getMonth()]} ${currentYear}`,
    rows,
    columns,
    cells,
    byYear,
    topSets,
  };
}
