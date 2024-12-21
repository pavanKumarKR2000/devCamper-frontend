"use client";
import BootcampForm from "@/components/bootcamp/BootcampForm";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { bootcampId } = useParams();
  return (
    <main>
      <div className="container mx-auto py-10 flex items-center justify-center min-h-screen">
        <BootcampForm />
      </div>
    </main>
  );
};

export default page;
