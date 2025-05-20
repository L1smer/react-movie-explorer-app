import styles from "../MovieSearch.module.css";
import { useTheme } from "../context/ThemeContext";

export type omdbSearchResponseType = {
  Search: filmDataType[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
};

export type filmDataType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

interface FilmCardProps {
  filmData: filmDataType;
  isFavorite: boolean;
  onToggleFavorite: (movie: filmDataType) => void;
}

export default function FilmCard({
  filmData,
  isFavorite,
  onToggleFavorite,
}: FilmCardProps) {

  const { theme } = useTheme();
   const cardClass = `${styles.card} ${theme === "dark" ? styles.dark : ""}`;

  function rightYear(year: string) {
    if (year.includes("–")) {
      const normalizedYear = year.replace("–", "-");
      const [start, end] = normalizedYear.split("-");

      if (!end || end.trim() === "") {
        return `${start} - present`;
      } else {
        return `${start} - ${end}`;
      }
    } else {
      return year;
    }
  }

  return (
    <li className={`${cardClass} ${isFavorite ? styles.favorite : ""}`} onClick={() => onToggleFavorite(filmData)}>
      <span className={styles.span}>
        <h5 className={styles.titleRow}>
          {filmData.Title}
        </h5>
        <p className={styles.year}>{rightYear(filmData.Year)}</p>
      </span>
      <img className={styles.poster} src={filmData.Poster} alt="" />
    </li>
  );
}
