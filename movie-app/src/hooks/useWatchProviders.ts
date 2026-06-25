import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface CountryProviders {
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
}

interface WatchProvidersResponse {
  results: {
    [country: string]: CountryProviders;
  };
}

export const useWatchProviders = (id: number) => {
  return useQuery({
    queryKey: ["providers", id],
    queryFn: async (): Promise<WatchProvidersResponse> => {
      const response = await axiosInstance.get<WatchProvidersResponse>(
        `/movie/${id}/watch/providers`
      );
      return response.data;
    },
    enabled: !!id,
  });
};