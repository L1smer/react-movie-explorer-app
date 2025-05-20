import Header from "./components/Header";
import MovieSearch from "./components/MovieSearch";
import { useState, useEffect } from "react";
import type { filmDataType } from "./components/FilmCard";
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
  const [isShowingSearch, setShowSearch] = useState(false);

  function handleShowFavorites() {
    setShowSearch(false);
    setShowOnlyFavorites(true);
  }

  function handleShowSearch() {
    setShowSearch(true);
    setShowOnlyFavorites(false);
  }

  function handleShowHome() {
    setShowSearch(false);
    setShowOnlyFavorites(false);
  }

  function toggleFavorite(movie: filmDataType) {
    const exist = favoriteData.some((fav) => fav.imdbID === movie.imdbID);
    setFavoriteData((prev) =>
      exist ? prev.filter((f) => f.imdbID !== movie.imdbID) : [...prev, movie]
    );
  }

  return (
    <div className={`app-wrapper ${theme}`}>
      <Header
        onShowFavorites={handleShowFavorites}
        onShowSearch={handleShowSearch}
        onShowHome={handleShowHome}
        isShowingOnlyFavorites={isShowingOnlyFavorites}
        isShowingSearch={isShowingSearch}
      />
      <div className="mainContent">
        {isShowingSearch || isShowingOnlyFavorites ? (
          <MovieSearch
            isShowingOnlyFavorites={isShowingOnlyFavorites}
            favorites={favoriteData}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <div>
            <h2>Welcome to Movie Explorer</h2>
            <p>Use the search icon to find movies and mark your favorites.</p>
          </div>
        )}
      </div>
    </div>
  );
}
