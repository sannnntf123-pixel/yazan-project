import type { Metadata } from 'next';
import { isAuthenticated } from '@/lib/auth';
import { getSiteContent } from '@/lib/content-store';
import LoginForm from '@/components/admin/LoginForm';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · Momentum Physics',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAuthenticated())) return <LoginForm />;

  const content = await getSiteContent();
  return <AdminDashboard initialContent={content} />;
}
