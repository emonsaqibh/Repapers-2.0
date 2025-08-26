import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// A simpler, more robust SVG for the MacBook-style frame
const MacbookFrame = () => (
    <svg width="100%" height="100%" viewBox="0 0 1024 640" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="0" y="0" width="1024" height="600" rx="30" fill="#111827"/>
        <path d="M162 630L262 600H762L862 630H162Z" fill="#d1d5db"/>
        <rect x="472" y="12" width="80" height="10" rx="5" fill="#222"/>
    </svg>
);

// A simpler, more robust SVG for the iPhone-style frame
const IphoneFrame = () => (
    <svg width="100%" height="100%" viewBox="0 0 428 880" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="4" y="4" width="420" height="872" rx="50" fill="#1f2937" stroke="#6b7280" stroke-width="8"/>
        <path d="M151 20H277C286.941 20 295 28.0589 295 38V42C295 43.1046 294.105 44 293 44H135C133.895 44 133 43.1046 133 42V38C133 28.0589 141.059 20 151 20Z" fill="#111827"/>
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
  
  // Use the highest-resolution image for the best preview quality
  const mainImage = wallpaper.download_options?.[wallpaper.download_options.length - 1]?.path || '';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 p-4 z-20 flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="bg-background/80 backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>
         <h1 className="text-lg md:text-xl font-bold text-center text-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg">
            Mockup Preview
        </h1>
        {/* Empty div to balance the header using flexbox justify-between */}
        <div className="w-[150px]"></div>
      </header>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-screen w-full p-8 pt-24">
        
        {/* Desktop Mockup */}
        <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
          <h2 className="text-lg font-medium text-muted-foreground">Desktop</h2>
          <div className="relative w-full" style={{ aspectRatio: '1024/640' }}>
            <ImageWithFallback
              src={mainImage}
              alt="Desktop Preview"
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{ padding: '2.5% 3.5% 9.5% 3.5%' }}
            />
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MacbookFrame />
            </div>
          </div>
        </div>

        {/* Mobile Mockup */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-medium text-muted-foreground">Mobile</h2>
          <div className="relative h-[60vh] max-h-[600px]" style={{ aspectRatio: '428/880' }}>
            <ImageWithFallback
              src={mainImage}
              alt="Mobile Preview"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-[10%]"
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
