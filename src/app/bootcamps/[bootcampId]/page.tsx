"use client";
import { useDeleteBootcamp, useGetBootcampById } from "@/api/bootcamp";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import bootcampBanner from "../../../../public/coding-bootcamp.jpg";
import {
  RiStarFill,
  RiStarHalfLine,
  RiPhoneFill,
  RiMailFill,
  RiGlobalFill,
  RiMapPin2Fill,
  RiEditFill,
  RiDeleteBin6Fill,
  RiAddFill,
} from "@remixicon/react";
import { Badge } from "@/components/ui/Badge";
import { Bootcamp } from "@/types/bootcamp";
import { useGetCoursesByBootcampId } from "@/api/course";
import { Course } from "@/types/course";
import CourseCard from "@/components/course/CourseCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useUserStore } from "@/stores/userStore";
import { matchUserId } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { TOAST_TIMEOUT } from "@/constants";

const page = () => {
  const { bootcampId } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const { data: bootcamp_data } = useGetBootcampById(bootcampId as string);
  const bootcampData = bootcamp_data?.data as Bootcamp;

  const { data: course_data } = useGetCoursesByBootcampId(bootcampId as string);
  const courseData = course_data?.data as Course[];

  const { mutate, isSuccess, isError, isPending, error } = useDeleteBootcamp();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Bootcamp has been deleted",
        variant: "success",
        duration: TOAST_TIMEOUT,
      });
      router.replace("/home");
    } else if (isError) {
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
        duration: TOAST_TIMEOUT,
      });
    }
  }, [isError, isSuccess]);

  const handleDelete = () => {
    mutate(bootcampId as string);
  };

  const { _id: userId, role } = useUserStore((state) => state);
  const publisherId = bootcampData?.user;

  const hasHalfStar =
    bootcampData?.averageRating - Math.floor(bootcampData?.averageRating) > 0
      ? true
      : false;

  return (
    <main>
      <div className="container mx-auto py-10 space-y-10">
        {/** first row */}
        <div className="">
          <div className="flex items-srart gap-10">
            {/** first column */}
            <div className="relative w-[80%]">
              <div className="absolute inset-0  bg-gradient-to-r from-slate-200 via-transparent to-slate-200 " />
              <div className="absolute inset-0  bg-gradient-to-b from-slate-200 via-transparent to-slate-200" />
              <Image
                src={bootcampBanner}
                alt="bootcamp banner image"
                className="rounded-lg w-full h-full"
              />
            </div>

            {/** second column */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                  {bootcampData?.name}
                </h2>
                {bootcampData?.averageRating && (
                  <Badge variant="default" className="w-fit">
                    {bootcampData?.averageRating &&
                      Array(Math.floor(bootcampData?.averageRating))
                        .fill(0)
                        .map((item, index) => (
                          <RiStarFill
                            className="h-5 w-5 dark:text-white"
                            key={index}
                          />
                        ))}
                    {hasHalfStar && (
                      <RiStarHalfLine className="h-5 w-5 dark:text-white" />
                    )}
                  </Badge>
                )}
              </div>

              {matchUserId(userId, publisherId) && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    className="flex items-center gap-2"
                    onClick={() => router.push(`/bootcamps/${bootcampId}/edit`)}
                  >
                    <RiEditFill className="h-5 w-5" />
                    Edit bootcamp
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="flex items-center gap-2"
                      >
                        <RiDeleteBin6Fill className="h-5 w-5" />
                        Delete bootcamp
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure to delete this bootcamp
                        </DialogTitle>
                      </DialogHeader>
                      <DialogFooter className="mt-6 !flex !items-center !justify-center">
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
                          variant="destructive"
                          onClick={handleDelete}
                          isLoading={isPending}
                        >
                          <RiDeleteBin6Fill className="h-5 w-5" />
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="primary"
                    className="flex items-center gap-2"
                    onClick={() =>
                      router.push(`/bootcamps/${bootcampId}/addCourse`)
                    }
                  >
                    <RiAddFill className="h-5 w-5" />
                    Add course
                  </Button>
                </div>
              )}

              <p className="mt-2 text-md leading-6 text-gray-900 dark:text-gray-50">
                {bootcampData?.description}
              </p>
              <div>
                <div className="flex items-center flex-wrap gap-2">
                  {bootcampData?.careers.map((item, index) => (
                    <Badge
                      variant="success"
                      className="w-fit text-md"
                      key={index}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="default"
                  className="text-md flex items-center gap-3"
                >
                  <RiPhoneFill className="h-5 w-5" />{" "}
                  <span>{bootcampData?.phone}</span>
                </Badge>
                <Badge
                  variant="default"
                  className="text-md flex items-center gap-3"
                >
                  <RiMailFill className="h-5 w-5" />{" "}
                  <span>{bootcampData?.email}</span>
                </Badge>
                <Badge
                  variant="default"
                  className="text-md flex items-center gap-3"
                >
                  <RiGlobalFill className="h-5 w-5" />{" "}
                  <span>{bootcampData?.website}</span>
                </Badge>
              </div>
              <div>
                <Badge
                  variant="default"
                  className="text-md flex items-center gap-3 w-fit"
                >
                  <RiMapPin2Fill className="h-5 w-5" />
                  <span>{bootcampData?.location?.formattedAddress}</span>
                </Badge>
              </div>
              {role === "user" && (
                <Button
                  variant="primary"
                  className="flex items-center gap-3 w-fit"
                  onClick={() =>
                    router.push(`/bootcamps/${bootcampId}/addReview`)
                  }
                >
                  <RiAddFill className="h-5 w-5" />
                  Add Review
                </Button>
              )}
            </div>
          </div>
        </div>
        {/** second row */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Courses
          </h2>
          <div className="py-6 grid grid-cols-4 gap-4">
            {courseData?.map((item) => (
              <Link
                href={`/bootcamps/${bootcampId}/courses/${item._id}`}
                key={item._id}
              >
                <CourseCard {...item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
