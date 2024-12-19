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
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateBootcamp } from "@/api/bootcamp";
import { toast, useToast } from "@/hooks/useToast";
import { DevTool } from "@hookform/devtools";
import { TOAST_TIMEOUT } from "@/constants";

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
    value: "BlockChain",
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

const page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    control,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      careers: [],
      acceptGi: false,
      jobAssistance: false,
      jobGuarantee: false,
      housing: false,
    },
    mode: "onChange",
  });

  const { toast } = useToast();

  const { mutate, isSuccess, isError, isPending, error } = useCreateBootcamp();

  useEffect(() => {
    console.log("isError", isError);
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Bootcamp has been created",
        variant: "success",
        duration: TOAST_TIMEOUT,
      });
    } else if (isError) {
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
        duration: TOAST_TIMEOUT,
      });
    }
  }, [isSuccess, isError]);

  const onCareersChange = (selected: any) => {
    setValue(
      "careers",
      selected ? selected.map((option: any) => option.value) : [],
    );
    if (selected.length === 0) {
      setError("careers", { message: "At least one option must be selected" });
    } else {
      setError("careers", { message: "" });
    }
  };

  const onHousingChange = (checked: boolean) => {
    setValue("housing", checked);
  };
  const onJobAssistanceChange = (checked: boolean) => {
    setValue("jobAssistance", checked);
  };
  const onjobGuaranteeChange = (checked: boolean) => {
    setValue("jobGuarantee", checked);
  };
  const onAcceptGi = (checked: boolean) => {
    setValue("acceptGi", checked);
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
    console.log(errors);
    mutate(values);
  };

  return (
    <main>
      <div className="container mx-auto py-10 flex items-center justify-center min-h-screen">
        <Card className=" w-[70%]">
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
            <h2 className="font-semibold text-lg italic pb-10 text-center">
              Create bootcamp
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
                <Label htmlFor="email">Email adddress</Label>
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
                  />
                </div>
                {/** job assistance */}
                <div className="flex items-center gap-2">
                  <Label htmlFor="jobAssistance">Job assistance</Label>
                  <Checkbox
                    id="jobAssistance"
                    name="jobAssistance"
                    onCheckedChange={onJobAssistanceChange}
                  />
                </div>
                {/** job guarantee */}
                <div className="flex items-center gap-2">
                  <Label htmlFor="jobGuarantee">job guarantee</Label>
                  <Checkbox
                    id="jobGuarantee"
                    name="jobGuarantee"
                    onCheckedChange={onjobGuaranteeChange}
                  />
                </div>
                {/** acceptGi */}
                <div className="flex items-center gap-2">
                  <Label htmlFor="acceptGi">accept gi</Label>
                  <Checkbox
                    id="acceptGi"
                    name="acceptGi"
                    onCheckedChange={onAcceptGi}
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
              isLoading={isPending}
              disabled={isPending}
            >
              Publish bootcamp
            </Button>
            {/* {isError && <p className="text-red-500">{error.message}</p>} */}
          </form>
        </Card>
        <DevTool control={control} />
      </div>
    </main>
  );
};

export default page;
