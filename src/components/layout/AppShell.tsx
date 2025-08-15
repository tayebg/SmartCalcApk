
import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import ThemeSwitcher from "./ThemeSwitcher";
import SplashScreen from "./SplashScreen";

export default function AppShell({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timeoutId = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timeoutId);
  }, []);
  
  const { pathname } = useLocation();
  const showFooter = !isMobile && (pathname === "/" || pathname === "/pfe" || pathname === "/doctorat" || pathname.startsWith("/tutorials"));
  const showMobileHeader = isMobile && pathname === "/";

  if (loading) return <SplashScreen />;

  return (
    <div className="min-h-screen flex flex-col mobile-safe-area">
      {/* Desktop/Tablet Navbar */}
      {!isMobile && <Navbar />}
      
      {/* Mobile Header - Only on Home page */}
      {showMobileHeader && (
        <header className="fixed top-0 left-0 right-0 z-40 mobile-navbar">
          <div className="flex items-center justify-center h-14 px-4 relative">
            <span className="font-bold text-lg">SmartCalc+</span>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ThemeSwitcher />
            </div>
          </div>
        </header>
      )}
      
      {/* Main Content */}
      <main className={`flex-1 motion-safe:animate-drop-in ${isMobile ? (showMobileHeader ? 'pt-14 pb-20' : 'pb-20') : 'pt-16'} px-4`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && <BottomNavigation />}
      
      {/* Desktop Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
