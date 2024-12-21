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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { RegistrationSchema } from "@/schemas/auth";

const roles = [
  { value: "user", label: "user" },
  { value: "publisher", label: "publisher" },
];

const RegisterForm = () => {
  const { mutate, isError, isPending, data, error } = useRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
  });

  const handleRoleChange = (value: "user" | "publisher") => {
    setValue("role", value);

    if (!value) {
      setError("role", { message: "Role is required" });
    } else {
      setError("role", { message: "" });
    }
  };

  const onSubmit = (values: z.infer<typeof RegistrationSchema>) => {
    mutate(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 border border-gray-300 dark:border-gray-800 px-10 py-20 rounded-md shadow-md bg-white"
    >
      <h2 className="font-semibold text-lg italic pb-6">
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
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select onValueChange={handleRoleChange} name="role">
          <SelectTrigger className="w-96" id="role">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.role && <p className="text-red-500">{errors.role?.message}</p>}
      </div>
      <Button
        variant="primary"
        className="w-full mt-10"
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
