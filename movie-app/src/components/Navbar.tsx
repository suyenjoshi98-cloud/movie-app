import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, loginWithGoogle, logout } = useAuth();
  return (
    <nav
      style={{
        backgroundColor: isDark ? "#1a1a2e" : "#ffffff",
        padding: "15px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Link
        to="/"
        style={{
          color: isDark ? "white" : "#1a1a2e",
          textDecoration: "none",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        🎬 CineSearch
      </Link>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            color: isDark ? "white" : "#1a1a2e",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <Link
          to="/mood"
          style={{
            color: isDark ? "white" : "#1a1a2e",
            textDecoration: "none",
          }}
        >
          🎭 Mood
        </Link>

        <Link
          to="/favorites"
          style={{
            color: isDark ? "white" : "#1a1a2e",
            textDecoration: "none",
          }}
        >
          ❤️ Favorites
        </Link>

        <Link
          to="/coming-soon"
          style={{
            color: isDark ? "white" : "#1a1a2e",
            textDecoration: "none",
          }}
        >
          🎬 Coming Soon
        </Link>

        <Link
          to="/ai-recommender"
          style={{
            color: isDark ? "white" : "#1a1a2e",
            textDecoration: "none",
          }}
        >
          🤖 AI Pick
        </Link>

        <Link
          to="/history"
          style={{
            color: isDark ? "white" : "#1a1a2e",
            textDecoration: "none",
          }}
        >
          🕐 History
        </Link>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={user.photoURL || ""}
              alt={user.displayName || ""}
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            />
            <span
              style={{ color: isDark ? "white" : "#1a1a2e", fontSize: "14px" }}
            >
              {user.displayName?.split(" ")[0]}
            </span>
            <button
              onClick={logout}
              style={{
                padding: "6px 14px",
                backgroundColor: "transparent",
                color: "#e74c3c",
                border: "1px solid #e74c3c",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={loginWithGoogle}
            style={{
              padding: "8px 16px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            🔐 Login with Google
          </button>
        )}

        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 16px",
            backgroundColor: isDark ? "#ffffff" : "#1a1a2e",
            color: isDark ? "#1a1a2e" : "#ffffff",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}
