import { ReviewsPage } from '@/components/websites/ReviewsPage';
import { listSiteReviews } from '@/lib/site-reviews';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devly — Reviews',
  description:
    'What clients say about working with Devly — and a place to leave your own note.',
};

export const dynamic = 'force-dynamic';

export default async function ReviewsRoute() {
  const reviews = await listSiteReviews();
  return <ReviewsPage initialReviews={reviews} />;
}
