import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import type { VideoResponse } from "../types/movie";


export const useMovieVideos = (id: number) => {
    return useQuery({
        queryKey: ["videos", id],
        queryFn: async(): Promise<VideoResponse> => {
            const response = await axiosInstance.get<VideoResponse>(`/movie/${id}/videos`);
            return response.data;
        },
        enabled: !!id,
    });
};