import { draftMode } from 'next/headers';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BiMap } from 'react-icons/bi';
import { PortableText } from '@portabletext/react';
import { getClient, urlFor } from '../../../../sanity';
import type { Experience } from '../../../../sanity.types';
import { PageTransition } from '../../../components/PageTransition';
import {
  formatRange,
  latestStart,
  tenure,
  totalSpan,
} from '../../../util/dates';

export const metadata: Metadata = {
  title: 'Experience | Sam Stanton',
  description: 'Where Sam Stanton has worked and what he did there.',
};

const EMPLOYMENT_TYPES: Record<string, string> = {
  fullTime: 'Full Time',
  partTime: 'Part Time',
  internship: 'Internship',
  seasonal: 'Seasonal',
  contract: 'Contract',
};

async function getExperiences(isDraftMode: boolean) {
  const client = getClient(isDraftMode);
  const query = `*[_type == "experience"]{
        _id,
        companyName,
        companyUrl,
        image,
        positions[]{...}
    }`;
  const experiences = await client.fetch<Experience[]>(
    query,
    {},
    {
      next: isDraftMode ? { revalidate: 0 } : { tags: ['experience'] },
    },
  );

  return experiences
    .map((experience) => ({
      ...experience,
      positions: [...(experience.positions ?? [])]
        .filter((position) => position.periods?.length)
        .sort((a, b) =>
          latestStart(b.periods).localeCompare(latestStart(a.periods)),
        ),
    }))
    .filter((experience) => experience.positions.length > 0)
    .sort((a, b) =>
      latestStart(b.positions[0].periods).localeCompare(
        latestStart(a.positions[0].periods),
      ),
    );
}

export default async function Experiences() {
  const { isEnabled: isDraftMode } = await draftMode();
  const experiences = await getExperiences(isDraftMode);

  return (
    <PageTransition>
      <div className="mt-24 w-full mb-32">
        <h1 className="mt-36 font-bold text-2xl sm:text-3xl mb-3">
          Experience 💼
        </h1>

        <div className="flex flex-col gap-4">
          {experiences.map((experience) => {
            const positions = experience.positions;
            const allPeriods = positions.flatMap(
              (position) => position.periods,
            );

            return (
              <section
                key={experience._id}
                className="p-4 bg-white/10 dark:bg-black/10 rounded-md border border-slate-400 dark:border-slate-800"
              >
                <div className="flex flex-row items-center gap-3">
                  {experience.image && (
                    <Image
                      className="rounded-md shrink-0"
                      src={urlFor(experience.image).url()}
                      alt={`${experience.companyName} logo`}
                      width={48}
                      height={48}
                    />
                  )}
                  <div>
                    <h2 className="font-bold text-2xl leading-tight">
                      {experience.companyUrl ? (
                        <Link
                          href={experience.companyUrl}
                          target="_blank"
                          className="hover:underline"
                        >
                          {experience.companyName}
                        </Link>
                      ) : (
                        experience.companyName
                      )}
                    </h2>
                    <p className="text-sm text-gray-800/70 dark:text-gray-100/70">
                      {totalSpan(allPeriods)}
                    </p>
                  </div>
                </div>

                <ol className="mt-4 ml-2">
                  {positions.map((position, index) => (
                    <li
                      key={position._key}
                      className="relative pl-6 pb-6 last:pb-0"
                    >
                      {index < positions.length - 1 && (
                        <span className="absolute left-0 top-3 -translate-x-1/2 h-full w-px bg-slate-400 dark:bg-slate-700" />
                      )}
                      <span className="absolute left-0 top-2 -translate-x-1/2 h-2 w-2 rounded-full bg-slate-500" />
                      <h3 className="font-medium text-lg leading-tight">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-800/70 dark:text-gray-100/70">
                        <span>
                          {[
                            position.employmentType &&
                              EMPLOYMENT_TYPES[position.employmentType],
                            position.periods.map(formatRange).join(' · '),
                            tenure(position.periods),
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                        {position.location && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="flex flex-row items-center gap-1">
                              <BiMap className="h-4 w-4 shrink-0" />
                              {position.location}
                            </span>
                          </>
                        )}
                      </div>
                      {Array.isArray(position.description) &&
                      position.description.length ? (
                        <div className="mt-2 text-sm text-gray-800 dark:text-gray-300 leading-6 font-light tracking-wide [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4">
                          <PortableText value={position.description} />
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
