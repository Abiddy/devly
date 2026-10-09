export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a849f]">Devly</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#152868]">{title}</h1>
      <p className="mt-2 text-sm text-[#667085]">{subtitle}</p>
      {children}
    </main>
  );
}

export const inputClass =
  'w-full rounded-lg border border-[#d2daf0] bg-white px-4 py-3 text-sm text-[#15205f] outline-none placeholder:text-[#98a2b3] focus-visible:ring-2 focus-visible:ring-[#152868]/30';

export const primaryButtonClass =
  'w-full rounded-full bg-[#152868] px-4 py-3 text-sm font-medium text-white disabled:opacity-60';
