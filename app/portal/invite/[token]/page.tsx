import Link from 'next/link';
import { SetPasswordForm } from '@/components/portal/SetPasswordForm';
import { findUserByInviteToken, MIN_PASSWORD_LENGTH } from '@/lib/portal/users';

export default async function PortalInvitePage({ params }: { params: { token: string } }) {
  const user = await findUserByInviteToken(params.token);

  if (!user) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-[#152868]">This link has expired</h1>
        <p className="mt-3 text-sm text-[#667085]">
          Invite links work once and expire after 7 days. Reply to your invite email and we&apos;ll send a new one.
        </p>
        <Link href="/portal/login" className="mt-8 text-sm font-medium text-[#152868] underline underline-offset-4">
          Already set up? Sign in
        </Link>
      </main>
    );
  }

  return (
    <SetPasswordForm
      token={params.token}
      email={user.email}
      name={user.name}
      minLength={MIN_PASSWORD_LENGTH}
    />
  );
}
