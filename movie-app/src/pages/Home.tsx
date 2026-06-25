import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrending } from "../hooks/useTrending";
import { usePopular } from "../hooks/usePopular";
import { useGenres } from "../hooks/useGenres";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";
import { useTheme } from "../context/ThemeContext";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { data: trending, isLoading: trendingLoading } = useTrending();
  const { data: popular, isLoading: popularLoading } = usePopular();
  const { data: genres } = useGenres();
  const { data: suggestions } = useMovies(search);
  const { isDark } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${search}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: isDark ? "#0f0f1a" : "#f0f0f0",
        minHeight: "100vh",
        color: isDark ? "white" : "#1a1a2e",
      }}
    >
      {/* Hero Banner */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/hero.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          padding: "120px 40px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "40px", margin: "40px 0 10px", color: "white" }}>
          Welcome to CineSearch 🎬
        </h1>
        <p style={{ fontSize: "18px", color: "#ccc", marginBottom: "30px" }}>
          Millions of movies to discover. Explore now.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            gap: "10px",
            maxWidth: "600px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div style={{ flex: 1, position: "relative" }}>
            <input
              type="text"
              placeholder="Search for a movie..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              style={{
                width: "100%",
                padding: "15px 20px",
                borderRadius: "30px",
                border: "none",
                fontSize: "16px",
                backgroundColor: "white",
                color: "#1a1a2e",
                outline: "none",
              }}
            />
            {/* Suggestions Dropdown */}
            {showSuggestions &&
              search &&
              suggestions?.results &&
              suggestions.results.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: isDark ? "#1a1a2e" : "#ffffff",
                    borderRadius: "8px",
                    zIndex: 100,
                    maxHeight: "300px",
                    overflowY: "auto",
                    border: "1px solid #333",
                    textAlign: "left",
                  }}
                >
                  {suggestions.results.slice(0, 6).map((movie: Movie) => (
                    <div
                      key={movie.id}
                      onClick={() => {
                        setShowSuggestions(false);
                        navigate(`/movie/${movie.id}`);
                      }}
                      style={{
                        padding: "10px 15px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        borderBottom: "1px solid #333",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#2a2a3e")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w45${movie.poster_path}`
                            : "https://via.placeholder.com/45x67"
                        }
                        alt={movie.title}
                        style={{ width: "35px", borderRadius: "4px" }}
                      />
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "14px",
                            color: isDark ? "white" : "#1a1a2e",
                          }}
                        >
                          {movie.title}
                        </p>
                        <p
                          style={{ margin: 0, fontSize: "11px", color: "gray" }}
                        >
                          {movie.release_date?.slice(0, 4)} • ⭐{" "}
                          {movie.vote_average?.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* Show More */}
                  <div
                    onClick={() => {
                      setShowSuggestions(false);
                      navigate(`/search?q=${search}`);
                    }}
                    style={{
                      padding: "12px 15px",
                      cursor: "pointer",
                      textAlign: "center",
                      color: "#e74c3c",
                      fontWeight: "bold",
                      fontSize: "14px",
                      borderTop: "1px solid #333",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#2a2a3e")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    🔍 Show all results for "{search}"
                  </div>
                </div>
              )}
          </div>
          <button
            type="submit"
            style={{
              padding: "15px 30px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Search
          </button>
        </form>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>
        {/* Genres */}
        <h2 style={{ color: isDark ? "white" : "#1a1a2e" }}>
          🎭 Browse by Genre
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          {genres?.genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => navigate(`/genre/${genre.id}?name=${genre.name}`)}
              style={{
                padding: "8px 16px",
                backgroundColor: isDark ? "#1a1a2e" : "#ffffff",
                color: isDark ? "white" : "#1a1a2e",
                border: "1px solid #333",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Trending */}
        <h2 style={{ color: isDark ? "white" : "#1a1a2e" }}>
          🔥 Trending This Week
        </h2>
        {trendingLoading ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "30px",
            }}
          >
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "30px",
            }}
          >
            {trending?.results.slice(0, 8).map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* Popular */}
        <h2 style={{ color: isDark ? "white" : "#1a1a2e" }}>
          ⭐ Popular Movies
        </h2>
        {popularLoading ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {popular?.results.slice(0, 8).map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
