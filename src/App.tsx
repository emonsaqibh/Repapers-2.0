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

  useEffect(() => {
    // Check for stored auth state and theme preference
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
    // Apply dark mode class to document
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
    setCurrentView('gallery'); // Redirect to gallery after login
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
            onWallpaperSelect={handleWallpaperSelect}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'detail':
        return (
          <WallpaperDetail
            wallpaper={selectedWallpaper}
            onBack={() => setCurrentView('gallery')}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(selectedWallpaper?.id)}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'profile':
        return (
          <UserProfile
            user={currentUser}
            favorites={favorites}
            onWallpaperSelect={handleWallpaperSelect}
            onViewChange={setCurrentView}
            activeTab={profileTab}
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