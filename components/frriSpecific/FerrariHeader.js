import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import FerrariLogo from "./FerrariLogoSvg";
import FerrariMenu from "./FerrariMenu";

// Constants for improved maintainability
const BREAKPOINT_MOBILE = 768; // Breakpoint for mobile devices in pixels
const HEADER_HEIGHT = 40; // Header height in pixels
const HEADER_BG_COLOR = "#181818"; // Header background color

export default function FerrariHeader() {
  // State management
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

  // Handle viewport resize
  const handleResize = useCallback(() => {
    const mobileCheck = window.innerWidth < BREAKPOINT_MOBILE;
    setIsMobile(mobileCheck);
    // Always make header visible on mobile
    if (mobileCheck) {
      setVisible(true);
    }
  }, []);

  // Handle scroll events for header visibility
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;

    // Only hide header when scrolling down on desktop
    if (!isMobile) {
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    } else {
      // Always visible on mobile
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  }, [isMobile, prevScrollPos]);

  // Handle menu toggle
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    // When menu is open, prevent scrolling on body
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  // Close menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  // Set up event listeners
  useEffect(() => {
    // Initialize on first render
    handleResize();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Clean up event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = ""; // Ensure body scroll is restored on unmount
    };
  }, [handleResize, handleScroll]);

  // Compute dynamic classes - only apply transform on desktop
  const headerVisibilityClass =
    isMobile || visible ? "translate-y-0" : "-translate-y-full";

  // Render the appropriate header based on device type
  return (
    <>
      <header
        className={`
          Header__header__1twvGXn4 
          Header__topbar__SrMxCjlb 
          inert-menu-hook 
          w-full 
          top-0 
          left-0 
          z-[200] 
          ${!isMobile ? "transition-transform duration-300" : ""}
          font-ferrari
          ${headerVisibilityClass}
        `}
        style={{
          backgroundColor: HEADER_BG_COLOR,
          position: "fixed",
          transform: isMobile ? "none" : undefined,
        }}
      >
        {isMobile ? <MobileHeader onMenuClick={toggleMenu} /> : <DesktopHeader onMenuClick={toggleMenu} />}
      </header>
      
      {/* Ferrari Menu Component */}
      <FerrariMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}

// Mobile header component with centered logo
function MobileHeader({ onMenuClick }) {
  return (
    <div
      className="Header__content__1tS7gf1W flex items-center justify-between px-4 h-11 w-full"
      style={{ backgroundColor: HEADER_BG_COLOR }}
    >
      {/* Left section - menu button */}
      <div className="Header__open-menu__2JEiEKpi">
        <button
          className="menu-pillars-toggle text-white uppercase font-medium text-sm"
          type="button"
          tabIndex="0"
          aria-label="Open Menu"
          onClick={onMenuClick}
        >
          Menu
        </button>
      </div>

      <Link href="https://www.ferrari.com">
        <FerrariLogo width={25} height={25} className="h-auto max-h-[25px]" />
      </Link>

      {/* Right section - search */}
      <div className="flex items-center h-full">
        <Link
          href="https://www.ferrari.com/en-EN/search"
          className="text-white uppercase font-medium hover:text-gray-300 text-sm no-underline"
        >
          Search
        </Link>
      </div>
    </div>
  );
}

// Desktop header component with left-aligned logo
function DesktopHeader({ onMenuClick }) {
  return (
    <div
      className="Header__content__1tS7gf1W flex items-center justify-between  mx-auto px-4 h-full"
      style={{ backgroundColor: HEADER_BG_COLOR }}
    >
      {/* Left section with logo and navigation */}
      <div className="flex  ">
        {/* Ferrari Logo */}
        <div className="Header__logo__39GNG28Y mr-8">
          <Link
            href="https://www.ferrari.com"
            aria-label="go to homepage"
            className="block no-underline"
          >
            <FerrariLogo
              width={25}
              height={25}
              className="h-auto max-h-[25px] mt-2"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex">
          <ul className="flex space-x-10 md:space-x-12 items-center h-full">
            {/* Navigation items */}
            <NavigationItem label="RACING" href="#" onClick={onMenuClick} />
            <NavigationItem label="SPORTS CARS" href="#" onClick={onMenuClick} />
            <NavigationItem label="COLLECTIONS" href="#" onClick={onMenuClick} />
            <NavigationItem label="EXPERIENCES" href="#" onClick={onMenuClick} />
            <NavigationItem label="ABOUT US" isActive href="#" onClick={onMenuClick} />
          </ul>
        </nav>
      </div>

      {/* Right section: Search link */}
      <div className="flex items-center h-full ">
        <Link
          href="https://www.ferrari.com/en-EN/search"
          className="text-white uppercase font-medium hover:text-gray-300 text-sm no-underline"
        >
          Search
        </Link>
      </div>
    </div>
  );
}

// Extracted navigation item component for better maintainability
function NavigationItem({ label, isActive = false, href, onClick }) {
  return (
    <li className="items-center">
      <a
        href={href}
        className={`
          text-white 
          uppercase 
          font-medium 
          hover:text-gray-300 
          text-sm
          no-underline
          cursor-pointer
          ${
            isActive
              ? "Header__active-item__3f7eeyMb border-b-2 border-white"
              : ""
          }
        `}
        onClick={(e) => {
          e.preventDefault(); // Prevent default navigation
          if (onClick) onClick();
        }}
      >
        {label}
        <span className="Header__wrapper-arrow__bG7CCzAh"></span>
      </a>
    </li>
  );
}
