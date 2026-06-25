import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import type { CreditsResponse } from "../types/movie";

export const useMovieCredits = (id: number) => {
  return useQuery({
    queryKey: ["credits", id],
    queryFn: async (): Promise<CreditsResponse> => {
      const response = await axiosInstance.get<CreditsResponse>(`/movie/${id}/credits`);
      return response.data;
    },
    enabled: !!id,
  });
};