import { defineType } from 'sanity';

export default defineType({
  name: 'certification',
  title: 'Certifications',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'receivedDate',
      title: 'Date Received',
      type: 'date',
      options: {
        dateFormat: 'MM/YYYY',
        calendarTodayLabel: 'Today',
      },
    },
    {
      name: 'issuer',
      title: 'Issuer',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
});
