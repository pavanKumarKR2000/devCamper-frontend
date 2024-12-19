"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import courseBanner from "../../../../../../public/course.jpg";
import React from "react";
import { useGetCoursesById } from "@/api/course";
import { Course } from "@/types/course";
import { Badge } from "@/components/ui/Badge";
import {
  RiTimeFill,
  RiMoneyDollarCircleFill,
  RiStairsFill,
  RiHandCoinFill,
  RiMapPin2Fill,
  RiTentFill,
} from "@remixicon/react";
import { useGetBootcampById } from "@/api/bootcamp";
import { Bootcamp } from "@/types/bootcamp";

const page = () => {
  const { courseId, bootcampId } = useParams();
  const { data: course_data } = useGetCoursesById(courseId as string);
  const courseData = course_data?.data as Course;

  const { data: bootcamp_data } = useGetBootcampById(bootcampId as string);
  const bootcampData = bootcamp_data?.data as Bootcamp;

  return (
    <main>
      <div className="container mx-auto py-10 space-y-10">
        {/** first row */}
        <div className="">
          <div className="flex items-srart gap-10">
            {/** first column */}
            <div className="relative w-[40%]">
              <div className="absolute inset-0  bg-gradient-to-r from-slate-200 via-transparent to-slate-200 " />
              <div className="absolute inset-0  bg-gradient-to-b from-slate-200 via-transparent to-slate-200" />
              <Image
                src={courseBanner}
                alt="bootcamp banner image"
                className="rounded-lg w-full h-full"
              />
            </div>

            {/** second column */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                {courseData?.title}
              </h2>

              <p className="mt-2 text-md leading-6 text-gray-900 dark:text-gray-50">
                {courseData?.description}
              </p>

              <div className="flex items-center gap-2">
                <Badge
                  variant="success"
                  className="text-md flex items-center gap-3"
                >
                  <RiStairsFill className="h-5 w-5" />
                  <span>{courseData?.minimumSkill}</span>
                </Badge>
                <Badge
                  variant="default"
                  className="text-md flex items-center gap-3"
                >
                  <RiTimeFill className="h-5 w-5" />{" "}
                  <span>{courseData?.weeks} weeks</span>
                </Badge>
                <Badge
                  variant="default"
                  className="text-md flex items-center gap-3"
                >
                  <RiMoneyDollarCircleFill className="h-5 w-5" />{" "}
                  <span>${courseData?.tuition}</span>
                </Badge>
                <Badge
                  variant="default"
                  className="text-md flex items-center gap-3"
                >
                  <RiHandCoinFill className="h-5 w-5" />{" "}
                  <span>
                    {courseData?.scholarshipAvailable
                      ? "Scholarship available"
                      : "Scholarship not available"}
                  </span>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="success"
                  className="text-md flex items-center gap-3"
                >
                  <RiTentFill className="h-5 w-5" />
                  <span>{bootcampData?.name}</span>
                </Badge>
                <Badge
                  variant="default"
                  className="text-md flex items-center gap-3"
                >
                  <RiMapPin2Fill className="h-5 w-5" />
                  <span>{bootcampData?.location.formattedAddress}</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
