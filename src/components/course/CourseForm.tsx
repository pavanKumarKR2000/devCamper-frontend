"use client";
import {Button} from "@/components/ui/Button";
import {Card} from "@/components/ui/Card";
import {Checkbox} from "@/components/ui/Checkbox";
import {Input} from "@/components/ui/Input";
import {Label} from "@/components/ui/Label";
import {Textarea} from "@/components/ui/TextArea";
import {schema} from "@/schemas/course";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useToast} from "@/hooks/useToast";
import {DevTool} from "@hookform/devtools";
import {TOAST_TIMEOUT} from "@/constants";
import {useParams} from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "../ui/Select";
import {useAddCourse, useGetCourseById, useUpdateCourse} from "@/api/course";
import {Course} from "@/types/course";

const minimumSkillOptions = [
  {
    value: "beginner",
    label: "beginner",
  },
  {
    value: "intermediate",
    label: "intermediate",
  },
  {
    value: "advanced",
    label: "advanced",
  },
];

let default_values = {
  minimumSkill:"" as string,
  scholarshipAvailable:false as boolean,
};

const CourseForm = () => {
  const { courseId, bootcampId } = useParams();
  const { data: course_data } = useGetCourseById(
    courseId as string,
    bootcampId as string | undefined
  );
  const [defaultValues, setDefaultValues] = useState(default_values);
  const courseData = course_data?.data as Course;

  const [mode, setMode] = useState<"create" | "edit">("create");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    control,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:{
      scholarshipAvailable: false,
    },
    mode: "onChange",
  });

  const { toast } = useToast();

  const {
    mutate: createCourse,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    isPending: isCreatePending,
    error: createError,
  } = useAddCourse();

  const {
    mutate: updateCourse,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    isPending: isUpdatePending,
    error: updateError,
  } = useUpdateCourse();

  useEffect(() => {
    if (courseId) {
      setMode("edit");
    } else {
      setMode("create");
    }
  }, [courseId]);

  useEffect(() => {
    if (courseData) {
      setValue("title",courseData.title);
      setValue("weeks",courseData.weeks.toString());
      setValue("tuition", courseData.tuition.toString());
      setValue("description",courseData.description);
      setValue("minimumSkill",courseData.minimumSkill as any);
      setValue("scholarshipAvailable",courseData.scholarshipAvailable);
      console.log("minimum skill",courseData.minimumSkill);
      setDefaultValues({
        minimumSkill:courseData.minimumSkill,
        scholarshipAvailable:courseData.scholarshipAvailable,
      });
    }
  }, [courseData, courseId]);

  useEffect(() => {
    if (isCreateSuccess) {
      toast({
        title: "Success",
        description: "Course has been created",
        variant: "success",
        duration: TOAST_TIMEOUT,
      });
    } else if (isCreateError) {
      toast({
        title: "Error",
        description: createError.message,
        variant: "error",
        duration: TOAST_TIMEOUT,
      });
    }
  }, [isCreateSuccess, isCreateError]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Success",
        description: "Course has been updated",
        variant: "success",
        duration: TOAST_TIMEOUT,
      });
    } else if (isUpdateError) {
      toast({
        title: "Error",
        description: updateError.message,
        variant: "error",
        duration: TOAST_TIMEOUT,
      });
    }
  }, [isUpdateSuccess, isUpdateError]);

  const handleMinimumSkillChange = (
    value: "beginner" | "intermediate" | "advanced"
  ) => {
    setValue("minimumSkill", value);
    setDefaultValues((prev)=>({...prev, minimumSkill:value}));

    if (!value) {
      setError("minimumSkill", { message: "Minimum skill is required" });
    } else {
      setError("minimumSkill", { message: "" });
    }
  };

  const onScholarshipAvailableChange = (checked: boolean) => {
    setValue("scholarshipAvailable", checked);
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    if (mode === "create") {
      createCourse({
        body: {
          ...values,
          tuition: parseInt(values.tuition),
          weeks: parseInt(values.weeks),
        },
        bootcampId: bootcampId as string,
      });
    } else {
      updateCourse({
        body: {
          ...values,
          tuition: parseInt(values.tuition),
          weeks: parseInt(values.weeks),
        },
        courseId: courseId as string,
      });
    }
  };

  return (
    <>
      <Card className=" w-[70%]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="font-semibold text-lg italic pb-10 text-center">
            {mode === "create" ? "Create course" : "Edit course"}
          </h2>
          <div className="grid grid-cols-2 justify-items-stretch items-end gap-6">
            {/** title */}
            <div className="space-y-2 ">
              <Label htmlFor="name">Title</Label>
              <Input
                placeholder="Enter title"
                id="title"
                type="text"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title?.message}</p>
              )}
            </div>

            {/** weeks */}
            <div className="space-y-2">
              <Label htmlFor="weeks">Weeks</Label>
              <Input
                placeholder="Enter weeks"
                id="weeks"
                type="text"
                {...register("weeks", { required: true })}
              />
              {errors.weeks && (
                <p className="text-red-500">{errors.weeks?.message}</p>
              )}
            </div>
            {/** tuition */}
            <div className="space-y-2">
              <Label htmlFor="tuition">Tuition</Label>
              <Input
                placeholder="Enter tuition fees"
                id="tuition"
                type="number"
                {...register("tuition", { required: true })}
              />
              {errors.tuition && (
                <p className="text-red-500">{errors.tuition?.message}</p>
              )}
            </div>
            {/** minimum skills */}
            <div className="space-y-2">
              <Label htmlFor="minimumSkill">Minimum skills</Label>
              <Select
                onValueChange={handleMinimumSkillChange}
                name="minimumSkill"
                value={defaultValues.minimumSkill}
              >
                <SelectTrigger id="minimumSkill" className="!translate-y-0" >
                  <SelectValue placeholder="Select minimum skill" defaultValue={defaultValues.minimumSkill} />
                </SelectTrigger>
                <SelectContent>
                  {minimumSkillOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.minimumSkill && (
                <p className="text-red-500">{errors.minimumSkill?.message}</p>
              )}
            </div>
            {/** description */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Enter Description"
                id="description"
                rows={5}
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description?.message}</p>
              )}
            </div>
            {/** scholarship available */}
            <div className="flex items-center gap-2">
              <Label htmlFor="scholarshipAvailable">
                Scholarship available
              </Label>
              <Checkbox
                id="scholarshipAvailable"
                name="scholarshipAvailable"
                onCheckedChange={onScholarshipAvailableChange}
                checked={defaultValues.scholarshipAvailable}
              />
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full mt-6"
            type="submit"
            isLoading={isCreatePending || isUpdatePending}
            disabled={isCreatePending || isUpdatePending}
          >
            {mode === "create" ? "Publish course" : "Update course"}
          </Button>
          {/* {isError && <p className="text-red-500">{error.message}</p>} */}
        </form>
      </Card>
      <DevTool control={control} />
    </>
  );
};

export default CourseForm;
