import React, { useState, useEffect } from "react";
import Link from "next/link";
import FerrariLogo from "./FerrariLogoSvg";

// Constants
const BREAKPOINT_MOBILE = 768; // Breakpoint for mobile devices in pixels

// Main Ferrari Menu component
export default function FerrariMenu({ isOpen, onClose }) {
  // State for handling submenu navigation
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Active section for highlighting the current item
  const [activeSection, setActiveSection] = useState("sustainability");

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINT_MOBILE);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle submenu clicks
  const handleSubmenuClick = (submenu) => {
    if (activeSubmenu === submenu) {
      setShowSubmenu(false);
      setActiveSubmenu("");
    } else {
      setShowSubmenu(true);
      setActiveSubmenu(submenu);
    }
  };

  // Reset menu state when closed
  useEffect(() => {
    if (!isOpen) {
      setShowSubmenu(false);
      setActiveSubmenu("");
    }
  }, [isOpen]);

  // If menu is closed, return null
  if (!isOpen) return null;

  // Render mobile menu view
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[300] bg-[#181818] overflow-auto !ferrari-font !font-ferrari">
        <div className="flex justify-between items-center p-3">
          {/* Back button */}
          <button
            onClick={onClose}
            className="text-white p-2"
            aria-label="Go back"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1" />
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="1.5" />
            </svg>
          </button>

          {/* Ferrari Logo */}
          <div className="flex justify-center">
            <FerrariLogo
              width={30}
              height={30}
              className="h-auto max-h-[30px]"
            />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1" />
              <path d="M16 8L8 16M8 8L16 16" stroke="white" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Section header */}
        <div className="mt-6 mb-2 px-6">
          <h2 className="text-xs uppercase text-gray-400">ABOUT US</h2>
        </div>

        {/* Menu links */}
        <nav className="w-full">
          <ul className="text-white">
            <li className="border-b border-gray-800">
              <Link
                href="https://www.ferrari.com/en-EN/corporate"
                className="flex justify-between items-center py-4 px-6 text-white no-underline"
              >
                <span className="text-xl font-medium">Corporate</span>
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                ></svg>
              </Link>
            </li>
            <li className="border-b border-gray-800">
              <Link
                href="https://www.ferrari.com/en-EN/news"
                className="block py-4 px-6 text-xl font-medium text-white no-underline"
              >
                News
              </Link>
            </li>
            <li className="border-b border-gray-800">
              <Link
                href="https://www.ferrari.com/en-EN/ferrari-magazine"
                className="flex justify-between items-center py-4 px-6 text-white no-underline"
              >
                <span className="text-xl font-medium">Ferrari Magazine</span>
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                ></svg>
              </Link>
            </li>
            <li className="border-b border-gray-800">
              <Link
                href="https://www.ferrari.com/en-EN/history"
                className="block py-4 px-6 text-xl font-medium text-white no-underline"
              >
                History
              </Link>
            </li>
            <li className="border-b border-gray-800">
              <Link
                href="#"
                onClick={() => setActiveSubmenu(false)}
                className="block py-4 px-6 text-xl font-medium text-white no-underline"
              >
                Join Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  // Render desktop menu view (unchanged)
  return (
    <div className="MenuPillar__wrapper__2RUfl3Wv MenuPillar__mounted__kyozQj2i fixed inset-0 z-[300] bg-[#181818] bg-opacity-90 overflow-auto">
      {/* Top actions bar - now vertical */}
      <div className="MenuPillar__actions-bar__3CCujm6j flex flex-col justify-start items-center  h-full fixed left-0 top-0 z-10 bg-[#181818] w-16">
        {/* Ferrari Logo */}
        <div className="MenuPillar__logo-wrap__z8GagdvE mb-12 mt-4">
          <Link href="https://www.ferrari.com" aria-label="go to homepage">
            <FerrariLogo width={30} height={40} />
          </Link>
        </div>

        {/* Close button */}
        <div className="MenuPillar__close__8PO2g3c1 mb-4">
          <button
            onClick={onClose}
            className="BtnAction__wrapper__2lcvxx01 BtnAction__white__3AQU8oiN BtnAction__reverse__2uiwExsY"
            aria-label="Close Menu"
            data-event-module-slug="header"
            data-event-type="CTA"
            data-event-label="close"
            data-eventcat="GW_MENU"
            data-eventtit="close"
          >
            <span className="BtnAction__icon__3-znqAs5">
              <span className="Icon__icon__2tdLhZ5T Icon__white__3osuE7BJ Icon__icon--border__3nsmYcwT Icon__bgtransparent__2DiBPCjn">
                <span className="Icon__over-circle__1opWzs6L"></span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <path
                    d="M16 8L8 16M8 8L16 16"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </span>
          </button>
        </div>

        {/* Back button */}
        <div className="MenuPillar__back__qpR4Ae9o MenuPillar__back-visible__3eILuVJ0">
          <button
            onClick={onClose}
            className="BtnAction__wrapper__2lcvxx01 BtnAction__white__3AQU8oiN BtnAction__reverse__2uiwExsY"
            aria-label="Go back"
            data-event-module-slug="header"
            data-event-type="CTA"
            data-event-label="back"
            data-eventcat="GW_MENU"
            data-eventtit="back"
          >
            <span className="BtnAction__icon__3-znqAs5">
              <span className="Icon__icon__2tdLhZ5T Icon__white__3osuE7BJ Icon__icon--border__3nsmYcwT Icon__bgtransparent__2DiBPCjn">
                <span className="Icon__over-circle__1opWzs6L"></span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="1.5" />
                </svg>
              </span>
            </span>
          </button>
        </div>
      </div>

      <div className="flex h-full ">
        {/* Left side menu panel */}
        <div className="w-80 bg-[#121212] px-6  pt-6 ml-16 h-full">
          <div className="uppercase text-gray-400 text-sm mb-4">CORPORATE</div>

          <ul className="text-white space-y-4">
            {/* Overview - active */}
            <li className="flex items-center">
              <div className="w-1 h-6 bg-white mr-3"></div>
              <Link
                href="https://www.ferrari.com/en-EN/corporate"
                className="text-white no-underline font-medium text-xl"
              >
                Overview
              </Link>
            </li>

            {/* About Us */}
            <li>
              <Link
                href="https://www.ferrari.com/en-EN/corporate/about-us"
                className="text-white no-underline pl-4 text-xl text-gray-300"
              >
                About Us
              </Link>
            </li>

            {/* Governance - with submenu */}
            <li className="flex items-center justify-between">
              <Link
                href="https://www.ferrari.com/en-EN/corporate/governance"
                className="text-white no-underline pl-4 text-xl text-gray-300"
              >
                Governance
              </Link>
              <svg
                width="10"
                height="14"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="1.5" />
              </svg>
            </li>

            {/* Investors - with submenu */}
            <li className="flex items-center justify-between">
              <Link
                href="https://www.ferrari.com/en-EN/corporate/investors"
                className="text-white no-underline pl-4 text-xl text-gray-300"
              >
                Investors
              </Link>
              <svg
                width="10"
                height="14"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="1.5" />
              </svg>
            </li>

            {/* Sustainability - with submenu */}
            <li className="flex items-center justify-between">
              <Link
                href="https://www.ferrari.com/en-EN/corporate/sustainability"
                className="text-white no-underline pl-4 text-xl text-gray-300"
              >
                Sustainability
              </Link>
              <svg
                width="10"
                height="14"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="1.5" />
              </svg>
            </li>

            {/* Media - with submenu */}
            <li className="flex items-center justify-between">
              <Link
                href="https://www.ferrari.com/en-EN/corporate/media"
                className="text-white no-underline pl-4 text-xl text-gray-300"
              >
                Media
              </Link>
              <svg
                width="10"
                height="14"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="1.5" />
              </svg>
            </li>
          </ul>
        </div>

        {/* Right side image panel */}
        <div className="flex-1 bg-gradient-to-r from-red-700 to-red-600">
          <div className="h-full w-full flex items-center justify-center">
            <img
              src="/ferrarimenu.jpg"
              alt="Ferrari Logo"
              className="w-auto h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
