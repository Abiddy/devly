export const CALENDLY_EVENT_URL =
  'https://calendly.com/abidinouman/new-meeting';

export type BookingDetails = {
  name: string;
  email: string;
  phone: string;
  website?: string;
};

/** Builds a Calendly URL with standard + custom question prefill. */
export function buildCalendlyUrl(details: BookingDetails): string {
  const params = new URLSearchParams({
    name: details.name,
    email: details.email,
  });

  // Map to Calendly custom invitee questions (1st = phone, 2nd = website).
  if (details.phone) params.set('a1', details.phone);
  if (details.website) params.set('a2', details.website);

  return `${CALENDLY_EVENT_URL}?${params.toString()}`;
}
