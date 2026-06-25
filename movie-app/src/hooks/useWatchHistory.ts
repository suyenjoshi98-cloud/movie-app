import { useState, useEffect } from "react";
import type { Movie } from "../types/movie";

export interface WatchedMovie extends Movie {
  watchedAt: string;
}

export const useWatchHistory = () => {
  const [history, setHistory] = useState<WatchedMovie[]>(() => {
    return JSON.parse(localStorage.getItem("watchHistory") || "[]");
  });

  useEffect(() => {
    const handleStorage = () => {
      setHistory(JSON.parse(localStorage.getItem("watchHistory") || "[]"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addToHistory = (movie: Movie) => {
    const existing = history.filter((m) => m.id !== movie.id);
    const updated = [{ ...movie, watchedAt: new Date().toISOString() }, ...existing];
    setHistory(updated);
    localStorage.setItem("watchHistory", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const removeFromHistory = (id: number) => {
    const updated = history.filter((m) => m.id !== id);
    setHistory(updated);
    localStorage.setItem("watchHistory", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("watchHistory");
    window.dispatchEvent(new Event("storage"));
  };

  const isWatched = (id: number) => history.some((m) => m.id === id);

  return { history, addToHistory, removeFromHistory, clearHistory, isWatched };
};