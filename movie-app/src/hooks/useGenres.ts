import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

interface Genre { 
    id: number;
    name: string;
}

interface GenreResponse {
     genres: Genre[];

}

export const useGenres = () => {
    return useQuery ({
        queryKey: ["genres"],
        queryFn: async (): Promise<GenreResponse> => {
            const response = await axiosInstance.get<GenreResponse>("/genre/movie/list");
            return response.data;
        },
    });
};