import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 100,
        width: "45px",
        height: "45px",
        backgroundColor: "#e74c3c",
        color: "white",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        fontSize: "20px",
      }}
    >
      ↑
    </button>
  );
}
