import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { AspectRatio } from './ui/aspect-ratio';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Download, Eye, User, Calendar, Monitor } from 'lucide-react';
import { motion } from 'motion/react';

export function WallpaperCard({ 
  wallpaper, 
  onSelect, 
  onToggleFavorite, 
  isFavorite, 
  isAuthenticated, 
  viewMode = 'grid',
  size = 'medium'
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      // Show login prompt
      return;
    }
    // Trigger download
    console.log('Downloading:', wallpaper.title);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      return;
    }
    onToggleFavorite();
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <Card 
          className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
          onClick={onSelect}
        >
          <CardContent className="p-0">
            <div className="flex h-32">
              <div className="w-48 flex-shrink-0 relative overflow-hidden">
                <ImageWithFallback
                  src={wallpaper.url}
                  alt={wallpaper.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
              </div>
              
              <div className="flex-1 p-4 flex justify-between items-center min-w-0">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-2 truncate">{wallpaper.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{wallpaper.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Monitor className="w-4 h-4 flex-shrink-0" />
                      <span>{wallpaper.resolution}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4 flex-shrink-0" />
                      <span>{wallpaper.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 flex-shrink-0" />
                      <span>{wallpaper.likes.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {wallpaper.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFavorite}
                    disabled={!isAuthenticated}
                    className={isFavorite ? 'text-red-500 border-red-500' : ''}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleDownload}
                    disabled={!isAuthenticated}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
        onClick={onSelect}
      >
        <CardContent className="p-0">
          <AspectRatio ratio={3/4} className="relative overflow-hidden">
            <ImageWithFallback
              src={wallpaper.url}
              alt={wallpaper.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onLoad={() => setImageLoaded(true)}
            />
            
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}

            {/* Overlay with actions */}
            <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleFavorite}
                  disabled={!isAuthenticated}
                  className={`${isFavorite ? 'text-red-500' : 'text-white'} bg-white/20 backdrop-blur-sm border-0 hover:bg-white/30`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex justify-between items-end">
                  <div className="text-white">
                    <Badge className="mb-1 bg-white/20 text-white border-0">
                      {wallpaper.resolution}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {wallpaper.downloads.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {wallpaper.likes.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect();
                      }}
                      className="bg-white/20 backdrop-blur-sm border-0 hover:bg-white/30 text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleDownload}
                      disabled={!isAuthenticated}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </AspectRatio>
          
          <div className="p-4">
            <h3 className="font-semibold truncate mb-2">{wallpaper.title}</h3>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${wallpaper.author}`} />
                  <AvatarFallback>{wallpaper.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="truncate">{wallpaper.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(wallpaper.uploadDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex gap-1 mt-2">
              {wallpaper.tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {wallpaper.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{wallpaper.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}