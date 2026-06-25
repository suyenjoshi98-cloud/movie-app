import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import type { MovieResponse } from "../types/movie";

export const useTrending = () => {
    return useQuery({
        queryKey: ["trending"],
        queryFn: async(): Promise<MovieResponse> => {
            const response = await axiosInstance.get<MovieResponse>("/trending/movie/week");
            return response.data;
        },
    });
};