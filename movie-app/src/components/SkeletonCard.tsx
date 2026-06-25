import { useTheme } from "../context/ThemeContext";
 
export default function SkeletonCard() {
  const { isDark } = useTheme();

  const shimmer = {
    backgroundColor: isDark ? "#2a2a4a" : "#c0c0c0",
    borderRadius: "4px",
    animation: "pulse 1.5s ease-in-out infinite",
  };

  return (
    <div style={{
      width: "200px",
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: isDark ? "#16213e" : "#e0e0e0",
    }}>
      {/* Image placeholder */}
      <div style={{
        width: "200px",
        height: "300px",
        ...shimmer,
      }} />

      <div style={{ padding: "10px" }}>
        {/* Title placeholder */}
        <div style={{
          height: "14px",
          width: "80%",
          marginBottom: "8px",
          ...shimmer,
        }} />

        {/* Rating placeholder */}
        <div style={{
          height: "12px",
          width: "40%",
          marginBottom: "8px",
          ...shimmer,
        }} />

        {/* Year placeholder */}
        <div style={{
          height: "12px",
          width: "30%",
          marginBottom: "8px",
          ...shimmer,
        }} />

        {/* Button placeholder */}
        <div style={{
          height: "30px",
          width: "100%",
          ...shimmer,
        }} />
      </div>
    </div>
  );
}

