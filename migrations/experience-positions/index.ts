import { randomUUID } from 'node:crypto';
import { at, defineMigration, set, unset } from 'sanity/migrate';

type Position = {
  _key: string;
  employmentType?: string;
  startDate?: string;
  endDate?: string;
  description?: unknown;
};

type ExperienceDoc = {
  jobType?: string;
  positions?: Position[];
};

const EMPLOYMENT_TYPE: Record<string, string> = {
  fullTime: 'fullTime',
  partTime: 'partTime',
  Internship: 'internship',
  Seasonal: 'seasonal',
};

const key = () => randomUUID().replace(/-/g, '').slice(0, 12);

function toPortableText(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean)
    .map((paragraph) => ({
      _type: 'block',
      _key: key(),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: key(), text: paragraph, marks: [] }],
    }));
}

export default defineMigration({
  title: 'Move jobType onto positions, date-only dates, rich text descriptions',
  documentTypes: ['experience'],

  migrate: {
    document(doc) {
      const experience = doc as unknown as ExperienceDoc;
      const employmentType = experience.jobType
        ? EMPLOYMENT_TYPE[experience.jobType]
        : undefined;
      const patches: ReturnType<typeof at>[] = [];

      for (const position of experience.positions ?? []) {
        const path = `positions[_key=="${position._key}"]`;

        if (employmentType && !position.employmentType) {
          patches.push(at(`${path}.employmentType`, set(employmentType)));
        }
        for (const field of ['startDate', 'endDate'] as const) {
          const value = position[field];
          if (value && value.length > 10) {
            patches.push(at(`${path}.${field}`, set(value.slice(0, 10))));
          }
        }
        if (typeof position.description === 'string') {
          patches.push(
            at(
              `${path}.description`,
              set(toPortableText(position.description)),
            ),
          );
        }
      }

      if (experience.jobType) {
        patches.push(at('jobType', unset()));
      }

      return patches;
    },
  },
});
