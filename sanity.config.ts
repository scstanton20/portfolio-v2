import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './schemas';
import { CustomNavbar } from './src/components/studio/CustomNavbar';

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      navbar: CustomNavbar,
    },
  },
});
