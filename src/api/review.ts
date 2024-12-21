import { useMutation } from "@tanstack/react-query";

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
