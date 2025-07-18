import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useCachedFetch from "../hooks/useCachedFetch";
import FilmCard from "./FilmCard";
import type { filmDataType } from "./FilmCard";
import styles from "../MovieSearch.module.css";

interface MovieSearchProps {
  favorites: filmDataType[];
  onToggleFavorite: (movie: filmDataType) => void;
  isShowingOnlyFavorites: boolean;
}

export default function MovieSearch({
  favorites,
  onToggleFavorite,
  isShowingOnlyFavorites,
}: MovieSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm);
  const { filmData, loading } = useCachedFetch({
    parameter: debouncedSearchTerm,
  });

  const isFavorite = (movie: filmDataType) => {
    return favorites.some((f) => f.imdbID === movie.imdbID);
  };

  const isDebouncing = searchTerm !== debouncedSearchTerm;

  const visibleMovies = isShowingOnlyFavorites
    ? favorites
    : !isDebouncing && searchTerm.trim() !== "" && filmData?.Search
    ? filmData.Search
    : [];

  return (
    <div className={styles.container}>
      {!isShowingOnlyFavorites && (
        <input
          className={styles.input}
          type="text"
          placeholder="Search movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      {loading || isDebouncing ? (
        <p className={styles.message}>Loading...</p>
      ) : visibleMovies.length > 0 ? (
        <ul className={styles.flex}>
          {visibleMovies.map((movie) => (
            <FilmCard
              key={movie.imdbID}
              filmData={movie}
              isFavorite={isFavorite(movie)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>
          {isShowingOnlyFavorites ? (
            "No favorite movies yet."
          ) : searchTerm.trim() === "" ? (
            <span className={styles.waitingMessage}>
              Waiting for your command!
            </span>
          ) : (
            `No results for "${searchTerm}"`
          )}
        </p>
      )}
    </div>
  );
}
