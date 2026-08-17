import type { Product } from '../types';

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

const AUTHORS = [
  'Nimal P.',
  'Chamari S.',
  'Ruwan D.',
  'Kasun W.',
  'Dilani F.',
  'Sanjeewa K.',
  'Tharindu M.',
  'Ishara J.',
];

const COMMENTS = [
  'Exactly what I needed for the job — good quality for the price.',
  'Picked this up at the Delgoda store, staff were helpful choosing the right one.',
  'Been using it for a few months now, holding up well.',
  'Good value. Would buy from Jayakirana again.',
  'Does what it says, no complaints. Fast to get sorted at the counter.',
  'Solid build quality, better than I expected at this price point.',
];

const DATES = ['2 weeks ago', '1 month ago', '2 months ago', '3 months ago', '5 months ago'];

/** Deterministic string hash (djb2) so reviews stay stable across renders without repeating. */
function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i += 1) h = (h * 33) ^ str.charCodeAt(i);
  return Math.abs(h);
}

function pickAt<T>(arr: T[], key: string): T {
  return arr[hash(key) % arr.length];
}

export function getReviewsForProduct(product: Product): Review[] {
  const count = Math.min(3, Math.max(1, Math.round(product.reviews / 40)));
  const usedAuthors = new Set<string>();

  return Array.from({ length: count }).map((_, i) => {
    const seed = `${product.id}-${i}`;
    let author = pickAt(AUTHORS, `${seed}-author`);
    let attempt = 0;
    while (usedAuthors.has(author) && attempt < AUTHORS.length) {
      author = pickAt(AUTHORS, `${seed}-author-${attempt}`);
      attempt += 1;
    }
    usedAuthors.add(author);

    const ratingJitter = pickAt([0, 0, 0, -1], `${seed}-jitter`);
    return {
      author,
      rating: Math.max(3, Math.min(5, Math.round(product.rating) + ratingJitter)),
      date: pickAt(DATES, `${seed}-date`),
      text: pickAt(COMMENTS, `${seed}-text`),
    };
  });
}
