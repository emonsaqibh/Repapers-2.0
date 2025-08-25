import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { WallpaperCard } from './WallpaperCard';
import { 
  Search, 
  TrendingUp, 
  Clock, 
  Heart,
  Palette
} from 'lucide-react';

export function WallpaperGallery({ wallpapers, categories, onWallpaperSelect, favorites, onToggleFavorite, isAuthenticated }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  const filteredWallpapers = wallpapers.filter(wallpaper => {
    const categoryLower = wallpaper.category?.toLowerCase() || '';
    const matchesCategory = selectedCategory === 'all' || categoryLower === selectedCategory;
    
    const titleLower = wallpaper.title?.toLowerCase() || '';
    const matchesSearch = titleLower.includes(searchQuery.toLowerCase()) ||
                         (wallpaper.tags && wallpaper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  const sortedWallpapers = [...filteredWallpapers].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return (b.stats?.downloads || 0) - (a.stats?.downloads || 0);
      case 'newest':
        return new Date(b.upload_date || 0).getTime() - new Date(a.upload_date || 0).getTime();
      case 'popular':
        return (b.stats?.likes || 0) - (a.stats?.likes || 0);
      default:
        return 0;
    }
  });

  const handleWallpaperClick = (wallpaper) => {
    onWallpaperSelect(wallpaper);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Browse Categories</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            key="all"
            variant={selectedCategory === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="flex items-center gap-2"
          >
            <Palette className="w-4 h-4" />
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search wallpapers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </div>
              </SelectItem>
              <SelectItem value="newest">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Newest
                </div>
              </SelectItem>
              <SelectItem value="popular">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Popular
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">
            {selectedCategory === 'all' ? 'All Wallpapers' : 
             categories.find(c => c.id === selectedCategory)?.name}
          </h3>
          <Badge variant="secondary">
            {sortedWallpapers.length} wallpapers
          </Badge>
      </div>

      {/* Wallpaper Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6`}>
        {sortedWallpapers.map(wallpaper => (
          <WallpaperCard
            key={wallpaper.id}
            wallpaper={wallpaper}
            onSelect={() => handleWallpaperClick(wallpaper)}
            onToggleFavorite={() => onToggleFavorite(wallpaper.id)}
            isFavorite={favorites.includes(wallpaper.id)}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>

      {sortedWallpapers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No wallpapers found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
