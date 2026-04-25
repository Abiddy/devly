/** Edit headline, badge links, and form URL. Reviews load from `GOOGLE_SHEET_CSV_URL` in `.env.local` when set. */
export const REVIEWS_CONFIG = {
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf7LM6zLAAAr2ppp8Lzf9ZgjTWn2yFjoT36akJLSFQYE_GUqQ/viewform?usp=header" as string,
  headline: {
    parts: [
      { text: "heres what", sans: true },
      { text: "they", sans: false },
      { text: "said...", sans: true },
    ] as const,
  },
  googleBadge: {
    href: "https://maps.google.com",
    rating: 5.0,
    reviewCount: 78,
  },
  otherBadge: {
    href: "https://www.angi.com",
    rating: 4.9,
    reviewCount: 80,
  },
} as const;
