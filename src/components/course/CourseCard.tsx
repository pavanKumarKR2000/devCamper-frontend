import React from "react";
import {Card} from "../ui/Card";
import Image from "next/image";
import courseBanner from "../../../public/course.jpg";
import {Course} from "@/types/course";

interface BootcampCardProps extends Course {}

const CourseCard = (props: BootcampCardProps) => {
  //   const hasHalfStar =
  //     props.averageRating - Math.floor(props.averageRating) > 0 ? true : false;

  return (
    <Card className="mx-auto h-[500px] max-w-lg space-y-4">
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
    </Card>
  );
};

export default CourseCard;
