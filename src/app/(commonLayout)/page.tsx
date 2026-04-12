import BestArraivals from '@/app/components/home/BestArraivals';
import DealOfTheDay from '@/app/components/home/DealOfTheDay';
import Footer from '@/app/components/home/Footer';
import Hero from '@/app/components/home/Hero';
import JustForYou from '@/app/components/home/JustForYou';
import NewArraivals from '@/app/components/home/NewArraivals';
import TrustPoint from '@/app/components/home/TrustPoint';

export default function Page() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <NewArraivals />
      <BestArraivals />
      <DealOfTheDay />
      <JustForYou />
      <TrustPoint />
      <Footer />
    </div>
  );
}
