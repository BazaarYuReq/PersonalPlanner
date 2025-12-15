"use client";

import { useEffect, useState } from "react";
import ReturnButton from "@/components/ui/returnbutton";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH MOVIES ---------------- */
  useEffect(() => {
    fetch(
      `${BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results.slice(0, 20)))
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- LOAD SAVED DATA ---------------- */
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    setPurchased(JSON.parse(localStorage.getItem("purchased")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("purchased", JSON.stringify(purchased));
  }, [purchased]);

  /* ---------------- BODY LOCK WHEN MODAL OPEN ---------------- */
  useEffect(() => {
    document.body.style.overflow = selectedMovie ? "hidden" : "auto";
  }, [selectedMovie]);

  /* ---------------- FAVORITES WITH RATING ---------------- */
  const setRating = (movie, rating) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.movie.id === movie.id);
      if (exists) {
        return prev.map((f) =>
          f.movie.id === movie.id ? { ...f, rating } : f
        );
      }
      return [...prev, { movie, rating }];
    });
  };

  const getRating = (id) =>
    favorites.find((f) => f.movie.id === id)?.rating || 0;

  /* ---------------- PURCHASE ---------------- */
  const purchaseMovie = (movie) => {
    if (!purchased.some((m) => m.id === movie.id)) {
      setPurchased([...purchased, movie]);
    }
  };

  return (
    <main className="bg-black min-h-screen text-white">
      <ReturnButton />

      <div id="title">Popular Movies</div>

      {loading && <p className="text-center">Loading...</p>}

      {/* ---------------- MOVIE GRID ---------------- */}
      <div id="black">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="box cursor-pointer"
            onClick={() => setSelectedMovie(movie)}
          >
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      {/* ---------------- PURCHASED SECTION ---------------- */}
      {purchased.length > 0 && (
        <>
          <h2 className="text-center text-2xl mt-12">Purchased</h2>
          <div id="black">
            {purchased.map((movie) => (
              <div key={movie.id} className="box relative">
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
                <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-green-500 px-6 py-2 rounded text-black font-bold">
                  ▶ Play
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ---------------- MODAL ---------------- */}
      {selectedMovie && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="bg-zinc-900 rounded-2xl max-w-3xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3"
              onClick={() => setSelectedMovie(null)}
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={`${IMAGE_BASE_URL}${selectedMovie.poster_path}`}
                className="rounded-xl"
              />

              <div>
                <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>

                {/* ⭐ STAR RATING */}
                <div className="flex gap-1 my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(selectedMovie, star)}
                      className={`cursor-pointer text-2xl ${
                        getRating(selectedMovie.id) >= star
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* ACTION BUTTONS */}
                <button
                  className="bg-yellow-500 text-black px-4 py-2 rounded mr-3"
                  onClick={() =>
                    setFavorites((prev) =>
                      prev.filter((f) => f.movie.id !== selectedMovie.id)
                    )
                  }
                >
                  Remove Favorite
                </button>

                <button
                  className="bg-green-500 text-black px-4 py-2 rounded"
                  onClick={() => purchaseMovie(selectedMovie)}
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
