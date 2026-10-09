import { redirect } from 'next/navigation';
import { BusinessInfoEditor } from '@/components/portal/BusinessInfoEditor';
import { getBusinessInfo } from '@/lib/portal/business-info';
import { getSessionUser } from '@/lib/portal/session';

export default async function PortalPage() {
  const user = await getSessionUser();
  if (!user) redirect('/portal/login');

  const record = await getBusinessInfo(user.site);
  return (
    <BusinessInfoEditor
      userName={user.name}
      userEmail={user.email}
      initialInfo={record.info}
      initialUpdatedAt={record.updatedAt}
    />
  );
}
