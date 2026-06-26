import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const POPULAR_MOVIES = [
  "The Dark Knight",
  "Inception",
  "Interstellar",
  "Parasite",
  "The Shawshank Redemption",
  "Pulp Fiction",
  "The Godfather",
  "Fight Club",
  "Forrest Gump",
  "The Matrix",
  "Avengers: Endgame",
  "Spider-Man: No Way Home",
  "Oppenheimer",
  "Dune",
  "Joker",
];

interface Recommendation {
  title: string;
  year: string;
  reason: string;
  genre: string;
  rating: string;
}

export default function AIRecommender() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  const [customMovie, setCustomMovie] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mood, setMood] = useState("");

  const bg = isDark ? "#0f0f1a" : "#f0f0f0";
  const card = isDark ? "#1a1a2e" : "#ffffff";
  const text = isDark ? "white" : "#1a1a2e";

  const toggleMovie = (movie: string) => {
    setSelectedMovies((prev) =>
      prev.includes(movie)
        ? prev.filter((m) => m !== movie)
        : prev.length < 5
          ? [...prev, movie]
          : prev,
    );
  };

  const addCustomMovie = () => {
    const trimmed = customMovie.trim();
    if (
      trimmed &&
      !selectedMovies.includes(trimmed) &&
      selectedMovies.length < 5
    ) {
      setSelectedMovies((prev) => [...prev, trimmed]);
      setCustomMovie("");
    }
  };

  const getRecommendations = async () => {
    if (selectedMovies.length === 0) return;
    setIsLoading(true);
    setError("");
    setRecommendations([]);

    const prompt = `You are a movie expert. Based on these movies the user loves: ${selectedMovies.join(", ")}${mood ? `. Their current mood is: ${mood}` : ""}.

Recommend exactly 6 movies they would enjoy. Respond ONLY with a JSON array, no markdown, no explanation, no backticks, just raw JSON like this:
[{"title":"Movie Name","year":"2023","reason":"Why they'd love it based on their picks","genre":"Action/Drama","rating":"8.5/10"}]`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "CineSearch",
          },
          body: JSON.stringify({
            model: "nvidia/nemotron-nano-9b-v2:free",
            messages: [{ role: "user", content: prompt }],
          }),
        },
      );

      clearTimeout(timeout);
      const data = await response.json();
      console.log("OpenRouter response:", data);

      if (!response.ok) {
        setError(`API Error: ${data?.error?.message || response.statusText}`);
        return;
      }

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        setError("No response from AI. Please try again.");
        return;
      }
      const jsonWatch = content.match(/\[[\s\S]*\]/);
      if (!jsonWatch) {
        setError("Could not parse AI response. Please try again.");
        return;
      }

      // const clean = content.replace(/```json|```/g, "").trim();
      const parsed: Recommendation[] = JSON.parse(clean);
      setRecommendations(parsed);
    } catch (err) {
      console.error("Error:", err);
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError(
          `Error: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      }
    } finally {
      clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  const searchMovie = (title: string) => {
    navigate(`/search?query=${encodeURIComponent(title)}`);
  };

  return (
    <div
      style={{
        backgroundColor: bg,
        minHeight: "100vh",
        color: text,
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>🤖 AI Movie Recommender</h1>
      <p style={{ textAlign: "center", color: "gray", marginBottom: "30px" }}>
        Pick up to 5 movies you love and AI will recommend what to watch next
      </p>

      {selectedMovies.length > 0 && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <p style={{ color: "gray", marginBottom: "8px" }}>
            Your picks ({selectedMovies.length}/5):
          </p>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {selectedMovies.map((m) => (
              <span
                key={m}
                onClick={() => toggleMovie(m)}
                style={{
                  padding: "6px 14px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  borderRadius: "20px",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {m} ✕
              </span>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "10px",
          maxWidth: "500px",
          margin: "0 auto 24px",
        }}
      >
        <input
          value={customMovie}
          onChange={(e) => setCustomMovie(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCustomMovie()}
          placeholder="Type a movie name..."
          style={{
            flex: 1,
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #333",
            backgroundColor: card,
            color: text,
            fontSize: "14px",
          }}
        />
        <button
          onClick={addCustomMovie}
          style={{
            padding: "10px 18px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Add
        </button>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto 24px" }}>
        <p style={{ color: "gray", marginBottom: "12px", textAlign: "center" }}>
          Or pick from popular movies:
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {POPULAR_MOVIES.map((movie) => (
            <button
              key={movie}
              onClick={() => toggleMovie(movie)}
              style={{
                padding: "8px 16px",
                backgroundColor: selectedMovies.includes(movie)
                  ? "#e74c3c"
                  : card,
                color: selectedMovies.includes(movie) ? "white" : text,
                border: selectedMovies.includes(movie)
                  ? "2px solid #e74c3c"
                  : "1px solid #333",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "13px",
                transition: "all 0.2s",
              }}
            >
              {movie}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "500px", margin: "0 auto 24px" }}>
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Optional: describe your mood (e.g. thrilling, feel-good, sad...)"
          style={{
            width: "100%",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #333",
            backgroundColor: card,
            color: text,
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <button
          onClick={getRecommendations}
          disabled={selectedMovies.length === 0 || isLoading}
          style={{
            padding: "14px 40px",
            backgroundColor: selectedMovies.length === 0 ? "#333" : "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: selectedMovies.length === 0 ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {isLoading ? "🤖 AI is thinking..." : "✨ Get AI Recommendations"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#e74c3c", textAlign: "center" }}>{error}</p>
      )}

      {recommendations.length > 0 && (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            🎬 AI Picks for You
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {recommendations.map((rec, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: card,
                  borderRadius: "12px",
                  padding: "20px",
                  border: "1px solid #2a2a4a",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "16px",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginBottom: "6px",
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: "18px", color: text }}>
                      {rec.title}
                    </h3>
                    <span style={{ color: "gray", fontSize: "13px" }}>
                      {rec.year}
                    </span>
                    <span
                      style={{
                        backgroundColor: "#1a1a2e",
                        padding: "2px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        color: "#aaa",
                      }}
                    >
                      {rec.genre}
                    </span>
                    <span style={{ color: "gold", fontSize: "13px" }}>
                      ⭐ {rec.rating}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "gray",
                      fontSize: "14px",
                      margin: "0 0 12px",
                      lineHeight: "1.5",
                    }}
                  >
                    {rec.reason}
                  </p>
                  <button
                    onClick={() => searchMovie(rec.title)}
                    style={{
                      padding: "6px 16px",
                      backgroundColor: "transparent",
                      color: "#e74c3c",
                      border: "1px solid #e74c3c",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    🔍 Search this movie
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
