import type { Metadata } from 'next';
import App from '@/App';
import { getSiteContent } from '@/lib/content-store';

// Content is edited through /admin and read from disk on each request.
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent();
  return {
    title: site.name,
    description: site.metaDescription,
    openGraph: { title: site.name, description: site.metaDescription, type: 'website' },
  };
}

export default async function Home() {
  const content = await getSiteContent();
  return <App content={content} />;
}
