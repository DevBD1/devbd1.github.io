import type { Profile } from '@/lib/content';
import { MaybeLink } from './Section';

/** "https://www.github.com/DevBD1/" → "github.com/DevBD1", so links still read on paper. */
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function ResumeHeader({ profile }: { profile: Profile }) {
  const links = [{ label: profile.email, url: `mailto:${profile.email}` }, ...profile.links.map((l) => ({ label: bare(l.url), url: l.url }))];

  return (
    <header className="flex flex-col gap-4 print:gap-2">
      <div>
        <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl print:text-4xl">{profile.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {profile.headline}
          {profile.location && <> · {profile.location}</>}
        </p>
      </div>

      <p className="max-w-2xl leading-relaxed">{profile.tagline}</p>

      {profile.openToWork.enabled && (
        <p className="flex items-baseline gap-2 text-[0.9375rem]">
          <span aria-hidden="true" className="size-2 shrink-0 -translate-y-px rounded-full bg-available" />
          <span>
            <span className="font-medium">{profile.openToWork.headline}</span>
            {profile.openToWork.detail && <span className="text-muted-foreground"> — {profile.openToWork.detail}</span>}
          </span>
        </p>
      )}

      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
        {links.map((l) => (
          <li key={l.url}>
            <MaybeLink href={l.url}>{l.label}</MaybeLink>
          </li>
        ))}
      </ul>
    </header>
  );
}
