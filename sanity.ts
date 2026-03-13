import { createClient } from 'next-sanity';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  apiVersion: '2025-02-19',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published' as const,
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
};

export const sanityClient = createClient(config);

// Client for fetching draft content in preview mode
export const previewClient = createClient({
  ...config,
  useCdn: false,
  perspective: 'drafts',
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
  token: process.env.SANITY_API_READ_TOKEN,
});

// Helper to get the appropriate client based on draft mode
export const getClient = (isDraftMode: boolean) =>
  isDraftMode ? previewClient : sanityClient;

export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(config).image(source);
