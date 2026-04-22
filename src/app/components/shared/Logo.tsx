import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  return (
    <div
      className="flex w-max cursor-pointer flex-col items-center"
      onClick={() => router.push('/')}
    >
      <h1 className="text-2xl font-bold tracking-tight text-primary">
        Star Style
      </h1>
      <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
        Dress with Dignity
      </p>
    </div>
  );
};

export default Logo;
