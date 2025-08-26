import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MockupPreview } from './MockupPreview'; // Import the new component
import { 
  ArrowLeft, 
  Download, 
  Heart, 
  Share2, 
  Eye, 
  Calendar, 
  Monitor, 
  User,
  Check,
  Smartphone, // Added Smartphone icon
  Laptop // Added Laptop icon
} from 'lucide-react';
import { motion } from 'motion/react';

export function WallpaperDetail({ 
  wallpaper, 
  onBack, 
  onToggleFavorite, 
  isFavorite, 
  isAuthenticated 
}) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [mockupView, setMockupView] = useState(null); // State for mockup view

  if (!wallpaper) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <p>Wallpaper not found.</p>
        </div>
    );
  }

  const title = wallpaper.title || 'Untitled';
  const authorName = wallpaper.author?.name || 'Unknown Artist';
  const authorTitle = wallpaper.author?.title || 'Digital Artist';
  const tags = wallpaper.tags || [];
  const downloads = wallpaper.stats?.downloads || 0;
  const likes = wallpaper.stats?.likes || 0;
  const uploadDate = wallpaper.upload_date;
  const category = wallpaper.category || 'N/A';
  const downloadOptions = wallpaper.download_options || [];

  const mainImage = downloadOptions.length > 0 ? downloadOptions[downloadOptions.length - 1].path : '';
  const mainResolution = downloadOptions.length > 0 ? downloadOptions[downloadOptions.length - 1].resolution : 'N/A';
  
  const [downloadSize, setDownloadSize] = useState(mainResolution);

  const handleDownload = async () => {
    if (!isAuthenticated) return;
    const selectedOption = downloadOptions.find(option => option.resolution === downloadSize);
    if (!selectedOption || !selectedOption.path) {
      console.error('Selected resolution not found or has no path.');
      alert('Sorry, this download is not available.');
      return;
    }
    setDownloading(true);
    try {
      const response = await fetch(selectedOption.path);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      const fileExtension = selectedOption.path.split('.').pop();
      const fileName = `${title.replace(/\s+/g, '_')}_${downloadSize}.${fileExtension}`;
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
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: `Check out this amazing wallpaper: ${title}`, url: window.location.href });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const relatedWallpapers = [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onToggleFavorite} disabled={!isAuthenticated} className={isFavorite ? 'text-red-500 border-red-500' : ''}>
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favorited' : 'Favorite'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Share2 className="w-4 h-4" /> Share</>}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] relative">
                    <ImageWithFallback src={mainImage} alt={title} className="w-full h-full object-cover" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => setMockupView('desktop')}>
                <Laptop className="w-4 h-4 mr-2" />
                Desktop Preview
              </Button>
              <Button variant="outline" onClick={() => setMockupView('mobile')}>
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile Preview
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Card><CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2"><Eye className="w-5 h-5 text-muted-foreground" /></div>
                <div className="text-2xl font-bold">{downloads.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </CardContent></Card>
              <Card><CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2"><Heart className="w-5 h-5 text-muted-foreground" /></div>
                <div className="text-2xl font-bold">{likes.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Likes</div>
              </CardContent></Card>
              <Card><CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2"><Monitor className="w-5 h-5 text-muted-foreground" /></div>
                <div className="text-2xl font-bold">{mainResolution}</div>
                <div className="text-sm text-muted-foreground">Resolution</div>
              </CardContent></Card>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`} />
                  <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{authorName}</div>
                  <div className="text-sm text-muted-foreground">{authorTitle}</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (<Badge key={tag} variant="secondary">{tag}</Badge>))}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium mb-4">Download Wallpaper</h3>
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Resolution</label>
                    <div className="grid grid-cols-2 gap-2">
                      {downloadOptions.map(option => (
                        <Button
                          key={option.resolution}
                          variant={downloadSize === option.resolution ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setDownloadSize(option.resolution)}
                          className="flex justify-center items-center p-4 h-auto"
                        >
                          <div className="font-medium">{option.resolution}</div>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleDownload} disabled={downloading} className="w-full" size="lg">
                    {downloading ? (
                      <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />Downloading...</>
                    ) : (
                      <><Download className="w-4 h-4 mr-2" />Download {downloadSize}</>
                    )}
                  </Button>
                </div>
              ) : (
                <Card className="border-dashed border-2"><CardContent className="p-6 text-center">
                  <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="font-medium mb-2">Sign in to Download</h4>
                  <Button>Sign In</Button>
                </CardContent></Card>
              )}
            </div>
            <Separator />
            <div className="space-y-3">
              <h3 className="font-medium">Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="capitalize">{category}</span></div>
                {uploadDate && <div className="flex justify-between"><span className="text-muted-foreground">Upload Date</span><span>{new Date(uploadDate).toLocaleDateString()}</span></div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mockupView && (
        <MockupPreview
          wallpaperUrl={mainImage}
          mockupType={mockupView}
          onClose={() => setMockupView(null)}
        />
      )}
    </div>
  );
}
