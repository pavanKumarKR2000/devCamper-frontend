"use client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/TextArea";
import { schema } from "@/schemas/bootcamp";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreateBootcamp,
  useGetBootcampById,
  useUpdateBootcamp,
} from "@/api/bootcamp";
import { toast, useToast } from "@/hooks/useToast";
import { DevTool } from "@hookform/devtools";
import { TOAST_TIMEOUT } from "@/constants";
import { useParams } from "next/navigation";
import { Bootcamp } from "@/types/bootcamp";

const careersOptions = [
  {
    value: "Web Development",
    label: "Web Development",
  },
  {
    value: "Mobile Development",
    label: "Mobile Development",
  },
  {
    value: "UI/UX",
    label: "UI/UX",
  },
  {
    value: "Data Science",
    label: "Data Science",
  },
  {
    value: "Business",
    label: "Business",
  },
  {
    value: "Blockchain",
    label: "Blockchain",
  },
  {
    value: "Software Testing",
    label: "Software Testing",
  },
  {
    value: "Devops",
    label: "Devops",
  },
];

let default_values = {
  careers: [] as any,
  acceptGi: false,
  jobAssistance: false,
  jobGuarantee: false,
  housing: false,
};

const BootcampForm = () => {
  const { bootcampId } = useParams();
  const { data: bootcamp_data } = useGetBootcampById(bootcampId as string);
  const [defaultValues, setDefaultValues] = useState(default_values);
  const bootcampData = bootcamp_data?.data as Bootcamp;

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
    defaultValues,
    mode: "onChange",
  });

  const { toast } = useToast();

  const {
    mutate: createBootcamp,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    isPending: isCreatePending,
    error: createError,
  } = useCreateBootcamp();

  const {
    mutate: updateBootcamp,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    isPending: isUpdatePending,
    error: updateError,
  } = useUpdateBootcamp();

  useEffect(() => {
    if (bootcampId) {
      setMode("edit");
    } else {
      setMode("create");
    }
  }, [bootcampId]);

  useEffect(() => {
    if (bootcampData) {
      setValue("name", bootcampData.name);
      setValue("description", bootcampData.description);
      setValue("address", bootcampData.location.formattedAddress);
      setValue("cost", bootcampData.averageCost.toString());
      setValue("phone", bootcampData.phone);
      setValue("website", bootcampData.website);
      setValue("email", bootcampData.email);
      setValue("careers", bootcampData.careers as any);

      setDefaultValues({
        careers: bootcampData.careers.map((item) => ({
          value: item,
          label: item,
        })),
        acceptGi: bootcampData.acceptGi,
        jobAssistance: bootcampData.jobAssistance,
        jobGuarantee: bootcampData.jobGuarantee,
        housing: bootcampData.housing,
      });
    }
  }, [bootcampData, bootcampId]);

  useEffect(() => {
    if (isCreateSuccess) {
      toast({
        title: "Success",
        description: "Bootcamp has been created",
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
        description: "Bootcamp has been updated",
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

  const onCareersChange = (selected: any) => {

    const careers=selected ? selected.map((option: any) => option.value) : [];

    setValue(
      "careers",
      careers
    );

    setDefaultValues((prev)=>
        ({...prev,careers:selected}));

    if (selected.length === 0) {
      setError("careers", { message: "At least one option must be selected" });
    } else {
      setError("careers", { message: "" });
    }
  };

  const onHousingChange = (checked: boolean) => {
    setValue("housing", checked)
    setDefaultValues((prev)=>
        ({...prev,housing:checked}));
  };
  const onJobAssistanceChange = (checked: boolean) => {
    setValue("jobAssistance", checked);
    setDefaultValues((prev)=>
        ({...prev,jobAssistance:checked}));
  };
  const onJobGuaranteeChange = (checked: boolean) => {
    setValue("jobGuarantee", checked);
    setDefaultValues((prev)=>
        ({...prev,jobGuarantee:checked}));
  };
  const onAcceptGi = (checked: boolean) => {
    setValue("acceptGi", checked);
    setDefaultValues((prev)=>
        ({...prev,acceptGi:checked}));
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    if (mode === "create") {
      createBootcamp({ ...values, cost: parseInt(values.cost) });
    } else {
      updateBootcamp({
        body: { ...values, cost: parseInt(values.cost) },
        id: bootcampId as string,
      });
    }
  };

  return (
    <>
      <Card className=" w-[70%]">
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
          <h2 className="font-semibold text-lg italic pb-10 text-center">
            {mode === "create" ? "Create bootcamp" : "Edit bootcamp"}
          </h2>
          <div className="grid grid-cols-2 justify-items-stretch items-end gap-6">
            {/** name */}
            <div className="space-y-2 ">
              <Label htmlFor="name">Name</Label>
              <Input
                placeholder="Enter name"
                id="name"
                type="text"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name?.message}</p>
              )}
            </div>
            {/** website */}
            <div className="space-y-2">
              <Label htmlFor="website">Website Url</Label>
              <Input
                placeholder="Enter website Url"
                id="website"
                type="text"
                {...register("website", { required: true })}
              />
              {errors.website && (
                <p className="text-red-500">{errors.website?.message}</p>
              )}
            </div>
            {/** phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                placeholder="Enter Phone number"
                id="phone"
                type="text"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone?.message}</p>
              )}
            </div>
            {/** email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                placeholder="Enter Email address"
                id="email"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              {/** housing */}
              <div className="flex items-center gap-2">
                <Label htmlFor="housing">Housing</Label>
                <Checkbox
                  id="housing"
                  name="housing"
                  onCheckedChange={onHousingChange}
                  checked={defaultValues.housing}
                />
              </div>
              {/** job assistance */}
              <div className="flex items-center gap-2">
                <Label htmlFor="jobAssistance">Job assistance</Label>
                <Checkbox
                  id="jobAssistance"
                  name="jobAssistance"
                  onCheckedChange={onJobAssistanceChange}
                  checked={defaultValues.jobAssistance}
                />
              </div>
              {/** job guarantee */}
              <div className="flex items-center gap-2">
                <Label htmlFor="jobGuarantee">job guarantee</Label>
                <Checkbox
                  id="jobGuarantee"
                  name="jobGuarantee"
                  onCheckedChange={onJobGuaranteeChange}
                  checked={defaultValues.jobGuarantee}
                />
              </div>
              {/** acceptGi */}
              <div className="flex items-center gap-2">
                <Label htmlFor="acceptGi">accept gi</Label>
                <Checkbox
                  id="acceptGi"
                  name="acceptGi"
                  onCheckedChange={onAcceptGi}
                  checked={defaultValues.acceptGi}
                />
              </div>
            </div>
            {/** cost */}
            <div className="space-y-2">
              <Label htmlFor="cost">Cost</Label>
              <Input
                placeholder="Enter cost"
                id="cost"
                type="number"
                {...register("cost", { required: true })}
              />
              {errors.cost && (
                <p className="text-red-500">{errors.cost?.message}</p>
              )}
            </div>
            {/** address */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Adddress</Label>
              <Input
                placeholder="Enter Address"
                id="address"
                type="text"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address?.message}</p>
              )}
            </div>
            {/** careers */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="careers">Careers</Label>
              <Select
                isMulti
                value={defaultValues.careers}
                id="careers"
                name="careers"
                options={careersOptions}
                className="!text-sm"
                onChange={onCareersChange}
              />
              {errors.careers && (
                <p className="text-red-500">{errors.careers?.message}</p>
              )}
            </div>
            {/** description */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Enter description"
                id="description"
                rows={7}
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description?.message}</p>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full mt-6"
            type="submit"
            isLoading={isCreatePending || isUpdatePending}
            disabled={isCreatePending || isUpdatePending}
          >
            {mode === "create" ? "Publish bootcamp" : "Update bootcamp"}
          </Button>
          {/* {isError && <p className="text-red-500">{error.message}</p>} */}
        </form>
      </Card>
      <DevTool control={control} />
    </>
  );
};

export default BootcampForm;
