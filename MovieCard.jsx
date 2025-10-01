export default function MovieCard({ movie, onSelect }) {
  return (
    <div className="movie-card" onClick={onSelect}>
      <img
        src={movie.poster || "https://via.placeholder.com/200x300?text=No+Poster"}
        alt={movie.title}
      />
      <div className="meta">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
      </div>
    </div>
  );
}