import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.find((m) => m.imdbID === movie.imdbID)) return prev;
      return [...prev, movie];
    });
  };

  const removeFavorite = (imdbID) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== imdbID));
  };

  const isFavorite = (imdbID) => {
    return favorites.some((m) => m.imdbID === imdbID);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
