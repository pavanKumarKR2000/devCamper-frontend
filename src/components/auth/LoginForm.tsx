'use client';
import React, { useEffect } from 'react';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { useLogin } from '@/api/auth';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().min(6, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be of length greater than 6'),
});

const LoginForm = () => {
  const router = useRouter();
  const { mutate, isError, isPending, error, isSuccess } = useLogin();

  useEffect(() => {
    if (isSuccess) {
      router.push('/home');
    }
  }, [isSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutate(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 border border-gray-300 dark:border-gray-800 px-10 py-20 rounded-md shadow-md bg-white"
    >
      <h2 className="font-semibold text-lg italic pb-6">Login to dev camper</h2>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="Enter email"
          id="email"
          type="email"
          className="w-96"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          placeholder="Enter password"
          id="password"
          className="w-96"
          type="password"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password?.message}</p>
        )}
      </div>
      <Button
        variant="primary"
        className="w-full mt-6"
        type="submit"
        isLoading={isPending}
        disabled={isPending}
      >
        Login
      </Button>
      {isError && <p className="text-red-500">{error.message}</p>}
      <p className="pt-10 dark:text-white">
        dont't have an account ?{' '}
        <Link href="/auth/register" className="underline">
          register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
