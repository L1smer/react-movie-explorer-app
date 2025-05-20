import styles from "../Header.module.css";
import HomeIcon from "../assets/icons/HomeIcon";
import StarIcon from "../assets/icons/StarIcon";
import ThemeIcon from "../assets/icons/ThemeIcon";
import SearchIcon from "../assets/icons/SearchIcon";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onShowFavorites: () => void;
  onShowSearch: () => void;
  onShowHome: () => void;
  isShowingOnlyFavorites: boolean;
  isShowingSearch: boolean;
}

export default function Header({
  onShowFavorites,
  onShowSearch,
  onShowHome,
  isShowingOnlyFavorites,
  isShowingSearch,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <button className={styles.title} onClick={onShowHome} title="Home">
        <HomeIcon size={24} />
        Movie Explorer
      </button>

      <div className={styles.actions}>
         <button className={styles.iconButton} onClick={onShowSearch} title="Search">
          <SearchIcon active={isShowingSearch} />
        </button>
        <button className={styles.iconButton} onClick={onShowFavorites} title="Favorites">
          <StarIcon filled={isShowingOnlyFavorites} />
        </button>
        <button className={styles.iconButton} onClick={toggleTheme} title="Toggle Theme">
          <ThemeIcon isDark={!(theme === "dark")} />
        </button>
      </div>
    </header>
  );
}
