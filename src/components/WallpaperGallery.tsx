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

export function WallpaperGallery({ onWallpaperSelect, favorites, onToggleFavorite, isAuthenticated }) {
  const [viewMode, setViewMode] = useState('grid');
  const [gridSize, setGridSize] = useState('medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedWallpaperIndex, setSelectedWallpaperIndex] = useState(0);

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

  // Mock wallpaper data
  const mockWallpapers = [
    {
      id: '1',
      title: 'Mountain Vista',
      category: 'nature',
      resolution: '4K',
      downloads: 12500,
      likes: 892,
      tags: ['mountain', 'nature', 'landscape'],
      author: 'Alex Chen',
      uploadDate: '2024-01-15',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    },
    {
      id: '2',
      title: 'Abstract Waves',
      category: 'abstract',
      resolution: '4K',
      downloads: 8900,
      likes: 654,
      tags: ['abstract', 'waves', 'colorful'],
      author: 'Maria Garcia',
      uploadDate: '2024-01-12',
      url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800'
    },
    {
      id: '3',
      title: 'City Lights',
      category: 'city',
      resolution: '4K',
      downloads: 15600,
      likes: 1203,
      tags: ['city', 'night', 'lights'],
      author: 'John Smith',
      uploadDate: '2024-01-10',
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'
    },
    {
      id: '4',
      title: 'Galaxy Dreams',
      category: 'space',
      resolution: '8K',
      downloads: 22100,
      likes: 1876,
      tags: ['space', 'galaxy', 'stars'],
      author: 'Emma Wilson',
      uploadDate: '2024-01-08',
      url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800'
    },
    {
      id: '5',
      title: 'Minimalist Sunset',
      category: 'minimalist',
      resolution: '4K',
      downloads: 9800,
      likes: 743,
      tags: ['minimalist', 'sunset', 'clean'],
      author: 'David Park',
      uploadDate: '2024-01-05',
      url: 'https://images.unsplash.com/photo-1464822759844-d150baec328b?w=800'
    },
    {
      id: '6',
      title: 'Forest Path',
      category: 'nature',
      resolution: '4K',
      downloads: 11200,
      likes: 856,
      tags: ['forest', 'path', 'peaceful'],
      author: 'Sarah Kim',
      uploadDate: '2024-01-03',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setWallpapers(mockWallpapers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredWallpapers = wallpapers.filter(wallpaper => {
    const matchesCategory = selectedCategory === 'all' || wallpaper.category === selectedCategory;
    const matchesSearch = wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wallpaper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedWallpapers = [...filteredWallpapers].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.downloads - a.downloads;
      case 'newest':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'popular':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const handleWallpaperClick = (wallpaper) => {
    const index = sortedWallpapers.findIndex(w => w.id === wallpaper.id);
    setSelectedWallpaperIndex(index);
    setImageViewerOpen(true);
  };

  const handleNextWallpaper = () => {
    if (selectedWallpaperIndex < sortedWallpapers.length - 1) {
      setSelectedWallpaperIndex(prev => prev + 1);
    }
  };

  const handlePreviousWallpaper = () => {
    if (selectedWallpaperIndex > 0) {
      setSelectedWallpaperIndex(prev => prev - 1);
    }
  };

  const getGridCols = () => {
    switch (gridSize) {
      case 'small': return 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6';
      case 'medium': return 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4';
      case 'large': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default: return 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

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

          <div className="flex border border-border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {viewMode === 'grid' && (
            <Select value={gridSize} onValueChange={setGridSize}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">
            {selectedCategory === 'all' ? 'All Wallpapers' : 
             categories.find(c => c.id === selectedCategory)?.name}
          </h3>
          <Badge variant="secondary">
            {sortedWallpapers.length} wallpapers
          </Badge>
        </div>
      </div>

      {/* Wallpaper Grid/List */}
      {viewMode === 'grid' ? (
        <div className={`grid ${getGridCols()} gap-6`}>
          {sortedWallpapers.map(wallpaper => (
            <WallpaperCard
              key={wallpaper.id}
              wallpaper={wallpaper}
              onSelect={() => handleWallpaperClick(wallpaper)}
              onToggleFavorite={() => onToggleFavorite(wallpaper.id)}
              isFavorite={favorites.includes(wallpaper.id)}
              isAuthenticated={isAuthenticated}
              viewMode="grid"
              size={gridSize}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedWallpapers.map(wallpaper => (
            <WallpaperCard
              key={wallpaper.id}
              wallpaper={wallpaper}
              onSelect={() => handleWallpaperClick(wallpaper)}
              onToggleFavorite={() => onToggleFavorite(wallpaper.id)}
              isFavorite={favorites.includes(wallpaper.id)}
              isAuthenticated={isAuthenticated}
              viewMode="list"
            />
          ))}
        </div>
      )}

      {sortedWallpapers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No wallpapers found matching your criteria.</p>
        </div>
      )}

      {/* Image Viewer */}
      <ImageViewer
        wallpaper={sortedWallpapers[selectedWallpaperIndex]}
        isOpen={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
        onToggleFavorite={onToggleFavorite}
        isFavorite={favorites.includes(sortedWallpapers[selectedWallpaperIndex]?.id)}
        isAuthenticated={isAuthenticated}
        onNext={handleNextWallpaper}
        onPrevious={handlePreviousWallpaper}
        hasNext={selectedWallpaperIndex < sortedWallpapers.length - 1}
        hasPrevious={selectedWallpaperIndex > 0}
      />
    </div>
  );
}