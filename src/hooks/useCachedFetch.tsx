import { useEffect, useState, useRef } from "react";
import type { omdbSearchResponseType } from "../components/FilmCard";

interface useCachedFetchProps {
  parameter: string;
}

export default function useCachedFetch({ parameter }: useCachedFetchProps) {
  const [filmData, setFilmData] = useState<omdbSearchResponseType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const cacheRef = useRef<Map<string, omdbSearchResponseType>>(new Map());

  useEffect(() => {
    if (!parameter) return;

    if (cacheRef.current.has(parameter)) {
      setFilmData(cacheRef.current.get(parameter) ?? null);
      return;
    }

    setLoading(true);
    fetch(`https://www.omdbapi.com/?apikey=c5dffd79&s=${parameter}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setFilmData(data);
          cacheRef.current.set(parameter, data);
        } else {
          setFilmData(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [parameter]);

  return { filmData, loading };
}
