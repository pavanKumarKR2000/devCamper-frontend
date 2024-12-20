"use client";
import { useLogout } from "@/api/auth";
import { useGetBootcamps } from "@/api/bootcamp";
import BootcampCard from "@/components/bootcamp/BootcampCard";
import { useUserStore } from "@/stores/userStore";
import { Bootcamp } from "@/types/bootcamp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { data } = useGetBootcamps();
  const { role, _id } = useUserStore((state) => state);
  const bootcampData = data?.data as Bootcamp[] | undefined;

  return (
    <main>
      <div className="container mx-auto space-y-6 py-10">
        <h2 className="italic font-medium text-2xl dark:text-white">
          Bootcamps
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {role === "user"
            ? bootcampData?.map((item) => (
                <Link key={item.id} href={`/bootcamps/${item.id}`}>
                  <BootcampCard {...item} />
                </Link>
              ))
            : bootcampData
                ?.filter((item) => item.user === _id)
                .map((item) => (
                  <Link key={item.id} href={`/bootcamps/${item.id}`}>
                    <BootcampCard {...item} />
                  </Link>
                ))}
        </div>
      </div>
    </main>
  );
};

export default page;
