import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// New, more detailed SVG for the MacBook-style frame
const MacbookFrame = () => (
    <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 847.252V65.8333C0 41.534 19.9381 21.5952 44.2381 21.5952H1395.76C1420.06 21.5952 1440 41.534 1440 65.8333V847.252C1440 859.34 1429.98 869.31 1417.89 869.31H1202.9C1199.9 869.31 1197.16 871.252 1196.26 874.071L1146.33 900H293.671L243.738 874.071C242.842 871.252 240.097 869.31 237.097 869.31H22.1053C10.0179 869.31 0 859.34 0 847.252Z" fill="#d1d5db"/>
        <path d="M44.2381 31.5952H1395.76C1414.54 31.5952 1430 47.0519 1430 65.8333V820H10V65.8333C10 47.0519 25.4567 31.5952 44.2381 31.5952Z" fill="#111827"/>
        <path d="M660 38.5952H780C784.418 38.5952 788 42.1771 788 46.5952V47.5952C788 48.1475 787.552 48.5952 787 48.5952H653C652.448 48.5952 652 48.1475 652 47.5952V46.5952C652 42.1771 655.582 38.5952 660 38.5952Z" fill="#222"/>
    </svg>
);

// Improved SVG for the iPhone-style frame
const IphoneFrame = () => (
    <svg width="100%" height="100%" viewBox="0 0 428 880" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="420" height="872" rx="50" fill="#111827" stroke="#4b5563" stroke-width="8"/>
        <path d="M151 20H277C286.941 20 295 28.0589 295 38V42C295 43.1046 294.105 44 293 44H135C133.895 44 133 43.1046 133 42V38C133 28.0589 141.059 20 151 20Z" fill="#000"/>
    </svg>
);


export function PreviewPage({ wallpaper, onBack }) {
  if (!wallpaper) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <p className="text-center">Wallpaper data is missing. Please go back and select a wallpaper.</p>
        <Button variant="ghost" onClick={onBack} className="absolute top-4 left-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    );
  }
  
  // Use the highest resolution available for the best preview quality
  const mainImage = wallpaper.download_options?.[wallpaper.download_options.length - 1]?.path || '';

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-8">
      <header className="flex items-center justify-between fixed top-0 left-0 right-0 p-4 z-20">
        <Button variant="outline" onClick={onBack} className="bg-background/80 backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>
         <h1 className="text-xl font-bold text-center text-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg">
            Mockup Preview
        </h1>
        {/* Empty div for spacing */}
        <div></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-items-center min-h-screen">
        {/* Desktop Mockup */}
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full pt-16 lg:pt-0">
          <h2 className="text-lg font-medium text-muted-foreground">Desktop</h2>
          <div className="relative w-full max-w-4xl aspect-[16/10]">
            <ImageWithFallback
              src={mainImage}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ padding: '2.5% 3.5% 10% 3.5%' }}
            />
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MacbookFrame />
            </div>
          </div>
        </div>

        {/* Mobile Mockup */}
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full pt-8 lg:pt-0">
          <h2 className="text-lg font-medium text-muted-foreground">Mobile</h2>
          <div className="relative h-[75vh] max-h-[750px] aspect-[9/19.5]">
             <ImageWithFallback
              src={mainImage}
              className="absolute inset-0 w-full h-full object-cover rounded-[40px]"
              style={{ padding: '3.5%' }}
            />
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <IphoneFrame />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
