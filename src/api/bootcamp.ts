import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetBootcamps = () => {
  return useQuery({
    queryKey: ["bootcamps"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bootcamps`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message ||
            errorResponse.error ||
            "Something went wrong",
        );
      }

      return res.json();
    },
  });
};

export const useGetBootcampById = (id: string) => {
  return useQuery({
    queryKey: ["bootcamp", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bootcamps/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message ||
            errorResponse.error ||
            "Something went wrong",
        );
      }

      return res.json();
    },
  });
};

export const useCreateBootcamp = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bootcamps`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message ||
            errorResponse.error ||
            "Something went wrong",
        );
      }

      return res.json();
    },
  });
};
