import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { SkillGroup } from '@/lib/content';

export function Toolbox({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="toolbox" aria-labelledby="toolbox-title" className="py-16 sm:py-20">
      <h2 id="toolbox-title" className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
        Toolbox
      </h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <Card key={g.group} className="gap-3 px-5 py-5 shadow-none">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{g.group}</h3>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <Badge key={item} variant="secondary" className="px-2.5 py-1 text-[13px] font-normal">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
