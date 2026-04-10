import Hero from '@/app/components/home/Hero';
import NewArraivals from '@/app/components/home/NewArraivals';

export default function Page() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <NewArraivals />
    </div>
  );
}
