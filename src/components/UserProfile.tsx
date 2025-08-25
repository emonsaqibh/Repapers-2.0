import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  User, 
  Heart, 
  Download, 
  Settings, 
  Edit, 
  Save, 
  X,
  Calendar,
  Grid3X3,
  Mail,
  MapPin,
  Link,
  Camera
} from 'lucide-react';
import { motion } from 'motion/react';

// --- MODIFIED CODE: Correctly accepts 'favoriteWallpapers' prop ---
export function UserProfile({ user, favoriteWallpapers, onWallpaperSelect, onViewChange, activeTab = 'profile' }) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Fallback for when the user is not logged in yet
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user.name || 'Anonymous',
    bio: user.bio || 'Wallpaper enthusiast and designer',
    location: user.location || '',
    website: user.website || ''
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, you'd save this to a backend
    console.log('Profile updated:', editedProfile);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.avatar} alt={editedProfile.name} />
                    <AvatarFallback className="text-2xl">{editedProfile.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-3xl font-bold">{editedProfile.name}</h1>
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-4">{editedProfile.bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1"><Mail className="w-4 h-4" />{user.email}</div>
                      {editedProfile.location && <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{editedProfile.location}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="favorites"><Heart className="w-4 h-4 mr-2" />Favorites ({favoriteWallpapers.length})</TabsTrigger>
              <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" />Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="favorites" className="mt-6">
              <Card>
                <CardHeader><CardTitle>Your Favorite Wallpapers</CardTitle></CardHeader>
                <CardContent>
                  {/* --- MODIFIED CODE: Use the real favoriteWallpapers prop --- */}
                  {favoriteWallpapers.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                      <p className="text-muted-foreground mb-4">Start exploring and add some to your collection!</p>
                      <Button onClick={() => onViewChange('gallery')}><Grid3X3 className="w-4 h-4 mr-2" />Browse Wallpapers</Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favoriteWallpapers.map(wallpaper => {
                        // Safely get data from our new structure
                        const displayImage = wallpaper.download_options?.[0]?.path || '';
                        const authorName = wallpaper.author?.name || 'Unknown';
                        
                        return (
                          <motion.div
                            key={wallpaper.id}
                            whileHover={{ scale: 1.02 }}
                            className="group cursor-pointer"
                            onClick={() => onWallpaperSelect(wallpaper)}
                          >
                            <Card className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="aspect-[3/4] relative">
                                  <ImageWithFallback
                                    src={displayImage}
                                    alt={wallpaper.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                                    <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      <h4 className="font-medium truncate">{wallpaper.title}</h4>
                                      <p className="text-xs text-white/80">by {authorName}</p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              {/* Settings content can be added here later */}
              <p>Settings will be available soon.</p>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
