import CourseForm from "@/components/course/CourseForm";
import React from "react";

const page = () => {
  return (
    <main>
      <div className="container mx-auto py-10 flex items-center justify-center min-h-screen">
        <CourseForm />
      </div>
    </main>
  );
};

export default page;