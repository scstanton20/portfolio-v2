import { defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'dateCompleted',
      title: 'Date Completed',
      type: 'string',
    },
    {
      name: 'projectLink',
      title: 'Project URL',
      type: 'url',
    },
    {
      name: 'place',
      title: 'Place',
      type: 'string',
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
