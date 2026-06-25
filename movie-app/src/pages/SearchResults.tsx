import { useSearchParams } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data, isLoading, isError } = useMovies(query);

  return (
    <div style={{ backgroundColor: "#0f0f1a", minHeight: "100vh", color: "white", padding: "20px" }}>
      <h2>Search Results for: "{query}"</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching movies!</p>}
      {data?.results.length === 0 && <p>No movies found!</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {data?.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}