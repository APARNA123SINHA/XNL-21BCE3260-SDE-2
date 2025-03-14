
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown, Menu, X, Bell, User, ArrowUpRight } from "lucide-react";

const Navigation = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNotification = () => {
    toast({
      title: "No new notifications",
      description: "We'll notify you when something important happens.",
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <motion.span 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="text-white font-semibold text-sm"
                >
                  DS
                </motion.span>
              </div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="font-semibold text-lg text-foreground hidden sm:block"
              >
                DataStream
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/dashboard" currentPath={location.pathname}>
              Dashboard
            </NavLink>
            <NavLink to="/markets" currentPath={location.pathname}>
              Markets
            </NavLink>
            <NavLink to="/portfolio" currentPath={location.pathname}>
              Portfolio
            </NavLink>
            
            <div className="ml-4 flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={handleNotification}
              >
                <Bell className="h-5 w-5" />
              </Button>
              
              <Link to="/auth">
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2 rounded-full bg-transparent"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleNotification}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 shadow-md"
          >
            <div className="flex flex-col py-3 space-y-1">
              <MobileNavLink to="/dashboard" currentPath={location.pathname}>
                Dashboard
              </MobileNavLink>
              <MobileNavLink to="/markets" currentPath={location.pathname}>
                Markets
              </MobileNavLink>
              <MobileNavLink to="/portfolio" currentPath={location.pathname}>
                Portfolio
              </MobileNavLink>
              <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-800">
                <Link to="/auth">
                  <Button
                    variant="default"
                    className="w-full justify-start rounded-md"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  currentPath: string;
}

const NavLink = ({ children, to, currentPath }: NavLinkProps) => {
  const isActive = currentPath === to || (to !== "/" && currentPath.startsWith(to));

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium relative transition-colors duration-300 ${
        isActive
          ? "text-primary font-semibold"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="h-0.5 w-1/2 bg-primary absolute bottom-0 left-1/4"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
};

const MobileNavLink = ({ children, to, currentPath }: NavLinkProps) => {
  const isActive = currentPath === to || (to !== "/" && currentPath.startsWith(to));

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-foreground hover:bg-secondary"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{children}</span>
        {isActive && <ArrowUpRight className="h-4 w-4" />}
      </div>
    </Link>
  );
};

export default Navigation;
