import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import type { MovieResponse } from "../types/movie";

export const useSimilarMovies = (id: number) => {
  return useQuery({
    queryKey: ["similar", id],
    queryFn: async (): Promise<MovieResponse> => {
      const response = await axiosInstance.get<MovieResponse>(`/movie/${id}/similar`);
      return response.data;
    },
    enabled: !!id,
  });
};