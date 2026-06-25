import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import type { MovieResponse } from "../types/movie";

export const moodGenres: Record<string, { emoji: string; genres: number[] }> = {
  Happy: { emoji: "😊", genres: [35, 16] },
  Sad: { emoji: "😢", genres: [18, 10749] },
  Scared: { emoji: "😱", genres: [27, 53] },
  Excited: { emoji: "🤩", genres: [28, 12] },
  Thoughtful: { emoji: "🤔", genres: [99, 9648] },
  Romantic: { emoji: "😍", genres: [10749, 18] },
  Funny: { emoji: "😂", genres: [35] },
};

export const useMoodMovies = (genreIds: number[]) => {
  return useQuery({
    queryKey: ["mood", genreIds],
    queryFn: async (): Promise<MovieResponse> => {
      const response = await axiosInstance.get<MovieResponse>("/discover/movie", {
        params: {
          with_genres: genreIds.join(","),
          sort_by: "popularity.desc",
        },
      });
      return response.data;
    },
    enabled: genreIds.length > 0,
  });
};