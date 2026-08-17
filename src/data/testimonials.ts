export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Nimal Perera',
    role: 'Contractor, Delgoda',
    quote:
      'I source most of my site hardware from Jayakirana. Prices are fair and if they do not have something, they will tell you straight instead of wasting your time.',
    rating: 5,
  },
  {
    name: 'Chamari Silva',
    role: 'Homeowner, Gampaha',
    quote:
      'Renovated my kitchen last year and the team helped me pick everything from fittings to the kettle. Genuinely helpful, not just trying to sell the priciest option.',
    rating: 5,
  },
  {
    name: 'Ruwan Dissanayake',
    role: 'Workshop owner',
    quote:
      'Been buying tools here for over ten years. Quality has stayed consistent and the ordering by WhatsApp before I travel down saves me a lot of time.',
    rating: 4,
  },
];
