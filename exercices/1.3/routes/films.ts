import { Request, Response, Router } from "express";

const router = Router();

// Hardcoded array of movies (as in exercise 1.1)
let movies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description: "A mind-bending thriller",
    imageUrl: "https://example.com/inception.jpg",
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski",
    duration: 136,
    budget: 63,
    description: "A cyberpunk action film",
    imageUrl: "https://example.com/matrix.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget: 165,
    description: "A space exploration epic",
    imageUrl: "https://example.com/interstellar.jpg",
  },
];

// GET /films?minimum-duration=value - Read all filtered
router.get("/", (req: Request, res: Response) => {
  const minDuration = parseInt(req.query["minimum-duration"] as string);

  if (minDuration && isNaN(minDuration)) {
    return res.status(400).json({ error: "Wrong minimum duration" });
  }

  const filteredMovies = minDuration
    ? movies.filter((movie) => movie.duration >= minDuration)
    : movies;
  return res.json(filteredMovies);
});



// GET /films/:id - Read one
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }

  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  return res.json(movie);
});




// POST /films - Create one
router.post("/", (req: Request, res: Response) => {
  const { title, director, duration, budget, description, imageUrl } = req.body;

  if (
    !title ||
    !director ||
    !duration ||
    typeof duration !== "number" ||
    duration <= 0
  ) {
    return res.status(400).json({ error: "Invalid movie data" });
  }

  const newMovie = {
    id: movies.length + 1, // simple auto-increment
    title,
    director,
    duration,
    budget: budget || null,
    description: description || "",
    imageUrl: imageUrl || "",
  };

  movies.push(newMovie);
  return res.status(201).json(newMovie);
});

export default router;
