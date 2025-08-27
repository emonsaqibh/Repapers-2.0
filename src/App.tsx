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
  const [packs, setPacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // This useEffect for reading from localStorage is correct and remains unchanged
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('currentUser');
    const storedTheme = localStorage.getItem('isDarkMode');
    const storedFavorites = localStorage.getItem('favorites');
    
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
    }
    if (storedTheme === 'true') {
      setIsDarkMode(true);
    }
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // This useEffect for fetching data is now safer
    fetch('/wallpapers.json')
      .then(res => res.json())
      .then(data => setWallpapers(data.wallpapers || [])) // Safety check
      .catch(error => console.error('Error fetching wallpapers:', error));

    fetch('/categories.json')
      .then(res => res.json())
      .then(data => setCategories(data.categories || [])) // Safety check
      .catch(error => console.error('Error fetching categories:', error));

    fetch('/packs.json')
      .then(res => res.json())
      .then(data => setPacks(data.packs || [])) // Safety check
      .catch(error => console.error('Error fetching packs:', error));
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentView('gallery');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentView('gallery');
    setProfileTab('profile');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('isDarkMode', newTheme.toString());
  };

  const toggleFavorite = (wallpaperId) => {
    const newFavorites = favorites.includes(wallpaperId)
      ? favorites.filter(id => id !== wallpaperId)
      : [...favorites, wallpaperId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleWallpaperSelect = (wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setCurrentView('detail');
  };

  const handleProfileClick = () => {
    setProfileTab('profile');
    setCurrentView('profile');
  };

  const handleFavoritesClick = () => {
    setProfileTab('favorites');
    setCurrentView('profile');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'gallery':
        return (
          <WallpaperGallery
            wallpapers={wallpapers}
            categories={categories}
            packs={packs}
            onWallpaperSelect={handleWallpaperSelect}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            isAuthenticated={isAuthenticated}
            searchQuery={searchQuery}
          />
        );
      case 'detail':
        return (
          <WallpaperDetail
            wallpaper={selectedWallpaper}
            onBack={() => setCurrentView('gallery')}
            onToggleFavorite={toggleFavorite}
            isFavorite={selectedWallpaper ? favorites.includes(selectedWallpaper.id) : false}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'profile':
        return (
          <UserProfile
            user={currentUser}
            favoriteWallpapers={wallpapers.filter(w => favorites.includes(w.id))}
            onWallpaperSelect={handleWallpaperSelect}
            onViewChange={setCurrentView}
            activeTab={profileTab}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  if (!isAuthenticated && currentView !== 'gallery') {
    return <AuthScreen onLogin={handleLogin} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-geist">
      <Header
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onLogin={() => setCurrentView('auth')}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
        onFavoritesClick={handleFavoritesClick}
        onLogoClick={() => setCurrentView('gallery')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {currentView === 'auth' ? (
        <AuthScreen onLogin={handleLogin} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      ) : (
        <main className="pt-16">
          {renderCurrentView()}
        </main>
      )}
    </div>
  );
}
