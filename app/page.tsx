import { HomePage } from '@/components/HomePage';
import { getReviews } from '@/lib/reviews';

export const revalidate = 60;

export default async function Page() {
  const reviews = await getReviews();
  return <HomePage reviews={reviews} />;
}
