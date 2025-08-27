import React, { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { WallpaperGallery } from './components/WallpaperGallery';
import { Header } from './components/Header';
import { WallpaperDetail } from './components/WallpaperDetail';
import { UserProfile } from './components/UserProfile';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('gallery');
  const [profileTab, setProfileTab] = useState('profile');
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [wallpapers, setWallpapers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [packs, setPacks] = useState([]); // <-- NEW STATE FOR PACKS

  useEffect(() => {
    // ... (existing useEffect for auth remains the same)
  }, []);

  useEffect(() => {
    fetch('/wallpapers.json')
      .then(res => res.json())
      .then(data => setWallpapers(data.wallpapers || []))
      .catch(error => console.error('Error fetching wallpapers:', error));

    fetch('/categories.json')
      .then(res => res.json())
      .then(data => setCategories(data.categories || []))
      .catch(error => console.error('Error fetching categories:', error));

    // --- NEW FETCH FOR PACKS ---
    fetch('/packs.json')
      .then(res => res.json())
      .then(data => setPacks(data.packs || []))
      .catch(error => console.error('Error fetching packs:', error));
  }, []);

  // ... (all handler functions and the rest of the file remain the same)
  
  const renderCurrentView = () => {
    switch (currentView) {
      case 'gallery':
        return (
          <WallpaperGallery
            wallpapers={wallpapers}
            categories={categories}
            packs={packs} // <-- PASS PACKS AS A PROP
            onWallpaperSelect={handleWallpaperSelect}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            isAuthenticated={isAuthenticated}
            searchQuery={searchQuery}
          />
        );
      // ... (rest of switch statement is unchanged)
    }
  };

  // ... (rest of App.tsx is unchanged)
}
