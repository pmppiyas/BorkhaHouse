'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserZodSchema } from '@/validation/auth.validation';
import { signUp } from '@/services/auth/signup';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { IUser } from '@/interface/user.interface';

type FormData = z.infer<typeof UserZodSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserZodSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await signUp(data as IUser);
      if (result.success) {
        toast.success(result.message);

        router.push('/auth?mode=signin');
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('Signup failed');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Create account ✨</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <Input placeholder="Name" {...register('name')} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <Input placeholder="Phone Number" {...register('number')} />
          {errors.number && (
            <p className="text-sm text-red-500">{errors.number.message}</p>
          )}
        </div>

        {/* Location (comma separated) */}
        <div>
          <Input
            placeholder="Location (e.g. Dhaka, Rajshahi)"
            {...register('location')}
          />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
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

        {/* Submit */}
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
