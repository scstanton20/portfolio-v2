import { defineType } from 'sanity';

const monthYear = { dateFormat: 'MM/YYYY', calendarTodayLabel: 'Today' };

const fmt = (d?: string) =>
  d ? d.slice(0, 7).split('-').reverse().join('/') : '?';

type Period = { startDate?: string; endDate?: string; current?: boolean };

const rangeLabel = ({ startDate, endDate, current }: Period) =>
  `${fmt(startDate)} – ${current ? 'Present' : fmt(endDate)}`;

export const period = defineType({
  name: 'period',
  title: 'Period',
  type: 'object',
  fields: [
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: monthYear,
      validation: (rule) => rule.required(),
    },
    {
      name: 'current',
      title: 'I currently hold this role',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: monthYear,
      hidden: ({ parent }) => Boolean(parent?.current),
    },
  ],
  preview: {
    select: { startDate: 'startDate', endDate: 'endDate', current: 'current' },
    prepare: (selection: Period) => ({ title: rangeLabel(selection) }),
  },
});

export const position = defineType({
  name: 'position',
  title: 'Position',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Position Title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { value: 'fullTime', title: 'Full Time' },
          { value: 'partTime', title: 'Part Time' },
          { value: 'internship', title: 'Internship' },
          { value: 'seasonal', title: 'Seasonal' },
          { value: 'contract', title: 'Contract' },
        ],
      },
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'periods',
      title: 'Date Periods',
      description: 'Add more than one for a role held across separate stints.',
      type: 'array',
      of: [{ type: 'period' }],
      validation: (rule) => rule.required().min(1),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', periods: 'periods' },
    prepare: ({ title, periods }) => ({
      title,
      subtitle: (periods ?? []).map(rangeLabel).join(' · '),
    }),
  },
});

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'companyUrl',
      title: 'Company Website',
      type: 'url',
    },
    {
      name: 'image',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'positions',
      title: 'Positions',
      description: 'Order does not matter — the site sorts by start date.',
      type: 'array',
      of: [{ type: 'position' }],
      validation: (rule) => rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'companyName',
      media: 'image',
      positions: 'positions',
    },
    prepare: ({ title, media, positions }) => ({
      title,
      media,
      subtitle: ((positions ?? []) as { title?: string }[])
        .map((position) => position?.title)
        .filter(Boolean)
        .join(' · '),
    }),
  },
});
