import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";
import { useFavorites } from "../hooks/useFavorites";
import { useTheme } from "../context/ThemeContext";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { isDark } = useTheme();
  const text = isDark ? "white" : "#1a1a2e";

  if (!movie) return null;

  return (
    <div
      style={{
        width: "140px",
        flexShrink: 0,
        cursor: "pointer",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{ position: "relative" }}
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : "https://via.placeholder.com/140x210?text=No+Image"
          }
          alt={movie.title}
          style={{
            width: "140px",
            height: "210px",
            objectFit: "cover",
            display: "block",
            borderRadius: "8px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "6px",
            backgroundColor: "rgba(0,0,0,0.75)",
            color: "gold",
            fontSize: "11px",
            padding: "2px 6px",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            isFavorite(movie.id)
              ? removeFavorite(movie.id)
              : addFavorite(movie);
          }}
          style={{
            position: "absolute",
            top: "6px",
            right: "6px",
            backgroundColor: "rgba(0,0,0,0.75)",
            border: "none",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isFavorite(movie.id) ? "❤️" : "🤍"}
        </button>
      </div>
      <p
        style={{
          margin: "6px 2px 0",
          fontSize: "12px",
          color: text,
          fontWeight: "bold",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {movie.title}
      </p>
      <p style={{ margin: "2px 2px 0", fontSize: "11px", color: "gray" }}>
        {movie.release_date?.slice(0, 4)}
      </p>
    </div>
  );
}
