import { setRequestLocale } from 'next-intl/server';
import HomeContent from './home-content';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return <HomeContent />;
}
