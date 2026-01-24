import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comandă Online',
  description: 'Comandă online de la La Taifas Suceava - pizza, paste, mâncăruri românești, deserturi și vinuri. Livrare rapidă la domiciliu în Burdujeni și zonele limitrofe. Vezi reducerile noastre!',
  keywords: ['comanda online Suceava', 'livrare mancare', 'pizza livrare', 'food delivery', 'La Taifas menu', 'reduceri restaurant'],
  openGraph: {
    title: 'Comandă Online - La Taifas Suceava',
    description: 'Comandă mâncare delicioasă online cu livrare rapidă la domiciliu. Pizza, paste, mâncăruri românești, deserturi și vinuri.',
    images: ['/images/pizza2.jpg'],
  },
};

export default function ComandaOnlineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
