import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    runtime: number;
    budget: number;
    revenue: number;
    genres: { id: number; name: string

    } [];
    tagline: string;
}

export const useMovieDetail = (id: number) => {
    return useQuery({
        queryKey: ["movie", id],
        queryFn: async (): Promise<MovieDetail> => {
            const response = await axiosInstance.get<MovieDetail>(`/movie/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
};
