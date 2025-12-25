import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Calendar, Clock, Heart, Loader2 } from 'lucide-react';
import { fetchMovieDetails } from '../services/omdbApi';
import { useFavorites } from '../context/FavoritesContext';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const data = await fetchMovieDetails(id);
      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError(data.Error || "Movie not found");
      }
      setLoading(false);
    };
    getDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-slate-400">Loading cinematic masterpiece...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-24">
        <h3 className="text-2xl font-bold mb-4 text-red-500">{error || "Movie not found"}</h3>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const favorite = isFavorite(movie.imdbID);

  return (
    <div className="animate-in fade-in duration-700 max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Poster Section */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
          <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-700">
            <img 
              src={movie.Poster !== "N/A" ? movie.Poster : 'https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2000&auto=format&fit=crop'} 
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={() => favorite ? removeFavorite(movie.imdbID) : addFavorite(movie)}
              className={`absolute top-4 right-4 p-3 rounded-xl backdrop-blur-md transition-all duration-300 ${
                favorite ? 'bg-blue-600 text-white' : 'bg-slate-900/60 text-white/80 hover:bg-slate-900/80 hover:text-white'
              }`}
            >
              <Heart className={`w-6 h-6 ${favorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-grow space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
               <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-500/20">
                {movie.Type}
              </span>
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold text-lg">{movie.imdbRating}</span>
                <span className="text-slate-500 text-sm font-normal">/ 10</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {movie.Title}
            </h1>

            <div className="flex flex-wrap gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{movie.Year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{movie.Runtime}</span>
              </div>
              <div className="px-2 py-0.5 border border-slate-700 rounded text-xs font-bold uppercase">
                {movie.Rated}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.Genre.split(', ').map(genre => (
              <span key={genre} className="px-4 py-1.5 bg-slate-800 rounded-lg text-sm font-medium border border-slate-700/50">
                {genre}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              Plot Summary
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg">
              {movie.Plot}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-800">
            <div className="space-y-4">
               <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Cast</h4>
               <p className="text-white text-lg font-medium">{movie.Actors}</p>
            </div>
            <div className="space-y-4">
               <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Director</h4>
               <p className="text-white text-lg font-medium">{movie.Director}</p>
            </div>
            <div className="space-y-4">
               <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Awards</h4>
               <p className="text-white text-lg font-medium">{movie.Awards}</p>
            </div>
             <div className="space-y-4">
               <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Released</h4>
               <p className="text-white text-lg font-medium">{movie.Released}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
