// --- App.tsx with Category Fetching ---
import React, { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { WallpaperGallery } from './components/WallpaperGallery';
import { Header } from './components/Header';
import { WallpaperDetail } from './components/WallpaperDetail';
import { UserProfile } from './components/UserProfile';

export default function App() {
  // ... (all your existing state variables)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('gallery');
  const [profileTab, setProfileTab] = useState('profile');
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [wallpapers, setWallpapers] = useState([]);
  const [categories, setCategories] = useState([]); // <-- NEW STATE FOR CATEGORIES

  useEffect(() => {
    // ... (your existing useEffect for auth, theme, etc.)
  }, []);

  useEffect(() => {
    // Fetch wallpapers
    fetch('/wallpapers.json')
      .then(res => res.json())
      .then(data => setWallpapers(data))
      .catch(error => console.error('Error fetching wallpapers:', error));

    // Fetch categories
    fetch('/categories.json')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // ... (all your existing handler functions: handleLogin, handleLogout, etc.)

  const renderCurrentView = () => {
    switch (currentView) {
      case 'gallery':
        return (
          <WallpaperGallery
            wallpapers={wallpapers}
            categories={categories} // <-- PASS CATEGORIES AS A PROP
            onWallpaperSelect={handleWallpaperSelect}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            isAuthenticated={isAuthenticated}
          />
        );
      // ... (rest of the switch statement)
    }
  };

  // ... (rest of your App.tsx component)
  return (
    // ...
  )=>
}
