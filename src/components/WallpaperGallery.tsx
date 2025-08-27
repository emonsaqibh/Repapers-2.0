import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { WallpaperCard } from './WallpaperCard';
import { PackCard } from './PackCard'; // <-- IMPORT THE NEW PACKCARD
import Fuse from 'fuse.js';
import { TrendingUp, Clock, Heart, Palette, Star } from 'lucide-react';
import { cn } from './ui/utils';

export function WallpaperGallery({ wallpapers, categories, packs, onWallpaperSelect, favorites, onToggleFavorite, isAuthenticated, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  // Logic to determine what to show: individual wallpapers or packs
  const isExclusiveView = selectedCategory === 'exclusive';

  const displayItems = useMemo(() => {
    let items;
    // If 'exclusive' is selected, filter the packs
    if (isExclusiveView) {
      items = packs.filter(pack => pack.category === 'exclusive');
    } else {
      // Otherwise, filter the wallpapers by category
      items = wallpapers.filter(wallpaper => {
        const categoryId = wallpaper.category || '';
        return selectedCategory === 'all' || categoryId === selectedCategory;
      });
    }

    // Apply fuzzy search on the title
    if (searchQuery && searchQuery.trim() !== '') {
      const fuse = new Fuse(items, {
        keys: ['title'],
        threshold: 0.4,
      });
      return fuse.search(searchQuery).map(result => result.item);
    }
    
    return items;
  }, [searchQuery, selectedCategory, wallpapers, packs, isExclusiveView]);

  // ... (sorting logic is unchanged)
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... (Category buttons section is unchanged) ... */}
      
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">
            {categories.find(c => c.id === selectedCategory)?.name || 'All Wallpapers'}
          </h3>
          <Badge variant="secondary">
            {displayItems.length} {isExclusiveView ? 'packs' : 'wallpapers'}
          </Badge>
      </div>

      {/* --- MODIFIED GRID TO SHOW PACKS OR WALLPAPERS --- */}
      <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6`}>
        {isExclusiveView
          ? displayItems.map(pack => (
              <PackCard
                key={pack.id}
                pack={pack}
                onSelect={() => {
                  // We'll need to build the pack detail view next
                  console.log('Selected pack:', pack.title);
                }}
              />
            ))
          : displayItems.map(wallpaper => (
              <WallpaperCard
                key={wallpaper.id}
                wallpaper={wallpaper}
                onSelect={() => onWallpaperSelect(wallpaper)}
                onToggleFavorite={() => onToggleFavorite(wallpaper.id)}
                isFavorite={favorites.includes(wallpaper.id)}
                isAuthenticated={isAuthenticated}
              />
            ))}
      </div>

      {/* ... (No results message is unchanged) ... */}
    </div>
  );
}
