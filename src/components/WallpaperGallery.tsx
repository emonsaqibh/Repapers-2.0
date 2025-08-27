import React, { useState, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { WallpaperCard } from './WallpaperCard';
import Fuse from 'fuse.js';
import { 
  Search, 
  TrendingUp, 
  Clock, 
  Heart,
  Palette,
  Star // <-- 1. IMPORT THE STAR ICON
} from 'lucide-react';
import { cn } from './ui/utils'; // Import the cn utility

export function WallpaperGallery({ wallpapers, categories, onWallpaperSelect, favorites, onToggleFavorite, isAuthenticated, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  const filteredWallpapers = useMemo(() => {
    // ... (filtering and sorting logic remains the same)
  }, [searchQuery, selectedCategory, wallpapers]);

  const sortedWallpapers = useMemo(() => {
    // ... (sorting logic remains the same)
  }, [filteredWallpapers, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Browse Categories</h2>
        <div className="flex flex-wrap gap-2">
          <Button key="all" variant={selectedCategory === 'all' ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory('all')} className="flex items-center gap-2">
            <Palette className="w-4 h-4" />All
          </Button>
          
          {/* --- 2. MODIFIED CATEGORY BUTTON LOGIC --- */}
          {categories.map(category => {
            const isExclusive = category.id === 'exclusive';
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                // Apply the special glowing class if the category is 'exclusive'
                className={cn(
                  "flex items-center gap-2",
                  isExclusive && "exclusive-button"
                )}
              >
                {/* Use a Star icon if the category is 'exclusive' */}
                {isExclusive ? <Star className="w-4 h-4" /> : <Palette className="w-4 h-4" />}
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* ... (rest of the component remains the same) ... */}
    </div>
  );
}
