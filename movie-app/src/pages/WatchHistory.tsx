import { useWatchHistory } from "../hooks/useWatchHistory";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import type { WatchedMovie } from "../hooks/useWatchHistory";

export default function WatchHistory() {
  const { history, removeFromHistory, clearHistory } = useWatchHistory();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const bg = isDark ? "#0f0f1a" : "#f0f0f0";
  const card = isDark ? "#1a1a2e" : "#ffffff";
  const text = isDark ? "white" : "#1a1a2e";

  return (
    <div
      style={{
        backgroundColor: bg,
        minHeight: "100vh",
        color: text,
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h1 style={{ margin: 0 }}>🕐 Watch History</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              color: "#e74c3c",
              border: "1px solid #e74c3c",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            🗑️ Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <p style={{ fontSize: "48px" }}>🎬</p>
          <p style={{ color: "gray", fontSize: "16px" }}>
            No watch history yet.
          </p>
          <p style={{ color: "gray", fontSize: "14px" }}>
            Movies you mark as watched will appear here.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "16px",
              padding: "10px 24px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {history.map((movie: WatchedMovie) => (
            <div
              key={`${movie.id}-${movie.watchedAt}`}
              style={{
                backgroundColor: card,
                borderRadius: "12px",
                padding: "12px 16px",
                display: "flex",
                gap: "16px",
                alignItems: "center",
                border: "1px solid #2a2a4a",
              }}
            >
              {/* Poster */}
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                    : "https://via.placeholder.com/60x90?text=No+Image"
                }
                alt={movie.title}
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{
                  width: "60px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />

              {/* Info */}
              <div
                style={{ flex: 1, cursor: "pointer" }}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <h3 style={{ margin: "0 0 4px", fontSize: "16px" }}>
                  {movie.title}
                </h3>
                <p
                  style={{ margin: "0 0 4px", color: "gold", fontSize: "13px" }}
                >
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>
                <p style={{ margin: 0, color: "gray", fontSize: "12px" }}>
                  📅 {movie.release_date}
                </p>
              </div>

              {/* Watched At */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p
                  style={{ margin: "0 0 8px", color: "gray", fontSize: "11px" }}
                >
                  Watched{" "}
                  {new Date(movie.watchedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <button
                  onClick={() => removeFromHistory(movie.id)}
                  style={{
                    padding: "4px 10px",
                    backgroundColor: "transparent",
                    color: "#e74c3c",
                    border: "1px solid #e74c3c",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "11px",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
