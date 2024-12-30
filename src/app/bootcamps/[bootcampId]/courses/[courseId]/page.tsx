"use client";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import courseBanner from "../../../../../../public/course.jpg";
import React, {useEffect} from "react";
import {useDeleteCourse, useGetCourseById} from "@/api/course";
import {Course} from "@/types/course";
import {Badge} from "@/components/ui/Badge";
import {
  RiDeleteBin6Fill,
  RiEditFill,
  RiHandCoinFill,
  RiMapPin2Fill,
  RiMoneyDollarCircleFill,
  RiStairsFill,
  RiTentFill,
  RiTimeFill,
} from "@remixicon/react";
import {useGetBootcampById} from "@/api/bootcamp";
import {Bootcamp} from "@/types/bootcamp";
import {TOAST_TIMEOUT} from "@/constants";
import {useToast} from "@/hooks/useToast";
import {Button} from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import {useUserStore} from "@/stores/userStore";

const page = () => {
  const { courseId, bootcampId } = useParams();
  const router=useRouter();
  const {toast}=useToast();

  const { data: course_data } = useGetCourseById(
    courseId as string,
    bootcampId as string | undefined
  );
  const courseData = course_data?.data as Course;

  const {mutate,isSuccess,isError,error,isPending}=useDeleteCourse();

  const { data: bootcamp_data } = useGetBootcampById(bootcampId as string);
  const bootcampData = bootcamp_data?.data as Bootcamp;

  const { _id: userId, role } = useUserStore((state) => state);
  const publisherId = bootcampData?.user;

  const handleDelete = () => {
    mutate(courseId as string);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Course has been deleted",
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
  }, [isError, isSuccess]);


  return (
    <main>
      <div className="container mx-auto py-10 space-y-10">
        {/** first row */}
        <div className="w-full">
          <div className="flex items-start gap-10">
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
            <div className="flex flex-col gap-6 w-[60%]">
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
                  <RiStairsFill className="h-5 w-5"/>
                  <span>{courseData?.minimumSkill}</span>
                </Badge>
                <Badge
                    variant="default"
                    className="text-md flex items-center gap-3"
                >
                  <RiTimeFill className="h-5 w-5"/>{" "}
                  <span>{courseData?.weeks} weeks</span>
                </Badge>
                <Badge
                    variant="default"
                    className="text-md flex items-center gap-3"
                >
                  <RiMoneyDollarCircleFill className="h-5 w-5"/>{" "}
                  <span>${courseData?.tuition}</span>
                </Badge>
                <Badge
                    variant="default"
                    className="text-md flex items-center gap-3"
                >
                  <RiHandCoinFill className="h-5 w-5"/>{" "}
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
                  <RiTentFill className="h-5 w-5"/>
                  <span>{bootcampData?.name}</span>
                </Badge>
                <Badge
                    variant="default"
                    className="text-md flex items-center gap-3"
                >
                  <RiMapPin2Fill className="h-5 w-5"/>
                  <span>{bootcampData?.location.formattedAddress}</span>
                </Badge>
              </div>
              {userId===publisherId&&<div className="flex items-center gap-2">
                <Button variant="primary" className="flex items-center gap-2"
                        onClick={() => router.push(`/bootcamps/${bootcampId}/courses/${courseId}/edit`)}>
                  <RiEditFill className="h-5 w-5"/>
                  Edit course
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                        variant="destructive"
                        className="flex items-center gap-2"
                    >
                      <RiDeleteBin6Fill className="h-5 w-5"/>
                      Delete course
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure to delete this course
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
                        <RiDeleteBin6Fill className="h-5 w-5"/>
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
