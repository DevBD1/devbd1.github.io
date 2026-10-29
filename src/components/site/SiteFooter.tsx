import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Profile, SetDef } from '@/lib/content';

interface SiteFooterProps {
  profile: Profile;
  root: SetDef;
  asOf: string;
}

export function SiteFooter({ profile, root, asOf }: SiteFooterProps) {
  return (
    <footer id="contact" className="pb-12">
      <Separator />
      <div className="flex flex-col gap-5 py-14 sm:py-16">
        <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">Say hello.</h2>
        <a
          href={`mailto:${profile.email}`}
          className="w-fit text-xl font-medium underline decoration-border underline-offset-[6px] transition-colors hover:decoration-foreground sm:text-2xl"
        >
          {profile.email}
        </a>
        {profile.location && <p className="font-mono text-[13px] text-muted-foreground">{profile.location}</p>}
      </div>
      <Separator />
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
        <nav aria-label="Profiles" className="-ml-3 flex flex-wrap gap-1">
          {profile.links.map((l) => (
            <Button key={l.url} asChild variant="ghost" className="h-11 text-[15px] font-normal">
              <a href={l.url} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </Button>
          ))}
        </nav>
        <p className="font-mono text-[13px] text-muted-foreground">
          © {new Date().getFullYear()} {profile.name} · {root.name} · updated {asOf}
        </p>
      </div>
    </footer>
  );
}
