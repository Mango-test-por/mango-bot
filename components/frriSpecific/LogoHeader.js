import React, { useState, useEffect } from "react";
import FerrariHeader from "./FerrariHeader";
import FerrariNavigation from "./FerrariNavigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial value
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Call on mount

    // Add window resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMenu = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
      setIsDesktopMenuOpen(false); // Ensure desktop menu is closed on mobile toggle
    } else {
      setIsDesktopMenuOpen(!isDesktopMenuOpen);
      setIsMobileMenuOpen(false); // Ensure mobile menu is closed on desktop toggle
    }
  };

  return (
    <>
      {/* Ferrari Header (Topmost black bar) */}
      <FerrariHeader />

      {/* Ferrari Corporate Navigation (Transparent bar below FerrariHeader) */}
      <FerrariNavigation isMobile={isMobile} toggleMenu={toggleMenu} />
    </>
  );
}
