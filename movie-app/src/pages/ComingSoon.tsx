import { useNavigate } from "react-router-dom";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import type { Movie } from "../types/movie";

function getCountdown(releaseDate: string) {
  const now = new Date();
  const release = new Date(releaseDate);
  const diff = release.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes };
}

export default function ComingSoon() {
  const { data, isLoading, isError } = useUpcomingMovies();
  const navigate = useNavigate();

  if (isLoading)
    return <p style={{ color: "white", padding: "20px" }}>Loading...</p>;
  if (isError)
    return (
      <p style={{ color: "white", padding: "20px" }}>
        Error loading upcoming movies.
      </p>
    );

  const upcoming = data?.results
    .filter((m: Movie) => new Date(m.release_date) > new Date())
    .sort(
      (a: Movie, b: Movie) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
    );

  return (
    <div
      style={{
        backgroundColor: "#0f0f1a",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <h1
        style={{ textAlign: "center", fontSize: "28px", marginBottom: "8px" }}
      >
        🎬 Coming Soon
      </h1>
      <p style={{ textAlign: "center", color: "gray", marginBottom: "32px" }}>
        Upcoming movies releasing soon
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {upcoming?.map((movie: Movie) => {
          const countdown = getCountdown(movie.release_date);
          return (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{
                display: "flex",
                gap: "20px",
                backgroundColor: "#1a1a2e",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s",
                border: "1px solid #2a2a4a",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.01)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {/* Poster */}
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                    : "https://via.placeholder.com/185x278?text=No+Image"
                }
                alt={movie.title}
                style={{ width: "120px", objectFit: "cover", flexShrink: 0 }}
              />

              {/* Info */}
              <div style={{ padding: "16px", flex: 1 }}>
                <h2 style={{ margin: "0 0 6px", fontSize: "18px" }}>
                  {movie.title}
                </h2>
                <p
                  style={{
                    color: "#e74c3c",
                    margin: "0 0 8px",
                    fontSize: "13px",
                  }}
                >
                  📅{" "}
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p
                  style={{
                    color: "#aaa",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    margin: "0 0 12px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {movie.overview || "No description available."}
                </p>

                {/* Countdown */}
                {countdown && (
                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    {[
                      { label: "Days", value: countdown.days },
                      { label: "Hours", value: countdown.hours },
                      { label: "Mins", value: countdown.minutes },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        style={{
                          backgroundColor: "#0f0f1a",
                          border: "1px solid #e74c3c",
                          borderRadius: "8px",
                          padding: "8px 14px",
                          textAlign: "center",
                          minWidth: "60px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#e74c3c",
                          }}
                        >
                          {value}
                        </div>
                        <div style={{ fontSize: "10px", color: "gray" }}>
                          {label}
                        </div>
                      </div>
                    ))}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "gray",
                        fontSize: "12px",
                        marginLeft: "4px",
                      }}
                    >
                      until release
                    </div>
                  </div>
                )}

                {!countdown && (
                  <span
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                    }}
                  >
                    Out Now
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
