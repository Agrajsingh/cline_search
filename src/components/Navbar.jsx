import { Link } from 'react-router-dom';
import { Film, Heart, Search } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Navbar = () => {
  const { favorites } = useFavorites();

  return (
    <nav className="bg-[#1e293b]/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-blue-400 transition-colors">
          <Film className="w-8 h-8 text-blue-500" />
          <span>Cine<span className="text-blue-500">Search</span></span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">Search</span>
          </Link>
          <Link to="/favorites" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors relative">
            <Heart className="w-5 h-5" />
            <span className="hidden sm:inline">Favorites</span>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
