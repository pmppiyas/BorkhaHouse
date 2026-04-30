'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginSchema } from '@/validation/auth.validation';
import { signIn } from '@/services/auth/signin';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

type FormData = z.infer<typeof LoginSchema>;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const onSubmit = async (data: FormData) => {
    try {
      const result = await signIn(data);
      if (result.success) {
        toast.success(result.message);
        router.push(redirect || '/');
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome back 👋</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Phone */}
        <div>
          <Input placeholder="Credentials" {...register('identifier')} />
          {errors.identifier && (
            <p className="text-sm text-red-500">{errors.identifier.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Button */}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
