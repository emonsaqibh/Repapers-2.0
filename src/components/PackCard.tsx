import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';

export function PackCard({ pack, onSelect }) {
  const wallpaperCount = pack.wallpaper_ids?.length || 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
        onClick={() => onSelect(pack)}
      >
        <CardContent className="p-0">
          <div className="aspect-[3/4] relative overflow-hidden">
            <ImageWithFallback
              src={pack.cover_image}
              alt={pack.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <Badge className="mb-2 bg-white/20 text-white border-0 flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                {wallpaperCount} {wallpaperCount === 1 ? 'Wallpaper' : 'Wallpapers'}
              </Badge>
              <h3 className="font-semibold text-lg">{pack.title}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
