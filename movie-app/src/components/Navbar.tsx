import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, loginWithGoogle, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const bg = isDark ? "#1a1a2e" : "#ffffff";
  const text = isDark ? "white" : "#1a1a2e";

  const linkStyle = {
    color: text,
    textDecoration: "none",
    fontSize: "15px",
    padding: "8px 0",
  };

  const links = [
    { to: "/", label: "🏠 Home" },
    { to: "/mood", label: "🎭 Mood" },
    { to: "/favorites", label: "❤️ Favorites" },
    { to: "/coming-soon", label: "🎬 Coming Soon" },
    { to: "/ai-recommender", label: "🤖 AI Pick" },
    { to: "/history", label: "🕐 History" },
  ];

  return (
    <>
      <nav
        style={{
          backgroundColor: bg,
          padding: "15px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            color: text,
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          🎬 CineSearch
        </Link>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{ color: text, textDecoration: "none", fontSize: "14px" }}
            >
              {l.label}
            </Link>
          ))}

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={user.photoURL || ""}
                alt=""
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
              <span style={{ color: text, fontSize: "13px" }}>
                {user.displayName?.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                style={{
                  padding: "5px 12px",
                  backgroundColor: "transparent",
                  color: "#e74c3c",
                  border: "1px solid #e74c3c",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              style={{
                padding: "7px 14px",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              🔐 Login
            </button>
          )}

          <button
            onClick={toggleTheme}
            style={{
              padding: "7px 14px",
              backgroundColor: isDark ? "#ffffff" : "#1a1a2e",
              color: isDark ? "#1a1a2e" : "#ffffff",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Mobile Right Side */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
          className="mobile-nav"
        >
          <button
            onClick={toggleTheme}
            style={{
              padding: "6px 12px",
              backgroundColor: isDark ? "#ffffff" : "#1a1a2e",
              color: isDark ? "#1a1a2e" : "#ffffff",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: text,
              padding: "4px",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: bg,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            position: "sticky",
            top: "60px",
            zIndex: 999,
          }}
          className="mobile-menu"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div
            style={{
              borderTop: "1px solid #333",
              marginTop: "8px",
              paddingTop: "12px",
            }}
          >
            {user ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <img
                  src={user.photoURL || ""}
                  alt=""
                  style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                />
                <span style={{ color: text, fontSize: "14px" }}>
                  {user.displayName?.split(" ")[0]}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
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
                onClick={() => {
                  loginWithGoogle();
                  setMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "10px",
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
          </div>
        </div>
      )}

      {/* CSS for show/hide desktop vs mobile */}
      <style>{`
        .desktop-nav { display: flex; }
        .mobile-nav { display: none; }
        .mobile-menu { display: flex; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
