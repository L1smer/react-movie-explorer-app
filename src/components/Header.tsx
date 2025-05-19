import styles from "../Header.module.css";
import HomeIcon from "../assets/icons/HomeIcon";
import StarIcon from "../assets/icons/StarIcon";
import ThemeIcon from "../assets/icons/ThemeIcon";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onToggleView: () => void;
  isShowingOnlyFavorites: boolean;
}

export default function Header({ onToggleView, isShowingOnlyFavorites }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <button
        className={styles.title}
        onClick={() => {
          if (isShowingOnlyFavorites) onToggleView();
        }}
        title="Back to Search"
      >
        <HomeIcon size={24} />
        Movie Explorer
      </button>

      <div className={styles.actions}>
        <button className={styles.iconButton} onClick={onToggleView} title="Toggle Favorites">
          <StarIcon filled={isShowingOnlyFavorites} />
        </button>
        <button className={styles.iconButton} onClick={toggleTheme} title="Toggle Theme">
          <ThemeIcon isDark={theme === "dark"} />
        </button>
      </div>
    </header>
  );
}