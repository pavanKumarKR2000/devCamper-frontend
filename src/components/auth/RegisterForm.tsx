"use client";
import React from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { useRegistration } from "@/api/auth";

const schema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().min(6, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be of length greater than 6"),
});

const RegisterForm = () => {
  const { mutate, isError, isPending, data, error } = useRegistration();

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
      className="flex flex-col items-center gap-4 border border-gray-300 dark:border-gray-800 px-10 py-20 rounded-md shadow-md"
    >
      <h2 className="font-semibold text-lg italic pb-10">
        Register to dev camper
      </h2>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          placeholder="Enter name"
          id="name"
          type="text"
          className="w-96"
          {...register("name", { required: true })}
        />
        {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="Enter email"
          id="email"
          type="email"
          className="w-96"
          {...register("email", { required: true })}
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
          {...register("password", { required: true })}
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
        Create Account
      </Button>
      {isError && <p className="text-red-500">{error.message}</p>}
      <p className="pt-10 dark:text-white">
        already have an account ?{" "}
        <Link href="/auth/login" className="underline">
          login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
