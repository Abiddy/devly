import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/portal/LoginForm';
import { getSessionUser } from '@/lib/portal/session';

export default async function PortalLoginPage() {
  if (await getSessionUser()) redirect('/portal');
  return <LoginForm />;
}
