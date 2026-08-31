import { ReviewsPage } from '@/components/websites/ReviewsPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devly — Leave a review',
  description:
    'Leave a short note about working with Devly — what stood out and whether the site helped.',
};

export default function ReviewsRoute() {
  return <ReviewsPage />;
}
