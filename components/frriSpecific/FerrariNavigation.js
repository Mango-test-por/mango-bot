import React, { useState, useEffect } from "react";
import Link from "next/link";
import FerrariMenu from "./FerrariMenu";

// Constants for improved maintainability
const HEADER_HEIGHT = 40; // Match the height in FerrariHeader.js

// Note: The 'Image' component from 'next/image' is not used here as the provided HTML uses a standard <img> tag for the corporate logo.
// If Next.js Image optimization is desired for that logo, this would need to be changed.

// Separate mobile navigation component
const MobileNavigation = ({ onMenuClick }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <Link
        href="https://www.ferrari.com/en-EN/corporate"
        className="ChannelMenuHeader__logo-wrap__27GZq6Mw no-underline"
        target="_self"
      >
        <span className="text-white text-l font-ferrari uppercase tracking-wider no-underline">
          CORPORATE
        </span>
      </Link>

      <div className="flex items-center">
        <Link
          href="https://www.ferrari.com/en-EN/corporate/contacts"
          className="BtnCta__button__w7eTRXBJ  BtnCta__button--auto-width__24FksXHh BtnCta__bgtransparent__1n9xqjaE text-white no-underline  mr-3 font-ferrari"
          target="_self"
        >
          <span className="BtnCta__text__16tieEQV text-l uppercase font-ferrari">
            Contacts
          </span>
        </Link>

        <ShareButton />
      </div>
    </div>
  );
};

// Separate desktop navigation component
const DesktopNavigation = ({ toggleMenu }) => {
  return (
    <>
      {/* Left Section: Hamburger and Corporate Text */}
      <div className="flex items-center h-full">
        <button
          className="ChannelMenuHeader__hamburger__2ao-XFUR text-white p-2"
          aria-label="Open Menu"
          onClick={toggleMenu}
        >
          <svg width="17" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M.667 2.333h16v-2h-14a2 2 0 0 0-2 2zM.667 8h16V6h-14a2 2 0 0 0-2 2zm0 5.667h16v-2h-14a2 2 0 0 0-2 2z"
              fill="#FFF"
            ></path>
          </svg>
        </button>
        <Link
          href="https://www.ferrari.com/en-EN/corporate"
          className="ChannelMenuHeader__logo-wrap__27GZq6Mw ml-2 flex items-center no-underline h-full"
          target="_self"
        >
          <span className="text-white font-medium tracking-wide uppercase">
            CORPORATE
          </span>
        </Link>
      </div>

      {/* Right Section: Nav Links and Share Button */}
      <div className="flex h-full">
        <ul className="ChannelMenuHeader__nav__2py7o4YO ChannelMenuHeader__visible__3keEnJJY hidden md:flex h-full items-center space-x-6 lg:space-x-8">
          <li className="h-full flex items-center">
            <Link
              href="https://www.ferrari.com/en-EN/corporate/investors"
              className="BtnCta__button__w7eTRXBJ null BtnCta__button--auto-width__24FksXHh BtnCta__bgtransparent__1n9xqjaE text-white font-medium tracking-wide hover:text-gray-300 text-xs lg:text-sm no-underline h-full flex items-center"
              target="_self"
            >
              <span className="BtnCta__text__16tieEQV">INVESTORS</span>
            </Link>
          </li>
          <li className="h-full flex items-center">
            <Link
              href="https://www.ferrari.com/en-EN/corporate/sustainability"
              className="BtnCta__button__w7eTRXBJ null BtnCta__button--auto-width__24FksXHh BtnCta__bgtransparent__1n9xqjaE text-white font-medium tracking-wide hover:text-gray-300 text-xs lg:text-sm no-underline h-full flex items-center"
              target="_self"
            >
              <span className="BtnCta__text__16tieEQV">SUSTAINABILITY</span>
            </Link>
          </li>
          <li className="h-full flex items-center">
            <Link
              href="https://www.ferrari.com/en-EN/corporate/contacts"
              className="BtnCta__button__w7eTRXBJ null BtnCta__button--auto-width__24FksXHh BtnCta__bgtransparent__1n9xqjaE text-white font-medium tracking-wide hover:text-gray-300 text-xs lg:text-sm no-underline h-full flex items-center"
              target="_self"
            >
              <span className="BtnCta__text__16tieEQV">CONTACTS</span>
            </Link>
          </li>
        </ul>
        <div className="ChannelMenuHeader__share__1dvJeiKX ml-3 lg:ml-6 flex items-center h-full justify-center">
          <ShareButton />
        </div>
      </div>
    </>
  );
};

// Separate share button component
const ShareButton = () => {
  return (
    <div
      className="Share__wrapper__2ujGkW_n undefined Share__fixed__SO3iXOD4"
      aria-label="Share"
    >
      <button
        aria-label="Open share popup"
        aria-expanded="false"
        className="Share__toggle__iB22OPM-"
      >
        <span className="BtnAction__wrapper__2lcvxx01 BtnAction__white__3AQU8oiN undefined">
          <span className="BtnAction__icon__3-znqAs5">
            <span className="Icon__icon__2tdLhZ5T Icon__white__3osuE7BJ Icon__icon--border__3nsmYcwT Icon__bgtransparent__2DiBPCjn inline-flex items-center justify-center p-1 border border-white rounded-full">
              <span className="Icon__over-circle__1opWzs6L">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="11" stroke="1"></circle>
                </svg>
              </span>
              <svg
                viewBox="0 0 12 14"
                className="icon"
                width="12"
                height="14"
                style={{ height: "14px", width: "12px" }}
                fill="#FFF"
              >
                <path d="M3.37 8.457a2 2 0 1 1-.124-3.022l4.783-2.761a2 2 0 1 1 .652 1.163l-4.728 2.73a2.007 2.007 0 0 1 .029.704L8.81 10.06a2 2 0 1 1-.747 1.108L3.37 8.457z"></path>
              </svg>
            </span>
          </span>
        </span>
      </button>
    </div>
  );
};

export default function FerrariNavigation({ isMobile }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    // When menu is open, prevent scrolling on body
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  // Close menu function
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Only change position on desktop, not on mobile
      if (!isMobile && scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = ""; // Ensure body scroll is restored on unmount
    };
  }, [isMobile]); // Add isMobile as dependency since we're using it in the effect

  // Position logic:
  // - On mobile: Always stays below FerrariHeader
  // - On desktop: Sticks to top when scrolled
  const positionStyle = {
    position: "fixed",
    top: isMobile ? HEADER_HEIGHT : isScrolled ? 0 : HEADER_HEIGHT,
    transform: "none", // Ensure no transforms are applied that could hide the navigation
  };

  return (
    <>
      <header
        className={`
          ChannelMenuHeader__header__3zMl-w9a 
          ChannelMenuHeader__topbar__1RIZBUV1 
          inert-menu-hook 
          ChannelMenuHeader__bg-overlay__6uvxotEy 
          left-0 
          w-full 
          z-30 
          font-ferrari 
          transition-all 
          duration-300
          bg-gradient-to-b from-black/70 to-transparent
          overflow-hidden
        `}
        style={positionStyle}
      >
        <div
          className={`ChannelMenuHeader__header-content__2EuAsqEL w-full px-4 flex items-center justify-between ${
            isMobile ? "h-[60px]" : "h-[45px]"
          }`}
        >
          {isMobile ? (
            <MobileNavigation onMenuClick={toggleMenu} />
          ) : (
            <DesktopNavigation toggleMenu={toggleMenu} />
          )}
        </div>
      </header>

      {/* Ferrari Menu Component */}
      <FerrariMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
