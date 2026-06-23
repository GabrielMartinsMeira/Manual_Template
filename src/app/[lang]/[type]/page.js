import React from 'react';
import { getManualMetadata } from '../../../lib/mdx';
import ManualPageClient from './ManualPageClient';
import { notFound } from 'next/navigation';

export default async function ManualPage({ params }) {
  const { lang, type } = await params;
  const sections = getManualMetadata(lang, type, true);

  if (!sections || sections.length === 0) {
    notFound();
  }

  return (
    <ManualPageClient lang={lang} type={type} sections={sections} />
  );
}
