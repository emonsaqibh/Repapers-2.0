import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from './ui/button';
import { X } from 'lucide-react';
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

// This is the content of our modal, which we will portal
const MockupContent = ({ wallpaperUrl, mockupType, onClose }) => {
    const Frame = mockupType === 'desktop' ? DesktopFrame : MobileFrame;
    const containerStyle = mockupType === 'desktop' 
        ? { width: '90%', maxWidth: '1200px' } 
        : { height: '85vh', maxWidth: '400px' };

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
            onClick={onClose}
        >
            <div 
                className="relative" 
                style={containerStyle}
                onClick={(e) => e.stopPropagation()}
            >
                <ImageWithFallback
                    src={wallpaperUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={mockupType === 'desktop' ? { padding: '1.2%' } : { padding: '3%' }}
                />
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <Frame />
                </div>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-4 right-4 z-[110] text-white hover:bg-white/20"
            >
                <X className="w-6 h-6" />
            </Button>
        </div>
    );
};

// This is the main component that creates the portal
export function MockupPreview(props) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Add a class to the body to prevent scrolling when the modal is open
        document.body.classList.add('overflow-hidden');
        
        // Cleanup function to remove the class when the modal is closed
        return () => document.body.classList.remove('overflow-hidden');
    }, []);

    if (!isMounted) {
        return null;
    }

    // Use ReactDOM.createPortal to render the content into the body
    return ReactDOM.createPortal(
        <MockupContent {...props} />,
        document.body
    );
}
