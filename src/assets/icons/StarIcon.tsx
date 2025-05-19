export default function StarIcon({ filled = false, size = 24 }: { filled?: boolean, size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5.45 5.31L17.82 22 12 18.27 6.18 22l1.27-7.42L2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}