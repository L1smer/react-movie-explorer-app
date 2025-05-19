import Header from "./components/Header";
import MovieSearch from "./components/MovieSearch";
import "./App.css";
import { useState, useEffect } from "react";
import type { filmDataType } from "./components/FIlmCard";

export default function App() {
  const [favoriteData, setFavoriteData] = useState<filmDataType[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteData));
  }, [favoriteData]);
  const [isShowingOnlyFavorites, setShowOnlyFavorites] = useState(false);

  function handleToggleView() {
    setShowOnlyFavorites((prev) => !prev);
  }

  function toggleFavorite(movie: filmDataType) {
    const exist = favoriteData.some(
      (favorite) => favorite.imdbID === movie.imdbID
    );

    if (exist) {
      setFavoriteData((prev) =>
        prev.filter((favourite) => favourite.imdbID !== movie.imdbID)
      );
    } else {
      setFavoriteData((prev) => [...prev, movie]);
    }
  }
  return (
    <>
      <Header onToggleView={handleToggleView} />
      <MovieSearch
        isShowingOnlyFavorites={isShowingOnlyFavorites}
        favorites={favoriteData}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}
