import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import type { ReviewResponse } from "../types/movie";

export const useMovieReviews = (id: number) => {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: async (): Promise<ReviewResponse> => {
      const response = await axiosInstance.get<ReviewResponse>(`/movie/${id}/reviews`);
      return response.data;
    },
    enabled: !!id,
  });
};