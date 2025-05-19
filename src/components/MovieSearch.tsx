import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useCachedFetch from "../hooks/useCachedFetch";
import FilmCard from "./FIlmCard";
import type { filmDataType } from "./FIlmCard";

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

  const isFavorite = (movie: filmDataType) =>
    favorites.some((f) => f.imdbID === movie.imdbID);

  const visibleMovies = isShowingOnlyFavorites
    ? favorites
    : filmData?.Search || [];

  return (
    <div>
      {isShowingOnlyFavorites ? '': <input
        type="text"
        placeholder="Search movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />}

      {loading && !isShowingOnlyFavorites && <p>Loading...</p>}

      <ul>
        {visibleMovies.length > 0 ? (
          visibleMovies.map((movie: filmDataType) => (
            <FilmCard
              key={movie.imdbID}
              filmData={movie}
              isFavorite={isFavorite(movie)}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <p>
            {isShowingOnlyFavorites
              ? "No favorite movies yet."
              : "No results found."}
          </p>
        )}
      </ul>
    </div>
  );
}
