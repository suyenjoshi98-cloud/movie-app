import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import type { MovieResponse } from "../types/movie";

export const usePopular = () => {
    return useQuery ({
        queryKey: ["popular"],
        queryFn: async() =>  {
            const response = await axiosInstance.get<MovieResponse>("/movie/popular");
            return response.data;
        },
    });
};