import React, { useState, useEffect } from "react";
import Image from "next/image";

function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <section className="flex w-full relative h-[450px] sm:h-[30vh] md:h-[35vh] lg:h-[50vh] overflow-hidden font-ferrari">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0 ">
        <Image
          src={isMobile ? "/fbhero-mobile.jpg" : "/ferrarihero.jpg"}
          alt="Hero Background"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center justify-center h-full w-full">
        <div className="max-w-5xl text-center ">
          <h2 className="text-white text-3xl font-semibold uppercase tracking-wider mb-2 !font-ferrari">
            Career
          </h2>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
