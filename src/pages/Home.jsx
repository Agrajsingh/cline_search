import { useState, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal, Loader2, PlayCircle } from 'lucide-react';
import { fetchMovies } from '../services/omdbApi';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('Batman');
  const [type, setType] = useState('');
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isDev = import.meta.env.DEV || window.location.hostname === 'localhost';
  const isApiKeyMissing = isDev && (!import.meta.env.VITE_OMDB_API_KEY || import.meta.env.VITE_OMDB_API_KEY === 'your_key_here');

  const searchMovies = useCallback(async (searchQuery, searchPage, searchType) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovies(searchQuery, searchPage, searchType);
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || "No results found");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
        searchMovies(searchTerm, page, type);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, page, type, searchMovies]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto py-12">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Find your next <span className="text-blue-500">favorite</span> story.
        </h1>
        <p className="text-slate-400 text-lg md:text-xl">
          Search through thousands of movies, series, and episodes.
        </p>

        {/* Search & Filter Bar */}
        <div className="relative group max-w-2xl mx-auto mt-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search movies..." 
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white placeholder-slate-500 text-lg"
              />
            </div>
            
            <div className="relative min-w-[160px]">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              <select 
                value={type}
                onChange={handleTypeChange}
                className="w-full h-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-4 pl-12 pr-10 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white appearance-none cursor-pointer text-lg"
              >
                <option value="">All Types</option>
                <option value="movie">Movies</option>
                <option value="series">Series</option>
                <option value="episode">Episodes</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="min-h-[400px]">
        {isApiKeyMissing ? (
          <div className="max-w-md mx-auto bg-slate-800/50 border border-blue-500/30 rounded-3xl p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Setup Required</h2>
            <p className="text-slate-400">
              Please add your OMDB API Key to a <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">.env</code> file in the root directory.
            </p>
            <div className="bg-slate-950 p-4 rounded-xl text-left font-mono text-sm overflow-x-auto border border-slate-700">
              VITE_OMDB_API_KEY=your_key_here
            </div>
            <p className="text-xs text-slate-500">
              Restart your dev server after adding the key.
            </p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-slate-400 animate-pulse">Searching the universe...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 text-red-500 mb-6 font-bold text-3xl">!</div>
            <h3 className="text-2xl font-bold mb-2">Oops! {error}</h3>
            <p className="text-slate-400">Try searching for something else or check your spelling.</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
            
            <Pagination 
              currentPage={page} 
              totalResults={totalResults} 
              onPageChange={handlePageChange} 
            />
          </div>
        ) : (
          <div className="text-center py-24">
             <PlayCircle className="w-20 h-20 text-slate-700 mx-auto mb-6" />
             <h3 className="text-2xl font-bold text-slate-500">Enter a keyword to start searching</h3>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
