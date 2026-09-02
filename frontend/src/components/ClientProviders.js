'use client';

import dynamic from 'next/dynamic';

const CustomCursor = dynamic(
  () => import('@/components/CustomCursor/CustomCursor'),
  { ssr: false }
);

const BackgroundMusic = dynamic(
  () => import('@/components/BackgroundMusic/BackgroundMusic'),
  { ssr: false }
);

export default function ClientProviders() {
  return (
    <>
      <CustomCursor />
      <BackgroundMusic />
    </>
  );
}
