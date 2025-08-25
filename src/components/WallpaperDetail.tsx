import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Download, 
  Heart, 
  Share2, 
  Eye, 
  Calendar, 
  Monitor, 
  Palette, 
  User,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

export function WallpaperDetail({ 
  wallpaper, 
  onBack, 
  onToggleFavorite, 
  isFavorite, 
  isAuthenticated 
}) {
  const [downloadSize, setDownloadSize] = useState('4K');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const downloadSizes = [
    { name: '1080p', size: '1920×1080', fileSize: '2.1 MB' },
    { name: '2K', size: '2560×1440', fileSize: '4.8 MB' },
    { name: '4K', size: '3840×2160', fileSize: '12.3 MB' },
    { name: '8K', size: '7680×4320', fileSize: '45.7 MB' }
  ];

  const handleDownload = async () => {
    if (!isAuthenticated) {
      return;
    }
    
    setDownloading(true);
    // Simulate download process
    setTimeout(() => {
      setDownloading(false);
      // In a real app, this would trigger the actual download
      console.log(`Downloading ${wallpaper.title} in ${downloadSize}`);
    }, 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: wallpaper.title,
          text: `Check out this amazing wallpaper: ${wallpaper.title}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedWallpapers = [
    {
      id: 'r1',
      title: 'Similar Mountain',
      url: 'https://images.unsplash.com/photo-1464822759844-d150baec328b?w=400'
    },
    {
      id: 'r2',
      title: 'Nature Vista',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
    },
    {
      id: 'r3',
      title: 'Landscape Beauty',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFavorite}
              disabled={!isAuthenticated}
              className={isFavorite ? 'text-red-500 border-red-500' : ''}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favorited' : 'Favorite'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Preview */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] relative">
                    <ImageWithFallback
                      src={wallpaper.url}
                      alt={wallpaper.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Image Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{wallpaper.downloads.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Downloads</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{wallpaper.likes.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Likes</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Monitor className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{wallpaper.resolution}</div>
                  <div className="text-sm text-muted-foreground">Resolution</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Details and Download */}
          <div className="space-y-6">
            {/* Title and Author */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{wallpaper.title}</h1>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${wallpaper.author}`} />
                  <AvatarFallback>{wallpaper.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{wallpaper.author}</div>
                  <div className="text-sm text-muted-foreground">Digital Artist</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {wallpaper.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Download Section */}
            <div>
              <h3 className="font-medium mb-4">Download Wallpaper</h3>
              
              {!isAuthenticated ? (
                <Card className="border-dashed border-2">
                  <CardContent className="p-6 text-center">
                    <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-medium mb-2">Sign in to Download</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a free account to download high-quality wallpapers
                    </p>
                    <Button>Sign In</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Resolution</label>
                    <div className="grid grid-cols-2 gap-2">
                      {downloadSizes.map(size => (
                        <Button
                          key={size.name}
                          variant={downloadSize === size.name ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setDownloadSize(size.name)}
                          className="flex flex-col items-center p-4 h-auto"
                        >
                          <div className="font-medium">{size.name}</div>
                          <div className="text-xs text-muted-foreground">{size.size}</div>
                          <div className="text-xs text-muted-foreground">{size.fileSize}</div>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full"
                    size="lg"
                  >
                    {downloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download {downloadSize}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            {/* Metadata */}
            <div className="space-y-3">
              <h3 className="font-medium">Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="capitalize">{wallpaper.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Upload Date</span>
                  <span>{new Date(wallpaper.uploadDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resolution</span>
                  <span>{wallpaper.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">File Type</span>
                  <span>JPG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Color Space</span>
                  <span>sRGB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Wallpapers */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Related Wallpapers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedWallpapers.map(related => (
              <Card key={related.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] relative">
                    <ImageWithFallback
                      src={related.url}
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">{related.title}</h4>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}