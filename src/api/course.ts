import {useMutation, useQuery} from "@tanstack/react-query";

export const useGetCoursesByBootcampId = (id: string) => {
  return useQuery({
    queryKey: ["bootcamp", "courses", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bootcamps/${id}/courses`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message || errorResponse.error || "Something went wrong"
        );
      }

      return res.json();
    },
  });
};

export const useGetCourseById = (
  courseId: string,
  bootcampId: string | undefined
) => {
  return useQuery({
    enabled: !!courseId,
    queryKey: ["courses", courseId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${courseId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message || errorResponse.error || "Something went wrong"
        );
      }

      return res.json();
    },
  });
};

export const useAddCourse = () => {
  return useMutation({
    mutationFn: async ({
      body,
      bootcampId,
    }: {
      body: any;
      bootcampId: string;
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bootcamps/${bootcampId}/courses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message || errorResponse.error || "Something went wrong"
        );
      }

      return res.json();
    },
  });
};


export const useUpdateCourse = () => {
  return useMutation({
    mutationFn: async ({ body, courseId }: { body: any; courseId: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message || errorResponse.error || "Something went wrong"
        );
      }

      return res.json();
    },
  });
};


export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: async (courseId:string) => {
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${courseId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
            errorResponse.message || errorResponse.error || "Something went wrong"
        );
      }

      return res.json();
    },
  });
};