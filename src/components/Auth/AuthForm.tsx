
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, ArrowRight, Github, Facebook, Mail } from "lucide-react";

const AuthForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialAuth = (provider: string) => {
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `${provider} authentication`,
        description: `You've successfully signed in with ${provider}.`,
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <Tabs defaultValue="signin" className="w-full">
        <CardHeader className="pb-2">
          <TabsList className="grid grid-cols-2 w-full mb-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <CardDescription className="text-center pt-2">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 pt-4">
          {/* Sign In Form */}
          <TabsContent value="signin" className="space-y-4 mt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input 
                  id="signin-email" 
                  type="email" 
                  placeholder="you@example.com" 
                  className="glass-input"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Input 
                    id="signin-password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="glass-input pr-10"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="text-right text-sm">
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full rounded-md" 
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                className="w-full glass-card"
                onClick={() => handleSocialAuth("Google")}
                disabled={isLoading}
              >
                <Mail className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full glass-card"
                onClick={() => handleSocialAuth("GitHub")}
                disabled={isLoading}
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full glass-card"
                onClick={() => handleSocialAuth("Facebook")}
                disabled={isLoading}
              >
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          {/* Sign Up Form */}
          <TabsContent value="signup" className="space-y-4 mt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-firstname">First Name</Label>
                  <Input 
                    id="signup-firstname" 
                    placeholder="John"
                    className="glass-input"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-lastname">Last Name</Label>
                  <Input 
                    id="signup-lastname" 
                    placeholder="Doe"
                    className="glass-input"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="you@example.com"
                  className="glass-input"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input 
                    id="signup-password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="glass-input pr-10"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                className="w-full glass-card"
                onClick={() => handleSocialAuth("Google")}
                disabled={isLoading}
              >
                <Mail className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full glass-card"
                onClick={() => handleSocialAuth("GitHub")}
                disabled={isLoading}
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full glass-card"
                onClick={() => handleSocialAuth("Facebook")}
                disabled={isLoading}
              >
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </CardContent>
        
        <CardFooter className="pt-0">
          <p className="w-full text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
