import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { useMovieVideos } from "../hooks/useMovieVideos";
import { useMovieReviews } from "../hooks/useMovieReviews";
import { useMovieCredits } from "../hooks/useMovieCredits";
import { useSimilarMovies } from "../hooks/useSimilarMovies";
import { useWatchHistory } from "../hooks/useWatchHistory";
import MovieRating from "../components/MovieRating";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";
import { useWatchProviders } from "../hooks/useWatchProviders";

export default function MovieDetail() {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useMovieDetail(Number(id));
  const { data: videos } = useMovieVideos(Number(id));
  const { data: reviews } = useMovieReviews(Number(id));
  const { data: credits } = useMovieCredits(Number(id));
  const { data: similar } = useSimilarMovies(Number(id));
  const { data: watchProviders } = useWatchProviders(Number(id));
  const { addToHistory, isWatched } = useWatchHistory();

  const providers =
    watchProviders?.results?.US ||
    watchProviders?.results?.IN ||
    watchProviders?.results?.GB ||
    watchProviders?.results?.NP ||
    Object.values(watchProviders?.results || {})[0] ||
    null;

  const navigate = useNavigate();

  const trailer = videos?.results?.find(
    (v: { type: string; site: string; key: string }) =>
      v.type === "Trailer" && v.site === "YouTube",
  );

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: movie?.title,
        text: movie?.overview,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to Clipboard!");
      });
    }
  };

  if (isLoading)
    return <p style={{ color: "white", padding: "20px" }}>Loading...</p>;
  if (isError)
    return (
      <p style={{ color: "white", padding: "20px" }}>Error loading movie!</p>
    );

  return (
    <div
      style={{ backgroundColor: "#0f0f1a", minHeight: "100vh", color: "white" }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "fixed",
          top: "80px",
          left: "20px",
          zIndex: 100,
          padding: "8px 16px",
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        ← Back
      </button>

      {/* Backdrop */}
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(transparent, #0f0f1a)",
            height: "200px",
          }}
        />
      </div>

      {/* Details */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
          alt={movie?.title}
          style={{ borderRadius: "8px", width: "200px", marginTop: "-100px" }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <h1 style={{ margin: 0 }}>{movie?.title}</h1>
            <button
              onClick={handleShare}
              style={{
                padding: "8px 16px",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              🔗 Share
            </button>
          </div>

          <button
            onClick={() => movie && addToHistory(movie)}
            style={{
              padding: "8px 16px",
              backgroundColor: isWatched(Number(id)) ? "#2ecc71" : "#1a1a2e",
              color: "white",
              border: `1px solid ${isWatched(Number(id)) ? "#2ecc71" : "#555"}`,
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            {isWatched(Number(id)) ? "✅ Watched" : "👁️ Mark as Watched"}
          </button>

          {/* Rating */}
          <div style={{ padding: "0 0 20px" }}>
            <MovieRating movieId={Number(id)} movieTitle={movie?.title || ""} />
          </div>

          <p style={{ color: "gray", fontStyle: "italic" }}>{movie?.tagline}</p>
          <p style={{ color: "gold" }}>⭐ {movie?.vote_average.toFixed(1)}</p>
          <p>🕐 {movie?.runtime} minutes</p>
          <p>📅 {movie?.release_date}</p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              margin: "10px 0",
            }}
          >
            {movie?.genres.map((g) => (
              <span
                key={g.id}
                style={{
                  padding: "5px 12px",
                  backgroundColor: "#1a1a2e",
                  borderRadius: "20px",
                  fontSize: "12px",
                }}
              >
                {g.name}
              </span>
            ))}
          </div>
          <p style={{ maxWidth: "600px", lineHeight: "1.6" }}>
            {movie?.overview}
          </p>
        </div>
      </div>

      {/* Trailer */}
      <div style={{ padding: "20px" }}>
        <h2>🎬 Official Trailer</h2>
        {trailer ? (
          <iframe
            width="700"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Movie Trailer"
            allowFullScreen
            style={{ borderRadius: "8px", border: "none", maxWidth: "100%" }}
          />
        ) : (
          <p style={{ color: "gray" }}>No trailer available.</p>
        )}
      </div>

      {/* Theaters in Nepal */}
      <div style={{ padding: "20px" }}>
        <h2>🎟️ Theaters in Nepal</h2>
        <p style={{ color: "gray", marginBottom: "12px" }}>
          Check current showtimes at cinemas near you:
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {[
            { name: "QFX Cinemas", url: "https://www.qfxcinemas.com" },
            { name: "FCUBE", url: "https://www.fcubecinemas.com/" },
            {
              name: "The Film Nepal",
              url: "https://www.thefilmnepal.com/show-times",
            },
            { name: "ONE CINEMAS", url: "https://www.onecinemas.com/" },
          ].map((cinema) => (
            <a
              key={cinema.name}
              href={cinema.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "10px 18px",
                backgroundColor: "#1a1a2e",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                border: "1px solid #e74c3c",
              }}
            >
              🎬 {cinema.name}
            </a>
          ))}
        </div>
      </div>

      {/* Cast */}
      <div style={{ padding: "20px" }}>
        <h2>🎭 Cast</h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {credits?.cast.slice(0, 10).map((actor) => (
            <div key={actor.id} style={{ width: "100px", textAlign: "center" }}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "https://via.placeholder.com/100x150?text=No+Photo"
                }
                alt={actor.name}
                style={{
                  width: "100px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p
                style={{
                  fontSize: "12px",
                  margin: "5px 0 0",
                  fontWeight: "bold",
                }}
              >
                {actor.name}
              </p>
              <p style={{ fontSize: "11px", color: "gray", margin: "2px 0 0" }}>
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Where to Watch */}
      <div style={{ padding: "20px" }}>
        <h2>🍿 Where to Watch</h2>
        {!providers ? (
          <p style={{ color: "gray" }}>
            No streaming providers available for your region.
          </p>
        ) : (
          <div>
            {providers.flatrate && providers.flatrate.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                <p style={{ color: "gray", marginBottom: "8px" }}>Stream:</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {providers.flatrate.map((p) => (
                    <div key={p.provider_id} style={{ textAlign: "center" }}>
                      <img
                        src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                        alt={p.provider_name}
                        title={p.provider_name}
                        style={{ width: "45px", borderRadius: "8px" }}
                      />
                      <p
                        style={{
                          fontSize: "10px",
                          margin: "4px 0 0",
                          color: "gray",
                        }}
                      >
                        {p.provider_name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {providers.rent && providers.rent.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                <p style={{ color: "gray", marginBottom: "8px" }}>Rent:</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {providers.rent.map((p) => (
                    <div key={p.provider_id} style={{ textAlign: "center" }}>
                      <img
                        src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                        alt={p.provider_name}
                        title={p.provider_name}
                        style={{ width: "45px", borderRadius: "8px" }}
                      />
                      <p
                        style={{
                          fontSize: "10px",
                          margin: "4px 0 0",
                          color: "gray",
                        }}
                      >
                        {p.provider_name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {providers.buy && providers.buy.length > 0 && (
              <div>
                <p style={{ color: "gray", marginBottom: "8px" }}>Buy:</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {providers.buy.map((p) => (
                    <div key={p.provider_id} style={{ textAlign: "center" }}>
                      <img
                        src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                        alt={p.provider_name}
                        title={p.provider_name}
                        style={{ width: "45px", borderRadius: "8px" }}
                      />
                      <p
                        style={{
                          fontSize: "10px",
                          margin: "4px 0 0",
                          color: "gray",
                        }}
                      >
                        {p.provider_name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reviews */}
      <div style={{ padding: "20px" }}>
        <h2>📝 User Reviews ({reviews?.total_results || 0})</h2>
        {reviews?.results.length === 0 && (
          <p style={{ color: "gray" }}>No reviews yet.</p>
        )}
        {reviews?.results.slice(0, 5).map((review) => (
          <div
            key={review.id}
            style={{
              backgroundColor: "#1a1a2e",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#e74c3c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {review.author[0].toUpperCase()}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>{review.author}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
              {review.author_details.rating && (
                <span style={{ marginLeft: "auto", color: "gold" }}>
                  ⭐ {review.author_details.rating}
                </span>
              )}
            </div>
            <p style={{ color: "#ccc", lineHeight: "1.6", fontSize: "14px" }}>
              {review.content.length > 300
                ? review.content.slice(0, 300) + "..."
                : review.content}
            </p>
          </div>
        ))}
      </div>

      {/* Similar Movies */}
      <div style={{ padding: "20px" }}>
        <h2>🎬 Similar Movies</h2>
        {similar?.results.length === 0 && (
          <p style={{ color: "gray" }}>No similar movies found.</p>
        )}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {similar?.results.slice(0, 8).map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
