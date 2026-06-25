import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { moodGenres, useMoodMovies } from "../hooks/useMoodMovies";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";

export default function MoodPicker() {
  const { isDark } = useTheme();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const selectedGenres = selectedMood ? moodGenres[selectedMood].genres : [];
  const { data, isLoading } = useMoodMovies(selectedGenres);

  return (
    <div
      style={{
        backgroundColor: isDark ? "#0f0f1a" : "#f0f0f0",
        minHeight: "100vh",
        color: isDark ? "white" : "#1a1a2e",
        padding: "20px",
      }}
    >
      <h1>🎭 What's your mood?</h1>
      <p style={{ color: "gray" }}>
        Select your mood and we'll suggest movies for you!
      </p>

      {/* Mood Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        {Object.entries(moodGenres).map(([mood, { emoji }]) => (
          <button
            key={mood}
            onClick={() => setSelectedMood(mood)}
            style={{
              padding: "15px 25px",
              backgroundColor:
                selectedMood === mood
                  ? "#e74c3c"
                  : isDark
                    ? "#1a1a2e"
                    : "#ffffff",
              color: isDark ? "white" : "#1a1a2e",
              border:
                selectedMood === mood ? "2px solid #e74c3c" : "1px solid #333",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {emoji} {mood}
          </button>
        ))}
      </div>

      {/* Movies */}
      {selectedMood && (
        <div>
          <h2>
            {moodGenres[selectedMood].emoji} Movies for {selectedMood} mood
          </h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              {data?.results.slice(0, 12).map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
