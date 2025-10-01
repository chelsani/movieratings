import RatingsChart from "./RatingsChart";

export default function MovieDetail({ movie, onBack }) {
  return (
    <div className="detail">
      <button className="btn" onClick={onBack}>← Back</button>
      <h2>{movie.Title} ({movie.Year})</h2>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x440?text=No+Poster"}
        alt={movie.Title}
        style={{ width: 300, borderRadius: 8 }}
      />
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <h3>Ratings:</h3>
      <RatingsChart ratings={movie.Ratings} />
    </div>
  );
}