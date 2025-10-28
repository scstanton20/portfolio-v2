'use client';

import { StudioWrapper } from '../../../../components/studio/StudioWrapper';
import config from '../../../../../sanity.config';

export default function StudioPage() {
  return <StudioWrapper config={config} />;
}
