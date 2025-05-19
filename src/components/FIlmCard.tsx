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
}

export default function FilmCard({ filmData }: FilmCardProps) {
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
    <li>
      <h5>{filmData.Title}</h5>
      <p>{rightYear(filmData.Year)}</p>
      <img src={filmData.Poster} alt="" />
    </li>
  );
}
