"use client";
import { useGetBootcampById } from "@/api/bootcamp";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import bootcampBanner from "../../../../public/coding-bootcamp.jpg";
import {
  RiStarFill,
  RiStarHalfLine,
  RiPhoneFill,
  RiMailFill,
  RiGlobalFill,
  RiMapPin2Fill,
} from "@remixicon/react";
import { Badge } from "@/components/ui/Badge";
import { Bootcamp } from "@/types/bootcamp";
import { useGetCoursesByBootcampId } from "@/api/course";
import { Course } from "@/types/course";
import CourseCard from "@/components/course/CourseCard";
import Link from "next/link";

const page = () => {
  const { bootcampId } = useParams();
  const { data: bootcamp_data } = useGetBootcampById(bootcampId as string);
  const bootcampData = bootcamp_data?.data as Bootcamp;

  const { data: course_data } = useGetCoursesByBootcampId(bootcampId as string);
  const courseData = course_data?.data as Course[];

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
              </div>

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
