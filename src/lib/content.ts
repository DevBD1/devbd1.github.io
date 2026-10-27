/**
 * Loads and validates the YAML files in src/data.
 * Any mistake in the data fails the build with the file, the field and why.
 */
import { parse } from 'yaml';
import { z } from 'astro/zod';

import siteRaw from '../data/site.yaml?raw';
import profileRaw from '../data/profile.yaml?raw';
import setsRaw from '../data/sets.yaml?raw';
import projectsRaw from '../data/projects.yaml?raw';
import experienceRaw from '../data/experience.yaml?raw';
import educationRaw from '../data/education.yaml?raw';
import certificatesRaw from '../data/certificates.yaml?raw';
import skillsRaw from '../data/skills.yaml?raw';

/* ---------- field types ---------- */

const yearMonth = z
  .union([z.string(), z.number()])
  .transform((v) => String(v))
  .refine((v) => /^\d{4}(-(0[1-9]|1[0-2]))?$/.test(v), "use 'YYYY' or 'YYYY-MM' (in quotes)");
const endDate = z.union([z.literal('present'), yearMonth]);
const url = z.string().url();
const text = z.string().min(1);

export const tones = ['neutral', 'blue', 'orange', 'violet', 'green', 'teal', 'pink'] as const;
export type Tone = (typeof tones)[number];

export const projectStatuses = ['live', 'beta', 'building', 'planned', 'paused', 'archived'] as const;
export type ProjectStatus = (typeof projectStatuses)[number];

export const experienceKinds = ['job', 'internship', 'freelance', 'founder', 'independent'] as const;

/* ---------- file schemas ---------- */

const siteSchema = z.object({
  title: text,
  description: text,
  url,
  lang: z.string().default('en'),
  timeline: z.object({
    hideEmptyYears: z.boolean().default(true),
    experienceKinds: z.array(z.enum(experienceKinds)).default(['job', 'internship', 'freelance']),
    lifeColumn: z.object({ title: text, subtitle: z.string().default('') }),
    rootColumn: z.object({ title: text, subtitle: z.string().default('') }),
    readingNote: z.string().default(''),
  }),
  sections: z.object({ toolbox: z.boolean().default(true) }).default({}),
});

const profileSchema = z.object({
  name: text,
  headline: text,
  tagline: text,
  location: z.string().default(''),
  email: z.string().email(),
  resume: url.nullish(),
  links: z.array(z.object({ label: text, url })).default([]),
  openToWork: z
    .object({ enabled: z.boolean(), headline: text, detail: z.string().default('') })
    .default({ enabled: false, headline: 'Open to work', detail: '' }),
});

const setSchema = z.object({
  id: text,
  symbol: z.string().min(1).max(2),
  name: text,
  parent: z.string().nullable(),
  role: z.string().default(''),
  description: z.string().default(''),
  founded: yearMonth.optional(),
  url: url.optional(),
  tone: z.enum(tones).default('neutral'),
});

const projectSchema = z.object({
  id: text,
  title: text,
  summary: z.string().default(''),
  set: text,
  started: yearMonth.optional(),
  status: z.enum(projectStatuses),
  statusNote: z.string().optional(),
  kind: z.string().default(''),
  stack: z.array(z.string()).default([]),
  links: z
    .object({ site: url.optional(), store: url.optional(), repo: url.optional() })
    .default({}),
});

const experienceSchema = z.object({
  id: text,
  kind: z.enum(experienceKinds),
  company: text,
  position: text,
  location: z.string().default(''),
  start: yearMonth,
  end: endDate,
  summary: z.string().default(''),
  url: url.optional(),
  stack: z.array(z.string()).default([]),
});

const educationSchema = z.object({
  id: text,
  institution: text,
  field: text,
  degree: z.string().default(''),
  location: z.string().default(''),
  start: yearMonth,
  end: endDate,
});

const certificateSchema = z.object({
  id: text,
  name: text,
  provider: text,
  issued: yearMonth,
  url: url.optional(),
});

const skillGroupSchema = z.object({ group: text, items: z.array(text) });

export type Site = z.infer<typeof siteSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type SetDef = z.infer<typeof setSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certificate = z.infer<typeof certificateSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;

/* ---------- loading ---------- */

function load<T extends z.ZodTypeAny>(file: string, raw: string, schema: T, emptyValue: unknown): z.infer<T> {
  let data: unknown;
  try {
    data = parse(raw) ?? emptyValue;
  } catch (e) {
    throw new Error(`src/data/${file}: invalid YAML — ${(e as Error).message}`);
  }
  const result = schema.safeParse(data);
  if (!result.success) {
    const label = (path: (string | number)[]) => {
      if (!path.length) return '(root)';
      const [head, ...rest] = path;
      if (typeof head === 'number' && Array.isArray(data)) {
        const id = (data[head] as { id?: unknown } | undefined)?.id;
        const item = `entry ${head + 1}${typeof id === 'string' ? ` (id: ${id})` : ''}`;
        return rest.length ? `${item} → ${rest.join('.')}` : item;
      }
      return path.join('.');
    };
    const issues = result.error.issues.map((i) => `  • ${label(i.path)}: ${i.message}`).join('\n');
    throw new Error(`src/data/${file} has problems:\n${issues}`);
  }
  return result.data;
}

function uniqueIds(file: string, items: { id: string }[]) {
  const seen = new Set<string>();
  for (const { id } of items) {
    if (seen.has(id)) throw new Error(`src/data/${file}: duplicate id "${id}"`);
    seen.add(id);
  }
}

export const site = load('site.yaml', siteRaw, siteSchema, {});
export const profile = load('profile.yaml', profileRaw, profileSchema, {});
export const sets = load('sets.yaml', setsRaw, z.array(setSchema), []);
export const projects = load('projects.yaml', projectsRaw, z.array(projectSchema), []);
export const experience = load('experience.yaml', experienceRaw, z.array(experienceSchema), []);
export const education = load('education.yaml', educationRaw, z.array(educationSchema), []);
export const certificates = load('certificates.yaml', certificatesRaw, z.array(certificateSchema), []);
export const skills = load('skills.yaml', skillsRaw, z.array(skillGroupSchema), []);

/* ---------- cross-file checks ---------- */

uniqueIds('sets.yaml', sets);
uniqueIds('projects.yaml', projects);
uniqueIds('experience.yaml', experience);
uniqueIds('education.yaml', education);
uniqueIds('certificates.yaml', certificates);

const roots = sets.filter((s) => s.parent === null);
if (roots.length !== 1) {
  throw new Error(`src/data/sets.yaml: exactly one set needs "parent: null" (found ${roots.length})`);
}
export const rootSet = roots[0];

const setIds = new Set(sets.map((s) => s.id));
for (const s of sets) {
  if (s.parent !== null && !setIds.has(s.parent)) {
    throw new Error(`src/data/sets.yaml: "${s.id}" has unknown parent "${s.parent}"`);
  }
  if (s.parent !== null && !s.founded) {
    throw new Error(`src/data/sets.yaml: "${s.id}" needs a "founded" date`);
  }
}
for (const p of projects) {
  if (!setIds.has(p.set)) {
    throw new Error(`src/data/projects.yaml: "${p.id}" points to unknown set "${p.set}"`);
  }
  if (!p.started && p.status !== 'planned') {
    throw new Error(`src/data/projects.yaml: "${p.id}" needs a "started" date (only planned projects may omit it)`);
  }
}
