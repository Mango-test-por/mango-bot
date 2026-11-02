import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#181818] text-white">
      <div className="bg-[#333333] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Stay up to date</h3>
            <p className="mb-6 text-sm max-w-xl mx-auto">
              Sign up to receive updates about career opportunities and news.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <button className="bg-red-600 text-white px-8 py-3 uppercase text-sm font-semibold hover:bg-red-700 transition">
                Subscribe
              </button>
              <button className="border border-white text-white px-8 py-3 uppercase text-sm font-semibold hover:bg-white hover:text-black transition">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:hidden">
          <div className="text-center">
            <h4 className="font-bold uppercase mb-4 text-center">RACING</h4>
            <ul className="space-y-2 text-sm flex flex-col items-center ">
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/formula1"
                  className="text-white no-underline hover:underline"
                >
                  Scuderia Ferrari HP
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/formula1/charles-leclerc"
                  className="text-white no-underline hover:underline"
                >
                  Charles Leclerc
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/formula1/lewis-hamilton"
                  className="text-white no-underline hover:underline"
                >
                  Lewis Hamilton
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/hypercar"
                  className="text-white no-underline hover:underline"
                >
                  Hypercar
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/competizioni-gt"
                  className="text-white no-underline hover:underline"
                >
                  GT Series
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/esports"
                  className="text-white no-underline hover:underline"
                >
                  Esports
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/fda"
                  className="text-white no-underline hover:underline"
                >
                  Scuderia Ferrari Driver Academy
                </a>
              </li>
              <li>
                <a
                  href="https://scuderiaferrariclub.ferrari.com/"
                  className="text-white no-underline hover:underline"
                >
                  Scuderia Ferrari Member
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="font-bold uppercase mb-4 text-center">
              SPORTS CARS
            </h4>
            <ul className="space-y-2 text-sm flex flex-col items-center">
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/auto"
                  className="text-white no-underline hover:underline"
                >
                  Range
                </a>
              </li>
              <li>
                <a
                  href="https://carconfigurator.ferrari.com/en_EN"
                  className="text-white no-underline hover:underline"
                >
                  Configure your Ferrari
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/auto/myferrari"
                  className="text-white no-underline hover:underline"
                >
                  MyFerrari
                </a>
              </li>
              <li>
                <a
                  href="https://preowned.ferrari.com"
                  className="text-white no-underline hover:underline"
                >
                  Pre-owned
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/auto/dealers"
                  className="text-white no-underline hover:underline"
                >
                  Dealers
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/auto/recall-information"
                  className="text-white no-underline hover:underline"
                >
                  Recall information
                </a>
              </li>
              <li>
                <a
                  href="https://techinfo.ferrari.com/"
                  className="text-white no-underline hover:underline"
                >
                  TechInfo
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="font-bold uppercase mb-4 text-center">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-sm flex flex-col items-center">
              <li>
                <a
                  href="https://store.ferrari.com/men?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Men
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/women?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Women
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/kids/boys-2-13-years/view-all/?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Kids
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/replica/replica-scuderia-ferrari/puma-shoes?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Shoes
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/search?cgid=eyewear-ferrari-collection-View-all?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Eyewear
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/collectibles/collectibles/view-all/?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Collectibles
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/replica/replica-scuderia-ferrari/?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Scuderia Ferrari Selection
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="font-bold uppercase mb-4 text-center">
              EXPERIENCES
            </h4>
            <ul className="space-y-2 text-sm flex flex-col items-center">
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/corse-clienti"
                  className="text-white no-underline hover:underline"
                >
                  Corse Clienti
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/esports/ferrari-esports-series"
                  className="text-white no-underline hover:underline"
                >
                  Ferrari Esports Series
                </a>
              </li>
              <li>
                <a
                  href="http://ristorantecavallino.com/"
                  className="text-white no-underline hover:underline"
                >
                  Ristorante Cavallino
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/museums"
                  className="text-white no-underline hover:underline"
                >
                  Ferrari Museums
                </a>
              </li>
              <li>
                <a
                  href="https://ferrariworldabudhabi.com"
                  className="text-white no-underline hover:underline"
                >
                  Ferrari World Abu Dhabi
                </a>
              </li>
              <li>
                <a
                  href="https://www.portaventuraworld.com/en/ferrari-land"
                  className="text-white no-underline hover:underline"
                >
                  Ferrari Land Barcelona
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="font-bold uppercase mb-4 text-center">ABOUT US</h4>
            <ul className="space-y-2 text-sm flex flex-col items-center">
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/corporate"
                  className="text-white no-underline hover:underline"
                >
                  Corporate
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/corporate/sustainability"
                  className="text-white no-underline hover:underline"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/media-centre"
                  className="text-white no-underline hover:underline"
                >
                  Media Centre
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/news"
                  className="text-white no-underline hover:underline"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/magazine"
                  className="text-white no-underline hover:underline"
                >
                  Magazine
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/history"
                  className="text-white no-underline hover:underline"
                >
                  History
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/corporate/career"
                  className="text-white no-underline hover:underline"
                >
                  Join us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hidden md:flex justify-between">
          <div className="text-center">
            <h4 className="font-bold uppercase mb-4 text-center">RACING</h4>
            <ul className="space-y-2 text-sm flex flex-col items-center">
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/formula1"
                  className="text-white no-underline hover:underline"
                >
                  Scuderia Ferrari HP
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/formula1/charles-leclerc"
                  className="text-white no-underline hover:underline"
                >
                  Charles Leclerc
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/formula1/lewis-hamilton"
                  className="text-white no-underline hover:underline"
                >
                  Lewis Hamilton
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/hypercar"
                  className="text-white no-underline hover:underline"
                >
                  Hypercar
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/competizioni-gt"
                  className="text-white no-underline hover:underline"
                >
                  GT Series
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/esports"
                  className="text-white no-underline hover:underline"
                >
                  Esports
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/fda"
                  className="text-white no-underline hover:underline"
                >
                  Scuderia Ferrari Driver Academy
                </a>
              </li>
              <li>
                <a
                  href="https://scuderiaferrariclub.ferrari.com/"
                  className="text-white no-underline hover:underline"
                >
                  Scuderia Ferrari Member
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="font-bold uppercase mb-4 text-center">
              SPORTS CARS
            </h4>
            <ul className="space-y-2 text-sm flex flex-col items-center">
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/auto"
                  className="text-white no-underline hover:underline"
                >
                  Range
                </a>
              </li>
              <li>
                <a
                  href="https://carconfigurator.ferrari.com/en_EN"
                  className="text-white no-underline hover:underline"
                >
                  Configure your Ferrari
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/auto/myferrari"
                  className="text-white no-underline hover:underline"
                >
                  MyFerrari
                </a>
              </li>
              <li>
                <a
                  href="https://preowned.ferrari.com"
                  className="text-white no-underline hover:underline"
                >
                  Pre-owned
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/auto/dealers"
                  className="text-white no-underline hover:underline"
                >
                  Dealers
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/auto/recall-information"
                  className="text-white no-underline hover:underline"
                >
                  Recall information
                </a>
              </li>
              <li>
                <a
                  href="https://techinfo.ferrari.com/"
                  className="text-white no-underline hover:underline"
                >
                  TechInfo
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="font-bold uppercase mb-4 text-center">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-sm flex flex-col items-center">
              <li>
                <a
                  href="https://store.ferrari.com/men?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Men
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/women?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Women
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/kids/boys-2-13-years/view-all/?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Kids
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/replica/replica-scuderia-ferrari/puma-shoes?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Shoes
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/search?cgid=eyewear-ferrari-collection-View-all?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Eyewear
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/collectibles/collectibles/view-all/?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Collectibles
                </a>
              </li>
              <li>
                <a
                  href="https://store.ferrari.com/replica/replica-scuderia-ferrari/?from=FT"
                  className="text-white no-underline hover:underline"
                >
                  Scuderia Ferrari Selection
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="font-bold uppercase mb-4 text-center">
              EXPERIENCES
            </h4>
            <ul className="space-y-2 text-sm flex flex-col items-center">
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/corse-clienti"
                  className="text-white no-underline hover:underline"
                >
                  Corse Clienti
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/esports/ferrari-esports-series"
                  className="text-white no-underline hover:underline"
                >
                  Ferrari Esports Series
                </a>
              </li>
              <li>
                <a
                  href="http://ristorantecavallino.com/"
                  className="text-white no-underline hover:underline"
                >
                  Ristorante Cavallino
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/museums"
                  className="text-white no-underline hover:underline"
                >
                  Ferrari Museums
                </a>
              </li>
              <li>
                <a
                  href="https://ferrariworldabudhabi.com"
                  className="text-white no-underline hover:underline"
                >
                  Ferrari World Abu Dhabi
                </a>
              </li>
              <li>
                <a
                  href="https://www.portaventuraworld.com/en/ferrari-land"
                  className="text-white no-underline hover:underline"
                >
                  Ferrari Land Barcelona
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="font-bold uppercase mb-4 text-center">ABOUT US</h4>
            <ul className="space-y-2 text-sm flex flex-col items-center">
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/corporate"
                  className="text-white no-underline hover:underline"
                >
                  Corporate
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/corporate/sustainability"
                  className="text-white no-underline hover:underline"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/media-centre"
                  className="text-white no-underline hover:underline"
                >
                  Media Centre
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/news"
                  className="text-white no-underline hover:underline"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/magazine"
                  className="text-white no-underline hover:underline"
                >
                  Magazine
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/history"
                  className="text-white no-underline hover:underline"
                >
                  History
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/corporate/career"
                  className="text-white no-underline hover:underline"
                >
                  Join us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#333333] max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <a
            href="https://www.facebook.com/Ferrari"
            target="_blank"
            className="flex items-center text-white no-underline hover:underline"
          >
            <img
              src="/assets/svgs/facebook-white.svg"
              alt="Facebook"
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm">Facebook</span>
          </a>

          <a
            href="https://www.instagram.com/ferrari"
            target="_blank"
            className="flex items-center text-white no-underline hover:underline"
          >
            <img
              src="/assets/svgs/instagram-white.svg"
              alt="Instagram"
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm">Instagram</span>
          </a>

          <a
            href="https://www.linkedin.com/company/ferrari"
            target="_blank"
            className="flex items-center text-white no-underline hover:underline"
          >
            <img
              src="/assets/svgs/linkedin-white.svg"
              alt="LinkedIn"
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm">LinkedIn</span>
          </a>

          <a
            href="https://www.tiktok.com/@ferrari"
            target="_blank"
            className="flex items-center text-white no-underline hover:underline"
          >
            <img
              src="/assets/svgs/tiktok-white.svg"
              alt="TikTok"
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm">TikTok</span>
          </a>

          <a
            href="https://www.twitch.tv/ferrariesports"
            target="_blank"
            className="flex items-center text-white no-underline hover:underline"
          >
            <img
              src="/assets/svgs/twitch-white.svg"
              alt="Twitch"
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm">Twitch</span>
          </a>

          <a
            href="https://twitter.com/Ferrari"
            target="_blank"
            className="flex items-center text-white no-underline hover:underline"
          >
            <img
              src="/assets/svgs/x-white.svg"
              alt="X"
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm">X</span>
          </a>
        </div>
      </div>

      <div className="border-t border-[#333333] max-w-6xl mx-auto px-4 py-8">
        <p className="text-xs mb-4">
          Ferrari N.V. - Holding company - A company under Dutch law, having its
          official seat in Amsterdam, the Netherlands and its corporate address
          at Via Abetone Inferiore No. 4, I-41053 Maranello (MO), Italy,
          registered with the Dutch trade register under number 64060977
        </p>
        <p className="text-xs mb-4">
          Ferrari S.p.A. - A company under Italian law, having its registered
          office at Via Emilia Est No. 1163, Modena, Italy, Companies' Register
          of Modena, VAT and Tax number 00159560366 and share capital of Euro
          20,260,000
        </p>
        <p className="text-xs">Copyright 2025 - All rights reserved</p>

        <button className="flex items-center mt-6 text-sm">
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 131.3"
            className="w-6 h-6 mr-2"
          >
            <path d="M71.6 131.3c1 0 2.1-.3 3.1-.8 3.9-1.8 5.5-6.2 3.6-10.1 0 0-14.3-32.7-16.9-44.7-1-4.2-1.6-15.3-1.8-20.5 0-1.8 1-3.4 2.6-3.9l32-9.6c3.9-1 6.2-5.5 5.2-9.4-1-3.9-5.5-6.2-9.4-5.2 0 0-29.6 9.6-40.3 9.6-10.4 0-39.8-9.4-39.8-9.4-3.9-1-8.3.8-9.6 4.7-1.3 4.2 1 8.6 5.2 9.6l32 9.6c1.6.5 2.9 2.1 2.6 3.9-.3 5.2-.8 16.4-1.8 20.5-2.6 12-16.9 44.7-16.9 44.7-1.8 3.9 0 8.3 3.6 10.1 1 .5 2.1.8 3.1.8 2.9 0 5.7-1.6 6.8-4.4l15.3-31.2L64.8 127c1.3 2.7 3.9 4.3 6.8 4.3z"></path>
            <circle cx="50.3" cy="14.6" r="14.6"></circle>
          </svg>
          <span>Accessibility settings</span>
        </button>
      </div>

      <div className="bg-[#212121] py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <ul className="flex flex-wrap gap-4 text-xs">
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/legal"
                  className="text-white no-underline hover:underline"
                >
                  Legal
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/privacy-policy"
                  className="text-white no-underline hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/cookie-policy"
                  className="text-white no-underline hover:underline"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/accessibility"
                  className="text-white no-underline hover:underline"
                >
                  Accessibility
                </a>
              </li>
              <li>
                <a
                  href="https://privacyportal-de.onetrust.com/webform/98d779e0-913c-4c73-b9fe-4e0e2e29c727/8311287a-be4e-4748-86c2-e12d7ccdf2db"
                  className="text-white no-underline hover:underline"
                >
                  Submit your privacy request
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/contacts"
                  className="text-white no-underline hover:underline"
                >
                  Contacts
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/en-EN/corporate"
                  className="text-white no-underline hover:underline"
                >
                  Corporate ENG
                </a>
              </li>
              <li>
                <a
                  href="https://www.ferrari.com/it-IT/corporate"
                  className="text-white no-underline hover:underline"
                >
                  Corporate ITA
                </a>
              </li>
            </ul>
            <a
              href="/choose-your-country?origin=CORPORATE"
              className="flex items-center text-xs mt-4 sm:mt-0 text-white no-underline"
            >
              <span>International</span>
              <svg
                width="16"
                height="8"
                viewBox="0 0 16 8"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path
                  d="M9.547.732L16 8 8 4 0 8 6.453.732A1.996 1.996 0 0 1 8 0c.623 0 1.18.285 1.547.732z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-6 border-t border-[#333333]">
        <a href="https://www.shell.com" target="_blank">
          <img
            src="/assets/svgs/shell-white.svg"
            alt="Shell"
            className="h-8"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
