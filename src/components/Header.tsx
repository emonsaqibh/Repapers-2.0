import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Moon, Sun, User, LogOut, Heart, Image } from 'lucide-react';

export function Header({ 
  isAuthenticated, 
  currentUser, 
  isDarkMode, 
  onToggleTheme, 
  onLogin, 
  onLogout, 
  onProfileClick,
  onFavoritesClick,
  onLogoClick,
  searchQuery,
  setSearchQuery
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={onLogoClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
              <Image className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              repapers
            </span>
          </button>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search wallpapers by title or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-0 focus:bg-muted/80 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              className="relative"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onFavoritesClick}
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  <span>Favorites</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onProfileClick}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <Button onClick={onLogin} size="sm">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
