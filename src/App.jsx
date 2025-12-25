import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <footer className="py-6 text-center text-secondary border-t border-slate-800">
            <p>&copy; {new Date().getFullYear()} CineSearch. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
