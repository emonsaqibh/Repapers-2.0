import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { WallpaperCard } from './WallpaperCard';
import Fuse from 'fuse.js';
import { 
  TrendingUp, 
  Clock, 
  Heart,
  Palette
} from 'lucide-react';
import { cn } from './ui/utils';

export function WallpaperGallery({ wallpapers, categories, onWallpaperSelect, favorites, onToggleFavorite, isAuthenticated, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  const filteredWallpapers = useMemo(() => {
    const categoryFiltered = wallpapers.filter(wallpaper => {
      const categoryId = wallpaper.category || '';
      return selectedCategory === 'all' || categoryId === selectedCategory;
    });

    if (searchQuery && searchQuery.trim() !== '') {
      const fuse = new Fuse(categoryFiltered, {
        keys: ['title', 'tags', 'author.name'],
        threshold: 0.4,
      });
      return fuse.search(searchQuery).map(result => result.item);
    }
    
    return categoryFiltered;
  }, [searchQuery, selectedCategory, wallpapers]);

  const sortedWallpapers = useMemo(() => {
    return [...filteredWallpapers].sort((a, b) => {
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
  }, [filteredWallpapers, sortBy]);

  const handleWallpaperClick = (wallpaper) => {
    onWallpaperSelect(wallpaper);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Browse Categories</h2>
        <div className="flex flex-wrap gap-2">
          <Button key="all" variant={selectedCategory === 'all' ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory('all')} className="flex items-center gap-2">
            <Palette className="w-4 h-4" />All
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

      <div className="flex justify-end gap-4 mb-6">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Sort by" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="trending"><div className="flex items-center gap-2"><TrendingUp className="w-4 h-4" />Trending</div></SelectItem>
            <SelectItem value="newest"><div className="flex items-center gap-2"><Clock className="w-4 h-4" />Newest</div></SelectItem>
            <SelectItem value="popular"><div className="flex items-center gap-2"><Heart className="w-4 h-4" />Popular</div></SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">
            {categories.find(c => c.id === selectedCategory)?.name || 'All Wallpapers'}
          </h3>
          <Badge variant="secondary">
            {sortedWallpapers.length} wallpapers
          </Badge>
      </div>

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
