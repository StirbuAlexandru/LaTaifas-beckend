import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Colecția Noastră de Vinuri',
  description: 'Descoperă colecția noastră de vinuri de calitate superioară, selectate cu grijă - vinuri roșii, albe și rosé. Vinuri românești și internaționale pentru a complementa perfect masa ta la La Taifas Suceava.',
  keywords: ['vinuri Suceava', 'vin rosu', 'vin alb', 'vinuri romanesti', 'wine shop', 'La Taifas vinuri', 'vinuri premium'],
  openGraph: {
    title: 'Vinuri Selectate - La Taifas Suceava',
    description: 'Colecție selectată de vinuri roșii, albe și rosé. Vinuri de calitate pentru masa perfectă.',
    images: ['/images/C8.jpg'],
  },
};

export default function VinuriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
