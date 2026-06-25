import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import type { MovieResponse } from "../types/movie";

const fetchMovies = async (search: string): Promise<MovieResponse> => {
  const response = await axiosInstance.get<MovieResponse>("/search/movie", {
    params: { query: search },
  });
  return response.data;
};

export const useMovies = (search: string) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [search]);

  return useQuery({
    queryKey: ["movies", debouncedSearch],
    queryFn: () => fetchMovies(debouncedSearch),
    enabled: debouncedSearch.length > 2,
  });
};