import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

interface Props {
  movieId: number;
  movieTitle: string;
}

export default function MovieRating({ movieId, movieTitle }: Props) {
  const { user, loginWithGoogle } = useAuth();
  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load existing rating
  useEffect(() => {
    if (!user) return;
    const fetchRating = async () => {
      const ref = doc(db, "ratings", `${user.uid}_${movieId}`);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUserRating(snap.data().rating);
      }
    };
    fetchRating();
  }, [user, movieId]);

  const handleRate = async (star: number) => {
    if (!user) return;
    setLoading(true);
    try {
      const ref = doc(db, "ratings", `${user.uid}_${movieId}`);
      await setDoc(ref, {
        userId: user.uid,
        movieId,
        movieTitle,
        rating: star,
        ratedAt: new Date().toISOString(),
      });
      setUserRating(star);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Error saving rating:", err);
    } finally {
      setLoading(false);
    }
  };

  // Not logged in — show login prompt
  if (!user) {
    return (
      <div
        style={{
          backgroundColor: "#1a1a2e",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "14px", color: "gray" }}>
          ⭐ Rate this movie:
        </span>
        <div style={{ display: "flex", gap: "4px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{ fontSize: "24px", color: "#333", cursor: "not-allowed" }}
            >
              ★
            </span>
          ))}
        </div>
        <button
          onClick={loginWithGoogle}
          style={{
            padding: "8px 16px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          🔐 Login to Rate
        </button>
      </div>
    );
  }

  // Logged in — show star rating
  return (
    <div
      style={{
        backgroundColor: "#1a1a2e",
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontSize: "14px", color: "gray" }}>Your Rating:</span>
      <div style={{ display: "flex", gap: "4px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => !loading && handleRate(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            style={{
              fontSize: "28px",
              cursor: loading ? "not-allowed" : "pointer",
              color: star <= (hoveredStar || userRating) ? "#f39c12" : "#333",
              transition: "color 0.15s",
            }}
          >
            ★
          </span>
        ))}
      </div>
      {userRating > 0 && (
        <span style={{ fontSize: "13px", color: "gray" }}>{userRating}/5</span>
      )}
      {saved && (
        <span
          style={{ fontSize: "13px", color: "#2ecc71", fontWeight: "bold" }}
        >
          ✅ Rating saved!
        </span>
      )}
    </div>
  );
}
