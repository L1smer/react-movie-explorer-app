import Header from "./components/Header";
import MovieSearch from "./components/MovieSearch";
import { useState, useEffect } from "react";
import type { filmDataType } from "./components/FIlmCard";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { theme } = useTheme();
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
    const exist = favoriteData.some((fav) => fav.imdbID === movie.imdbID);
    setFavoriteData((prev) =>
      exist
        ? prev.filter((f) => f.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  }

  return (
    <div className={`app-wrapper ${theme}`}>
      <Header
        onToggleView={handleToggleView}
        isShowingOnlyFavorites={isShowingOnlyFavorites}
      />
      <div className="mainContent">
        <MovieSearch
          isShowingOnlyFavorites={isShowingOnlyFavorites}
          favorites={favoriteData}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}