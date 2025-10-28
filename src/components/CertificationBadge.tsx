'use client';

import Image from 'next/image';
import Tooltip from './Tooltip';

interface CertificationBadgeProps {
  imageUrl: string;
  alt: string;
  title: string;
  issuer: string;
  receivedDate: string;
  priority?: boolean;
}

export default function CertificationBadge({
  imageUrl,
  alt,
  title,
  issuer,
  receivedDate,
  priority = false,
}: CertificationBadgeProps) {
  return (
    <div className="flex p-2">
      <Tooltip
        content={
          <div className="text-center">
            <div className="font-bold">{title}</div>
            <div>Issued by {issuer}</div>
            <div>Received on {receivedDate}</div>
          </div>
        }
      >
        <button>
          <Image
            className="rounded-full"
            src={imageUrl}
            alt={alt}
            height={50}
            width={50}
            priority={priority}
          />
        </button>
      </Tooltip>
    </div>
  );
}
