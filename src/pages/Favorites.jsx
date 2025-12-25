import { Heart, Film } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-black flex items-center gap-4">
          <Heart className="w-10 h-10 text-blue-500 fill-current" />
          My Favorites
        </h1>
        <p className="text-slate-400 font-medium">
          {favorites.length} {favorites.length === 1 ? 'Movie' : 'Movies'} saved
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-in slide-in-from-bottom-5 duration-700">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 space-y-6">
          <div className="relative inline-block">
             <Film className="w-24 h-24 text-slate-800 mx-auto" />
             <Heart className="w-10 h-10 text-slate-700 absolute -bottom-2 -right-2" />
          </div>
          <h2 className="text-3xl font-bold text-slate-500">Your collection is empty</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            You haven't saved any movies yet. Start exploring and save your favorites to view them later.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all transform hover:scale-105 active:scale-95"
          >
            Go Explore
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
