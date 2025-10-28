import { defineType } from 'sanity';

export const position = defineType({
  name: 'position',
  title: 'Position',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Position Title',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
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
    },
    {
      name: 'jobType',
      title: 'Job Type',
      type: 'string',
      options: {
        list: [
          { value: 'fullTime', title: 'Full Time' },
          { value: 'partTime', title: 'Part Time' },
          { value: 'Internship', title: 'Internship' },
          { value: 'Seasonal', title: 'Seasonal' },
        ],
      },
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
      type: 'array',
      of: [{ type: 'position' }],
    },
  ],
});
