import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div style={{ backgroundColor: "#0f0f1a", minHeight: "100vh", color: "white", padding: "20px" }}>
      <h2>❤️ My Favorites</h2>
      {favorites.length === 0 && <p>No favorites yet! Add some movies.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {favorites.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}