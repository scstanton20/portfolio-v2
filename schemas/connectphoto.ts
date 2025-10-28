import { defineType } from 'sanity';

export default defineType({
  name: 'connectphoto',
  title: 'Connect Page Photo',
  type: 'document',
  fields: [
    {
      name: 'alt',
      title: 'Alternate Text',
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
