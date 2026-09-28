import {
  Bodoni_Moda,
  Fraunces,
  Instrument_Serif,
  Space_Mono,
  Syne,
  Unbounded,
} from 'next/font/google';

const spaceMono = Space_Mono({ subsets: ['latin'], weight: '700', display: 'swap' });
const unbounded = Unbounded({ subsets: ['latin'], weight: '800', display: 'swap' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], weight: '900', style: 'italic', display: 'swap' });
const syne = Syne({ subsets: ['latin'], weight: '800', display: 'swap' });
const bodoni = Bodoni_Moda({ subsets: ['latin'], weight: '700', style: 'italic', display: 'swap' });

export const anatomyLetters = [
  { ch: 'a', className: 'an-letter--serif' },
  { ch: 'n', className: `${spaceMono.className} an-letter--mono` },
  { ch: 'a', className: `${unbounded.className} an-letter--wide` },
  { ch: 't', className: `${instrument.className} an-letter--thin` },
  { ch: 'o', className: `${fraunces.className} an-letter--soft` },
  { ch: 'm', className: `${syne.className} an-letter--syne` },
  { ch: 'y', className: `${bodoni.className} an-letter--bodoni` },
];
