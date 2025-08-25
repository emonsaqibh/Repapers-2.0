import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { WallpaperCard } from './WallpaperCard';
import { ImageViewer } from './ImageViewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Grid3X3, 
  List, 
  Filter, 
  Search, 
  TrendingUp, 
  Clock, 
  Heart,
  Trees,
  Shapes,
  Mountain,
  Building2,
  Sparkles,
  Cat,
  Laptop,
  Circle,
  Palette
} from 'lucide-react';

// The component now accepts 'wallpapers' as a prop
export function WallpaperGallery({ wallpapers, onWallpaperSelect, favorites, onToggleFavorite, isAuthenticated }) {
  const [viewMode, setViewMode] = useState('grid');
  const [gridSize, setGridSize] = useState('medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedWallpaperIndex, setSelectedWallpaperIndex] = useState(0);

  // NOTE: The categories are still hardcoded for now. We can make this dynamic next.
  const categories = [
    { id: 'all', name: 'All', icon: Palette },
    { id: 'nature', name: 'Nature', icon: Trees },
    { id: 'abstract', name: 'Abstract', icon: Shapes },
    { id: 'landscape', name: 'Landscape', icon: Mountain },
    { id: 'city', name: 'City', icon: Building2 },
    { id: 'space', name: 'Space', icon: Sparkles },
    { id: 'animals', name: 'Animals', icon: Cat },
    { id: 'technology', name: 'Technology', icon: Laptop },
    { id: 'minimalist', name: 'Minimalist', icon: Circle },
    { id: 'artistic', name: 'Artistic', icon: Palette }
  ];

  // The 'wallpapers' variable below now comes directly from the props.
  const filteredWallpapers = wallpapers.filter(wallpaper => {
    const matchesCategory = selectedCategory === 'all' || wallpaper.category.toLowerCase() === selectedCategory;
    const matchesSearch = wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wallpaper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedWallpapers = [...filteredWallpapers].sort((a, b) => {
    // NOTE: Sorting now uses the data structure from your CMS.
    switch (sortBy) {
      case 'trending':
        return b.stats.downloads - a.stats.downloads;
      case 'newest':
        return new Date(b.upload_date) - new Date(a.upload_date);
      case 'popular':
        return b.stats.likes - a.stats.likes;
      default:
        return 0;
    }
  });

  const handleWallpaperClick = (wallpaper) => {
    // The onWallpaperSelect function (to show details) is now called directly.
    onWallpaperSelect(wallpaper);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Browse Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </Button>
            );
          })}
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
            {
