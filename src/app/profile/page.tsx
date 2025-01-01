'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { RiEditFill, RiLogoutBoxLine, RiUser3Line } from '@remixicon/react';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '@/stores/userStore';
import { useLogout, useUserUpdate } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { TOAST_TIMEOUT } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { User } from '@/types/user';

const schema = z.object({
  email: z.string().min(6, 'Email is required').email('Invalid email address'),
  name: z.string().min(3, 'Name must be of length greater than 3'),
});

const page = () => {
  const { name, email, role } = useUserStore((state) => state);
  const [showDialog, setShowDialog] = useState(false);
  const { setUser } = useUserStore((state) => state);
  const { toast } = useToast();
  const {
    mutate: logout,
    isSuccess: isLogoutSuccess,
    isError: isLogoutError,
    isPending: isLogoutPending,
  } = useLogout();
  const {
    mutate: updateUser,
    isSuccess: isUserUpdateSuccess,
    isError: isUserUpdateError,
    error: userUpdateError,
    isPending: isUserUpdatePending,
    data: user_data,
  } = useUserUpdate();

  const userData = user_data?.data as User;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (name && email) {
      setValue('name', name);
      setValue('email', email);
    }
  }, [name, email]);

  useEffect(() => {
    if (isLogoutSuccess) {
      router.replace('/auth/login');
    }
    if (isLogoutError) {
      //todo
    }
  }, [isLogoutSuccess, isLogoutError]);

  useEffect(() => {
    if (isUserUpdateSuccess) {
      setShowDialog(false);
      toast({
        title: 'Success',
        description: 'User details has been updated',
        variant: 'success',
        duration: TOAST_TIMEOUT,
      });
    } else if (isUserUpdateError) {
      toast({
        title: 'Error',
        description: userUpdateError.message,
        variant: 'error',
        duration: TOAST_TIMEOUT,
      });
    }
  }, [isUserUpdateSuccess, isUserUpdateError]);

  useEffect(() => {
    if (userData) {
      setUser({
        name: userData.name,
        email: userData.email,
        role: userData.role,
        _id: userData._id,
      });
    }
  }, [userData]);

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
    updateUser(values);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <main>
      <div className="container mx-auto py-10 space-y-10">
        <div className="flex flex-col items-center gap-4 dark:text-white">
          <RiUser3Line className="h-20 w-20 bg-white rounded-full p-4 dark:text-black" />
          <div className="flex items-center gap-2">
            <span className="text-sm">Name</span>
            <span className="font-bold italic">{name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Email</span>
            <span className="font-bold italic">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Role</span>
            <span className="font-bold italic">{role}</span>
          </div>
          <div className="flex items-center gap-4">
            <Dialog onOpenChange={setShowDialog} open={showDialog}>
              <DialogTrigger asChild>
                <Button variant="primary" className="flex items-center gap-2">
                  <RiEditFill className="h-5 w-5" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogTitle className="font-semibold text-lg italic pb-6 text-center">
                  Update user details
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      placeholder="Enter name"
                      id="name"
                      className="w-full"
                      type="text"
                      {...register('name', { required: true })}
                    />
                    {errors.name && (
                      <p className="text-red-500">{errors.name?.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      placeholder="Enter email"
                      id="email"
                      type="email"
                      className="w-full"
                      {...register('email', { required: true })}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email?.message}</p>
                    )}
                  </div>
                  <div className="!mt-12 !flex !items-center !justify-center gap-4">
                    <DialogClose asChild>
                      <Button
                        className="mt-2 w-full sm:mt-0 sm:w-fit"
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                    </DialogClose>

                    <Button
                      className="w-full sm:w-fit flex items-center gap-2"
                      variant="primary"
                      type="submit"
                      isLoading={isUserUpdatePending}
                      // disabled={isUserUpdatePending}
                    >
                      Update
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              variant="primary"
              isLoading={isLogoutPending}
              disabled={isLogoutPending}
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <RiLogoutBoxLine className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
