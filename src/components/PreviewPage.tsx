import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// SVG for the iPhone-style frame
const MobileFrame = () => (
  <svg width="100%" height="100%" viewBox="0 0 414 820" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M400 68.3428C400 50.1118 385.225 35.8428 367.714 35.8428H46.2857C28.7751 35.8428 14 50.1118 14 68.3428V751.657C14 769.888 28.7751 784.157 46.2857 784.157H367.714C385.225 784.157 400 769.888 400 751.657V68.3428Z" stroke="#8A8A8A" stroke-width="20"/>
    <path d="M141 1H273C278.523 1 283 5.47715 283 11V18C283 19.1046 282.105 20 281 20H133C131.895 20 131 19.1046 131 18V11C131 5.47715 135.477 1 141 1Z" fill="#222"/>
  </svg>
);

// SVG for the Mac/Desktop-style frame
const DesktopFrame = () => (
  <svg width="100%" height="100%" viewBox="0 0 1024 640" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="1014" height="590" rx="20" stroke="#8A8A8A" stroke-width="10"/>
    <path d="M280 635L380 600H644L744 635H280Z" stroke="#8A8A8A" stroke-width="10"/>
  </svg>
);

export function PreviewPage({ wallpaper, onBack }) {
  if (!wallpaper) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Wallpaper not found.</p>
        <Button variant="ghost" onClick={onBack} className="absolute top-4 left-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    );
  }
  
  const mainImage = wallpaper.download_options?.[0]?.path || '';

  return (
    <div className="min-h-screen bg-muted/50 p-4">
      <Button variant="outline" onClick={onBack} className="absolute top-4 left-4 z-10 bg-background">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Details
      </Button>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 h-full pt-16 lg:pt-0">
        {/* Desktop Mockup */}
        <div className="flex flex-col items-center gap-4 w-full lg:w-1/2">
          <h2 className="text-xl font-semibold">Desktop Preview</h2>
          <div className="relative w-full max-w-4xl aspect-video">
            <ImageWithFallback
              src={mainImage}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ padding: '1.2%' }}
            />
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <DesktopFrame />
            </div>
          </div>
        </div>

        {/* Mobile Mockup */}
        <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
          <h2 className="text-xl font-semibold">Mobile Preview</h2>
          <div className="relative h-[70vh] max-h-[800px] aspect-[9/18]">
             <ImageWithFallback
              src={mainImage}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ padding: '3%' }}
            />
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MobileFrame />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
