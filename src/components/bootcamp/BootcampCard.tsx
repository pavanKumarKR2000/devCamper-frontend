import React from "react";
import { Card } from "../ui/Card";
import { Bootcamp } from "@/types/bootcamp";
import Image from "next/image";
import bootcampBanner from "../../../public/coding-bootcamp.jpg";
import { RiStarFill, RiStarHalfLine } from "@remixicon/react";

interface BootcampCardProps extends Bootcamp {}

const BootcampCard = (props: BootcampCardProps) => {
  const hasHalfStar =
    props.averageRating - Math.floor(props.averageRating) > 0 ? true : false;

  return (
    <Card className="mx-auto max-w-lg space-y-4 h-[460px]">
      <Image
        src={bootcampBanner}
        alt="bootcamp banner image"
        className="rounded-lg"
      />

      <h3 className="font-semibold text-gray-900 dark:text-gray-50">
        {props.name}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-900 dark:text-gray-50">
        {props.description}
      </p>
      {props.averageRating && (
        <div className="flex items-center gap-2">
          <span className="text-sm dark:text-white">
            Rating ({props.averageRating})
          </span>
          {Array(Math.floor(props.averageRating))
            .fill(0)
            .map((item, index) => (
              <RiStarFill className="h-4 w-4 dark:text-white" key={index} />
            ))}
          {hasHalfStar && (
            <RiStarHalfLine className="h-4 w-4 dark:text-white" />
          )}
        </div>
      )}
    </Card>
  );
};

export default BootcampCard;
