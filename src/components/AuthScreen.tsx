import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { Loader2, Eye, EyeOff, Chrome, Image } from 'lucide-react';
import { jwtDecode } from 'jwt-decode'; // We need a library to decode the user info from Google

export function AuthScreen({ onLogin, isDarkMode, onToggleTheme }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // --- NEW FUNCTION to handle the real Google Login ---
  const handleGoogleLogin = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // The 'credential' is an encoded token with the user's info. We need to decode it.
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    
    // Create a user object in the format our app expects
    const user = {
      id: userObject.sub, // 'sub' is Google's unique ID for the user
      name: userObject.name,
      email: userObject.email,
      avatar: userObject.picture,
      provider: 'google'
    };

    // Call the onLogin function passed from App.tsx
    onLogin(user);
  };

  // --- NEW useEffect to initialize the Google button ---
  useEffect(() => {
    // This checks if the google object is available from the script we added
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "475511534306-mfv0j5erh2113vo0latjefugcevlf0ls.apps.googleusercontent.com", // Your Client ID
        callback: handleGoogleLogin
      });

      // This renders the button in the div with the id "googleSignInButton"
      google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: isDarkMode ? "filled_black" : "outline", size: "large", type: "standard", shape: "rectangular", text: "continue_with" }
      );
    }
  }, [isDarkMode]); // Re-render the button if the theme changes

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    // This is the old email/password logic, we can leave it for now
    // ...
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
              <Image className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Welcome to repapers
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover and download stunning wallpapers
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In / Sign Up</CardTitle>
            <CardDescription className="text-center">
              Please sign in to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
             {/* This div is where the Google button will be rendered */}
            <div id="googleSignInButton" className="flex justify-center"></div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            
            <p className="text-sm text-center text-muted-foreground">
              More sign-in options will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
