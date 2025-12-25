import { Link } from 'react-router-dom';
import { Heart, Star, Calendar } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="group bg-slate-800/40 rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
      <Link to={`/movie/${movie.imdbID}`} className="block relative aspect-[2/3] overflow-hidden">
        <img 
          src={movie.Poster !== "N/A" ? movie.Poster : 'https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2000&auto=format&fit=crop'} 
          alt={movie.Title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
           <p className="text-white font-semibold text-lg line-clamp-1">{movie.Title}</p>
        </div>
        <button 
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 transform active:scale-95 ${
            favorite ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-900/40 text-white/70 hover:bg-slate-900/60 hover:text-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
        </button>
      </Link>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
          <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
        </h3>
        <div className="flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{movie.Year}</span>
          </div>
          <div className="px-2 py-0.5 bg-slate-700/50 rounded text-[10px] uppercase font-bold tracking-wider">
            {movie.Type}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
