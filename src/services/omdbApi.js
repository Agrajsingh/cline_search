// In production (Netlify), we use the proxy function to hide the API key.
// In development, we use the key from .env directly for convenience.
const IS_PROD = import.meta.env.PROD;
const API_URL = IS_PROD ? "/api/omdb" : "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "YOUR_API_KEY";

export const fetchMovies = async (query, page = 1, type = "") => {
  try {
    const typeQuery = type ? `&type=${type}` : "";
    const url = IS_PROD
      ? `${API_URL}?s=${query}&page=${page}${typeQuery}`
      : `${API_URL}?apikey=${API_KEY}&s=${query}&page=${page}${typeQuery}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { Response: "False", Error: "Network error" };
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const url = IS_PROD
      ? `${API_URL}?i=${id}&plot=full`
      : `${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return { Response: "False", Error: "Network error" };
  }
};
