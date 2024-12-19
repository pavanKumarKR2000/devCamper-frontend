import React from "react";
import { Card } from "../ui/Card";
import { Bootcamp } from "@/types/bootcamp";
import Image from "next/image";
import courseBanner from "../../../public/course.jpg";
import { RiStarFill, RiStarHalfLine } from "@remixicon/react";
import { Course } from "@/types/course";

interface BootcampCardProps extends Course {}

const CourseCard = (props: BootcampCardProps) => {
  //   const hasHalfStar =
  //     props.averageRating - Math.floor(props.averageRating) > 0 ? true : false;

  return (
    <Card className="mx-auto max-w-lg space-y-4 bg-gradient-to-b from-slate-50 to-gray-300 dark:bg-gradient-to-b dark:from-black dark:to-black">
      <Image
        src={courseBanner}
        alt="course banner image"
        className="rounded-lg"
      />
      <h3 className="font-semibold text-gray-900 dark:text-gray-50">
        {props.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-900 dark:text-gray-50">
        {props.description}
      </p>
      {/* <div className="flex items-center gap-2">
        <span className="text-sm dark:text-white">
          Rating ({props.})
        </span>
        {Array(Math.floor(props.averageRating))
          .fill(0)
          .map((item, index) => (
            <RiStarFill className="h-4 w-4 dark:text-white" key={index} />
          ))}
        {hasHalfStar && <RiStarHalfLine className="h-4 w-4 dark:text-white" />}
      </div> */}
    </Card>
  );
};

export default CourseCard;
