import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

//  Search movies by title
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching from OMDb search:", err);
    res.status(500).json({ error: "Error searching movies" });
  }
});

//  Get full details by IMDb ID (includes ratings + poster)
app.get("/movie", async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "Missing IMDb ID" });
  }

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${id}&plot=short`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching from OMDb movie:", err);
    res.status(500).json({ error: "Error fetching movie details" });
  }
});

//  Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
