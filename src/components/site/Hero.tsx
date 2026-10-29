import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Profile, SetDef } from '@/lib/content';

interface HeroProps {
  profile: Profile;
  root: SetDef;
  topSets: SetDef[];
  readingNote: string;
}

/** Set-notation chips: K ⊂ U for each set, plus K ∩ W = ∅ for each pair (up to three pairs). */
function notation(root: SetDef, topSets: SetDef[]) {
  const chips = topSets.map((s) => ({ key: `sub-${s.id}`, text: `${s.symbol} ⊂ ${root.symbol}`, tone: s.tone }));
  const pairs: typeof chips = [];
  for (let i = 0; i < topSets.length; i++)
    for (let j = i + 1; j < topSets.length; j++)
      pairs.push({
        key: `dis-${topSets[i].id}-${topSets[j].id}`,
        text: `${topSets[i].symbol} ∩ ${topSets[j].symbol} = ∅`,
        tone: root.tone,
      });
  return pairs.length <= 3 ? [...chips, ...pairs] : chips;
}

export function Hero({ profile, root, topSets, readingNote }: HeroProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-8">
      <div className="flex max-w-2xl flex-col gap-4">
        <h1 id="name" className="text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
        <p className="text-lg leading-relaxed text-[#c4c9d2] sm:text-xl">{profile.tagline}</p>
        <div className="flex flex-wrap gap-2.5 pt-1">
          <Button asChild size="lg" className="h-11">
            <a href={`mailto:${profile.email}`}>Email me</a>
          </Button>
          {profile.resume && (
            <Button asChild size="lg" variant="outline" className="h-11">
              <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                CV
              </a>
            </Button>
          )}
          {profile.links.map((l) => (
            <Button key={l.url} asChild size="lg" variant="outline" className="h-11">
              <a href={l.url} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex max-w-sm flex-col gap-3">
        {readingNote && (
          <p className="hidden font-mono text-[13px] leading-relaxed text-muted-foreground lg:block">{readingNote}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {notation(root, topSets).map((c) => (
            <Badge
              key={c.key}
              variant="outline"
              className={`tone-${c.tone} rounded-lg px-2.5 py-1.5 font-mono text-[13px] font-normal text-tone-fg`}
            >
              {c.text}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
