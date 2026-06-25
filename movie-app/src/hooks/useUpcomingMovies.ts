import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import type { MovieResponse } from "../types/movie";

export const useUpcomingMovies = () => {
    return useQuery({
        queryKey: ["upcoming"],
        queryFn: async (): Promise<MovieResponse> => {
            const response = await axiosInstance.get<MovieResponse>("/movie/upcoming");
            return response.data;
        },
    });
};