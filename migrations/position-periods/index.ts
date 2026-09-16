import { randomUUID } from 'node:crypto';
import { at, defineMigration, set, unset } from 'sanity/migrate';

type Position = {
  _key: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  periods?: unknown[];
};

type ExperienceDoc = { positions?: Position[] };

const key = () => randomUUID().replace(/-/g, '').slice(0, 12);

const dateOnly = (value?: string) => value?.slice(0, 10);

export default defineMigration({
  title: 'Wrap each position’s dates in a periods array',
  documentTypes: ['experience'],

  migrate: {
    document(doc) {
      const experience = doc as unknown as ExperienceDoc;
      const patches: ReturnType<typeof at>[] = [];

      for (const position of experience.positions ?? []) {
        if (!position.startDate || position.periods?.length) continue;

        const path = `positions[_key=="${position._key}"]`;
        const period: Record<string, unknown> = {
          _type: 'period',
          _key: key(),
          startDate: dateOnly(position.startDate),
        };
        if (position.current) period.current = true;
        else if (position.endDate) period.endDate = dateOnly(position.endDate);

        patches.push(at(`${path}.periods`, set([period])));
        patches.push(at(`${path}.startDate`, unset()));
        patches.push(at(`${path}.endDate`, unset()));
        patches.push(at(`${path}.current`, unset()));
      }

      return patches;
    },
  },
});
