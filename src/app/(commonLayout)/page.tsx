import BestArraivals from '@/app/components/home/BestSellers';
import DealOfTheDay from '@/app/components/home/DealOfTheDay';
import Footer from '@/app/components/home/Footer';
import Hero from '@/app/components/home/Hero';
import JustForYou from '@/app/components/home/JustForYou';
import NewArraivals from '@/app/components/home/NewArraivals';
import TrustPoint from '@/app/components/home/TrustPoint';
import { featuresProducts } from '@/services/product/features.product';

export default async function Page() {
  const hero = await featuresProducts({
    type: 'banner',
    limit: 3,
  });

  const newArraive = await featuresProducts({
    type: 'new_arraival',
    limit: 12,
  });

  const bestSeller = await featuresProducts({
    type: 'best_seller',
    limit: 12,
  });

  const dealOfTheDay = await featuresProducts({
    type: 'deal_of_the_day',
    limit: 12,
  });
  const justForYou = await featuresProducts({
    type: 'best_seller',
    limit: 12,
  });

  return (
    <div className="flex w-full flex-col">
      <Hero products={hero} />
      <NewArraivals products={newArraive} />
      <BestArraivals products={bestSeller} />
      <DealOfTheDay products={dealOfTheDay} />
      <JustForYou products={justForYou} />
      <TrustPoint />
      <Footer />
    </div>
  );
}
