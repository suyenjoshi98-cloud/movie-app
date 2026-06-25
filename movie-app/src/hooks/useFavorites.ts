import { useState, useEffect } from "react";
import type { Movie } from "../types/movie";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  useEffect(() => {
    const handleStorage = () => {
      setFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addFavorite = (movie: Movie) => {
    const updated = [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((m) => m.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const isFavorite = (id: number) => {
    return favorites.some((m) => m.id === id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};