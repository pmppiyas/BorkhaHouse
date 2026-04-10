import BestArraivals from '@/app/components/home/BestArraivals';
import DealOfTheDay from '@/app/components/home/DealOfTheDay';
import Hero from '@/app/components/home/Hero';
import JustForYou from '@/app/components/home/JustForYou';
import NewArraivals from '@/app/components/home/NewArraivals';

export default function Page() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <NewArraivals />
      <BestArraivals />
      <DealOfTheDay />
      <JustForYou />
    </div>
  );
}
