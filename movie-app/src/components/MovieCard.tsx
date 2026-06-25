import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";
import { useFavorites } from "../hooks/useFavorites";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  return (
    <div style={{
      border: "1px solid #333",
      borderRadius: "8px",
      width: "200px",
      backgroundColor: "#16213e",
      cursor: "pointer",
      overflow: "hidden",
    }}>
      <img
        src={movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : "https://via.placeholder.com/200x300?text=No+Image"}
        alt={movie.title}
        onClick={() => navigate(`/movie/${movie.id}`)}
        style={{ width: "100%", display: "block" }}
      />
      <div style={{ padding: "10px" }}>
        <h3 style={{ fontSize: "14px", color: "white", margin: "0 0 5px" }}>
          {movie.title}
        </h3>
        <p style={{ fontSize: "12px", color: "gold", margin: "0 0 5px" }}>
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
        <p style={{ fontSize: "11px", color: "gray", margin: "0 0 8px" }}>
          {movie.release_date?.slice(0, 4)}
        </p>
        <button
          onClick={() => isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie)}
          style={{
            width: "100%",
            padding: "5px",
            backgroundColor: isFavorite(movie.id) ? "#e74c3c" : "#333",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          {isFavorite(movie.id) ? "❤️ Remove" : "🤍 Favorite"}
        </button>
      </div>
    </div>
  );
}