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
  TrendingUp,
  Mail,
  MapPin,
  Link,
  Bell,
  Shield,
  Palette,
  Monitor,
  Globe,
  Trash2,
  FileText,
  Camera
} from 'lucide-react';
import { motion } from 'motion/react';

export function UserProfile({ user, favorites, onWallpaperSelect, onViewChange, activeTab = 'profile' }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [editedProfile, setEditedProfile] = useState({
    name: user.name,
    bio: user.bio || 'Wallpaper enthusiast and designer',
    location: user.location || 'San Francisco, CA',
    website: user.website || ''
  });

  // Mock data for user's wallpapers and downloads
  const userStats = {
    totalDownloads: 1247,
    favoriteCount: favorites.length,
    joinDate: '2023-08-15',
    downloads: [
      {
        id: '1',
        title: 'Mountain Vista',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        downloadDate: '2024-01-20',
        resolution: '4K',
        size: '8.2 MB'
      },
      {
        id: '2',
        title: 'City Lights',
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
        downloadDate: '2024-01-18',
        resolution: '4K',
        size: '12.1 MB'
      },
      {
        id: '3',
        title: 'Abstract Waves',
        url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
        downloadDate: '2024-01-15',
        resolution: '4K',
        size: '6.7 MB'
      }
    ],
    favoriteWallpapers: [
      {
        id: '1',
        title: 'Mountain Vista',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        author: 'Alex Chen',
        addedDate: '2024-01-20'
      },
      {
        id: '4',
        title: 'Galaxy Dreams',
        url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400',
        author: 'Emma Wilson',
        addedDate: '2024-01-18'
      },
      {
        id: '5',
        title: 'Minimalist Sunset',
        url: 'https://images.unsplash.com/photo-1464822759844-d150baec328b?w=400',
        author: 'David Park',
        addedDate: '2024-01-15'
      }
    ]
  };

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newsletter: true,
    downloadQuality: '4K',
    theme: 'system',
    language: 'en'
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log('Profile updated:', editedProfile);
  };

  const handleCancelEdit = () => {
    setEditedProfile({
      name: user.name,
      bio: user.bio || 'Wallpaper enthusiast and designer',
      location: user.location || 'San Francisco, CA',
      website: user.website || ''
    });
    setIsEditing(false);
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-2xl">{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          value={editedProfile.bio}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={editedProfile.location}
                            onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={editedProfile.website}
                            onChange={(e) => setEditedProfile(prev => ({ ...prev, website: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile} size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancelEdit} variant="outline" size="sm">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
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
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>
                        {editedProfile.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {editedProfile.location}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Joined {new Date(userStats.joinDate).toLocaleDateString()}
                        </div>
                        {editedProfile.website && (
                          <div className="flex items-center gap-1">
                            <Link className="w-4 h-4" />
                            <a href={editedProfile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {editedProfile.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{userStats.totalDownloads}</div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <div className="text-3xl font-bold mb-1">{userStats.favoriteCount}</div>
              <div className="text-sm text-muted-foreground">Favorites</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-1">127</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="favorites">
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="downloads">
                <Download className="w-4 h-4 mr-2" />
                Downloads
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Account Provider</Label>
                        <div className="flex items-center gap-2 mt-1">
                          {user.provider === 'google' ? (
                            <>
                              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                              <span>Google Account</span>
                            </>
                          ) : (
                            <>
                              <Mail className="w-4 h-4" />
                              <span>Email Account</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Member Since</Label>
                        <p className="mt-1">{new Date(userStats.joinDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Downloads</span>
                        <Badge variant="secondary">{userStats.totalDownloads}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Favorite Wallpapers</span>
                        <Badge variant="secondary">{userStats.favoriteCount}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Downloads This Month</span>
                        <Badge variant="secondary">127</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Favorite Wallpapers</CardTitle>
                </CardHeader>
                <CardContent>
                  {userStats.favoriteWallpapers.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start exploring wallpapers and add them to your favorites!
                      </p>
                      <Button onClick={() => onViewChange('gallery')}>
                        <Grid3X3 className="w-4 h-4 mr-2" />
                        Browse Wallpapers
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userStats.favoriteWallpapers.map(wallpaper => (
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
                                  src={wallpaper.url}
                                  alt={wallpaper.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                                  <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h4 className="font-medium truncate">{wallpaper.title}</h4>
                                    <p className="text-xs text-white/80">by {wallpaper.author}</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="downloads" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Download History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userStats.downloads.map(download => (
                      <motion.div 
                        key={download.id}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={download.url}
                            alt={download.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{download.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{download.resolution}</span>
                            <span>{download.size}</span>
                            <span>Downloaded on {new Date(download.downloadDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive email updates about new wallpapers</p>
                      </div>
                      <Switch 
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified about trending wallpapers</p>
                      </div>
                      <Switch 
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Newsletter</Label>
                        <p className="text-sm text-muted-foreground">Weekly newsletter with curated wallpapers</p>
                      </div>
                      <Switch 
                        checked={settings.newsletter}
                        onCheckedChange={(checked) => handleSettingChange('newsletter', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Default Download Quality</Label>
                        <Select 
                          value={settings.downloadQuality} 
                          onValueChange={(value) => handleSettingChange('downloadQuality', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1080p">1080p</SelectItem>
                            <SelectItem value="2K">2K</SelectItem>
                            <SelectItem value="4K">4K</SelectItem>
                            <SelectItem value="8K">8K</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select 
                          value={settings.language} 
                          onValueChange={(value) => handleSettingChange('language', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <h4 className="font-medium">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}