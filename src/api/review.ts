import {useMutation, useQuery} from "@tanstack/react-query";

export const useAddReview = () => {
  return useMutation({
    mutationFn: async ({
      body,
      bootcampId,
    }: {
      body: any;
      bootcampId: any;
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bootcamps/${bootcampId}/reviews`,
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

export const useGetReviews = (
    bootcampId: string | undefined
) => {
    return useQuery({
        queryKey: ["reviews", bootcampId],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/bootcamps/${bootcampId}/reviews`,
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

export const useGetReview = (
    id: string | undefined
) => {
    return useQuery({
        queryKey: ["reviews",id],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}`,
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
}

export const useDeleteReview = () => {
    return useMutation({
        mutationFn: async (id:string) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
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