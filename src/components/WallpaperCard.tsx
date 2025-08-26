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

  const authorName = wallpaper.author?.name || 'Unknown Artist';
  const title = wallpaper.title || 'Untitled';
  const tags = wallpaper.tags || [];
  const downloads = wallpaper.stats?.downloads || 0;
  const likes = wallpaper.stats?.likes || 0;
  const uploadDate = wallpaper.upload_date;
  
  // --- MODIFIED CODE: Use the new thumbnail field for the display image ---
  const displayImage = wallpaper.thumbnail || wallpaper.download_options?.[0]?.path || '';
  const resolution = wallpaper.download_options?.[0]?.resolution || 'N/A';
  // --- END OF MODIFIED CODE ---

  const handleDownload = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return;

    const bestOption = wallpaper.download_options?.[wallpaper.download_options.length - 1];
    if (!bestOption || !bestOption.path) {
      console.error('No downloadable file found.');
      alert('Sorry, this download is not available.');
      return;
    }

    const button = e.currentTarget;
    button.innerHTML = '...';
    button.disabled = true;

    try {
      const response = await fetch(bestOption.path);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      const fileExtension = bestOption.path.split('.').pop();
      const fileName = `${title.replace(/\s+/g, '_')}_${bestOption.resolution}.${fileExtension}`;
      
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('An error occurred while trying to download the file.');
    } finally {
      button.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>`;
      button.disabled = false;
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      return;
    }
    onToggleFavorite();
  };

  // The list view code is omitted for brevity but should be kept in your file
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
                  src={displayImage}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
              </div>
              
              <div className="flex-1 p-4 flex justify-between items-center min-w-0">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-2 truncate">{title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2 flex-wrap">
                    <div className="flex items-center gap-1"><User className="w-4 h-4 flex-shrink-0" /> <span className="truncate">{authorName}</span></div>
                    <div className="flex items-center gap-1"><Monitor className="w-4 h-4 flex-shrink-0" /> <span>{resolution}</span></div>
                    <div className="flex items-center gap-1"><Download className="w-4 h-4 flex-shrink-0" /> <span>{downloads.toLocaleString()}</span></div>
                    <div className="flex items-center gap-1"><Heart className="w-4 h-4 flex-shrink-0" /> <span>{likes.toLocaleString()}</span></div>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {tags.slice(0, 3).map(tag => (<Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>))}
                  </div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <Button variant="outline" size="sm" onClick={handleFavorite} disabled={!isAuthenticated} className={isFavorite ? 'text-red-500 border-red-500' : ''}>
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button size="sm" onClick={handleDownload} disabled={!isAuthenticated}>
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
              src={displayImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onLoad={() => setImageLoaded(true)}
            />
            
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}

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
                      {resolution}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {downloads.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {likes.toLocaleString()}
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
            <h3 className="font-semibold truncate mb-2">{title}</h3>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`} />
                  <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="truncate">{authorName}</span>
              </div>
              <div className="flex items-center gap-1">
                {uploadDate && (
                  <>
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(uploadDate).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex gap-1 mt-2">
              {tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
