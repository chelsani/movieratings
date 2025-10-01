import { useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";

export default function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a movie title to search.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/search?q=${encodeURIComponent(search)}`
      );
      const json = await resp.json();

      if (json.Response === "False") {
        setError("No movies found.");
        return;
      }

      setResults(
        json.Search.map((m) => ({
          id: m.imdbID,
          title: m.Title,
          year: m.Year,
          poster: m.Poster !== "N/A" ? m.Poster : null,
        }))
      );
    } catch (err) {
      console.error(err);
      setError("Error searching movies.");
    } finally {
      setLoading(false);
    }
  }

  async function loadMovie(id) {
    setLoading(true);
    setError("");
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/movie?id=${id}`
      );
      const json = await resp.json();
      setSelected(json);
    } catch (err) {
      console.error(err);
      setError("Error loading movie details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Movie Ratings</h1>

      {!selected && (
        <>
          <form className="search" onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for any movie..."
            />
            <button className="btn" type="submit" disabled={loading}>
              Search
            </button>
          </form>

          {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

          <div className="movie-list">
            {results.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                onSelect={() => loadMovie(m.id)}
                loading={loading}
              />
            ))}
          </div>
        </>
      )}

      {selected && (
        <MovieDetail movie={selected} onBack={() => setSelected(null)} />
      )}
    </div>
  );
}