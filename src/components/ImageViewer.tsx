import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  X, 
  Download, 
  Heart, 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  Maximize2,
  Monitor,
  Calendar,
  Tag,
  User,
  FileType,
  Palette,
  HardDrive,
  Eye,
  ThumbsUp,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ImageViewer({ 
  wallpaper, 
  isOpen, 
  onClose, 
  onToggleFavorite, 
  isFavorite, 
  isAuthenticated,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setRotation(0);
      setImageLoaded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious) onPrevious();
          break;
        case 'ArrowRight':
          if (hasNext) onNext();
          break;
        case '+':
        case '=':
          setZoom(prev => Math.min(prev * 1.2, 3));
          break;
        case '-':
          setZoom(prev => Math.max(prev / 1.2, 0.5));
          break;
        case '0':
          setZoom(1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, hasNext, hasPrevious, onNext, onPrevious, onClose]);

  const handleDownload = () => {
    if (!isAuthenticated) return;
    console.log('Downloading:', wallpaper.title);
    // Trigger download logic here
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: wallpaper.title,
          text: `Check out this wallpaper: ${wallpaper.title}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleResetZoom = () => setZoom(1);

  if (!isOpen || !wallpaper) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <h2 className="text-white font-semibold text-lg">{wallpaper.title}</h2>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {wallpaper.resolution}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Navigation */}
              {hasPrevious && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrevious();
                  }}
                  className="text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
              
              {hasNext && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                  className="text-white hover:bg-white/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}

              {/* Zoom Controls */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="text-white hover:bg-white/20"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              
              <span className="text-white text-sm min-w-12 text-center">
                {Math.round(zoom * 100)}%
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="text-white hover:bg-white/20"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>

              {/* Rotate */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRotate();
                }}
                className="text-white hover:bg-white/20"
              >
                <RotateCw className="w-4 h-4" />
              </Button>

              {/* Close */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-full pt-16">
          {/* Image Area */}
          <div 
            className="flex-1 flex items-center justify-center p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{ 
                scale: zoom,
                rotate: rotation
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-full max-h-full"
            >
              <ImageWithFallback
                src={wallpaper.url}
                alt={wallpaper.title}
                className="max-w-full max-h-full object-contain cursor-zoom-in"
                onLoad={() => setImageLoaded(true)}
                onClick={handleZoomIn}
              />
              
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted/20 animate-pulse rounded-lg" />
              )}
            </motion.div>
          </div>

          {/* Details Panel */}
          <motion.div
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            className="w-80 bg-card border-l border-border h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleFavorite(wallpaper.id)}
                  disabled={!isAuthenticated}
                  className={isFavorite ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                </Button>
                
                <Button
                  size="sm"
                  onClick={handleDownload}
                  disabled={!isAuthenticated}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              <Separator />

              {/* Author Info */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Author
                </h3>
                <div className="text-sm">
                  <div className="font-medium">{wallpaper.author}</div>
                  <div className="text-muted-foreground">Digital Artist</div>
                </div>
              </div>

              <Separator />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="font-semibold">{wallpaper.downloads.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Downloads</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="font-semibold">{wallpaper.likes.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Likes</div>
                </div>
              </div>

              <Separator />

              {/* Technical Details */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Technical Details
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Monitor className="w-3 h-3" />
                      Resolution
                    </span>
                    <span className="font-medium">{wallpaper.resolution}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <FileType className="w-3 h-3" />
                      Format
                    </span>
                    <span className="font-medium">JPG</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <HardDrive className="w-3 h-3" />
                      File Size
                    </span>
                    <span className="font-medium">8.2 MB</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Palette className="w-3 h-3" />
                      Color Space
                    </span>
                    <span className="font-medium">sRGB</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      Upload Date
                    </span>
                    <span className="font-medium">
                      {new Date(wallpaper.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Category & Tags */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Category & Tags
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Category</div>
                    <Badge variant="secondary" className="capitalize">
                      {wallpaper.category}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {wallpaper.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Options */}
              {isAuthenticated && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-semibold">Download Options</h3>
                    <div className="space-y-2">
                      {['1080p', '2K', '4K', '8K'].map(resolution => (
                        <Button
                          key={resolution}
                          variant="outline"
                          size="sm"
                          className="w-full justify-between"
                          onClick={() => console.log(`Download ${resolution}`)}
                        >
                          <span>{resolution}</span>
                          <Download className="w-3 h-3" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
            Use arrow keys to navigate • +/- to zoom • 0 to reset • ESC to close
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}