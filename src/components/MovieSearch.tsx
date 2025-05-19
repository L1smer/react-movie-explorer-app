import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useCachedFetch from "../hooks/useCachedFetch";
import FilmCard from "./FIlmCard";
import type { filmDataType } from "./FIlmCard";

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm); 
  const { filmData, loading } = useCachedFetch({ parameter: debouncedSearchTerm });

  return (
    <div>
      <input
        type="text"
        placeholder="Search movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      {!loading && filmData?.Search && filmData.Search.length > 0 && (
        <ul>
          {filmData.Search.map((movie: filmDataType) => (
            <FilmCard key={movie.imdbID} filmData={movie} />
          ))}
        </ul>
      )}

      {!loading && !filmData?.Search && <p>No results.</p>}
    </div>
  );
}
