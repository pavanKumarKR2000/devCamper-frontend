"use client";
import React, { useEffect } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { useLogin } from "@/api/auth";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useAddReview } from "@/api/review";
import { useToast } from "@/hooks/useToast";
import { TOAST_TIMEOUT } from "@/constants";
import { Textarea } from "../ui/TextArea";

const ratings = Array(10)
  .fill(null)
  .map((_, index) => ({
    label: (index + 1).toString(),
    value: (index + 1).toString(),
  }));

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  text: z.string().min(1, "Review is required"),
  rating: z.string().min(1, "Rating is required"),
});

const ReviewForm = () => {
  const router = useRouter();
  const { bootcampId } = useParams();
  const { mutate, isSuccess, isError, error, isPending } = useAddReview();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleRatingChange = (value: any) => {
    console.log(value);
    setValue("rating", value);
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutate({
      body: { ...values, rating: parseInt(values.rating) },
      bootcampId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Review has been added",
        variant: "success",
        duration: TOAST_TIMEOUT,
      });

      router.replace(`/bootcamps/${bootcampId}`);
    } else if (isError) {
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
        duration: TOAST_TIMEOUT,
      });
    }
  }, [isSuccess, isError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 border border-gray-300 dark:border-gray-800 px-10 py-20 rounded-md shadow-md bg-white"
    >
      <h2 className="font-semibold text-lg italic pb-6">Add review</h2>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          placeholder="Enter title"
          id="title"
          type="text"
          className="w-96"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <p className="text-red-500">{errors.title?.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="text">Review</Label>
        <Textarea
          placeholder="Add review"
          id="text"
          className="w-96"
          rows={5}
          {...register("text", { required: true })}
        />
        {errors.text && <p className="text-red-500">{errors.text?.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>
        <Select onValueChange={handleRatingChange} name="rating">
          <SelectTrigger className="w-96">
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            {ratings.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.rating && (
          <p className="text-red-500">{errors.rating?.message}</p>
        )}
      </div>
      <Button
        variant="primary"
        className="w-full mt-6"
        type="submit"
        isLoading={isPending}
        disabled={isPending}
      >
        Add review
      </Button>
    </form>
  );
};

export default ReviewForm;
