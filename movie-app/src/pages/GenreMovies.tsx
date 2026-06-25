import { useSearchParams, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import MovieCard from "../components/MovieCard";
import type { Movie, MovieResponse } from "../types/movie";

export default function GenreMovies() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "Genre";

  const { data, isLoading } = useQuery({
    queryKey: ["genre", id],
    queryFn: async (): Promise<MovieResponse> => {
      const response = await axiosInstance.get<MovieResponse>("/discover/movie", {
        params: { with_genres: id },
      });
      return response.data;
    },
  });

  return (
    <div style={{ backgroundColor: "#0f0f1a", minHeight: "100vh", color: "white", padding: "20px" }}>
      <h2>🎭 {name} Movies</h2>
      {isLoading && <p>Loading...</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {data?.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}