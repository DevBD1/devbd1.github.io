import { Button } from '@/components/ui/button';
import type { Profile, SetDef } from '@/lib/content';
import { SetBadge } from './SetBadge';

interface SiteHeaderProps {
  root: SetDef;
  profile: Profile;
  nav: { label: string; href: string }[];
}

export function SiteHeader({ root, profile, nav }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-16">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 font-mono text-[17px] font-semibold">
          <SetBadge symbol={root.symbol} tone={root.tone} size="sm" />
          {root.name}
        </a>
        <nav aria-label="Primary" className="flex items-center gap-1">
          {nav.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className="hidden h-11 text-[15px] font-normal text-muted-foreground hover:text-foreground md:inline-flex"
            >
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
          {profile.openToWork.enabled && (
            <Button
              asChild
              variant="outline"
              className="tone-green ml-2 h-11 rounded-full border-tone-line bg-tone-soft px-4 text-tone-fg hover:bg-tone-soft hover:text-foreground"
            >
              <a href={`mailto:${profile.email}`}>
                <span aria-hidden="true" className="size-2 rounded-full bg-tone" />
                {profile.openToWork.headline}
              </a>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
