require('dotenv').config()
  
import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2024-05-22",
    useCdn: process.env.NODE_ENV === "production"
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);



