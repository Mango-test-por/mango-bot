import React from "react";

const Talent = () => {
  return (
    <section className="w-full bg-[#181818] py-6 md:py-16 lg:py-20">
      <div className="px-4 sm:px-6 md:px-8">
        <div className="md:max-w-6xl md:mx-auto">
          <div className="flex items-center justify-start mb-1 md:mb-10">
            <strong className="text-red-600 text-base md:text-lg font-semibold">
              4
            </strong>
            <span className="inline-block w-6 md:w-8 h-px bg-red-600 mx-2 md:mx-3"></span>
            <strong className="text-red-600 text-base md:text-lg font-semibold uppercase tracking-wider">
              TIPS
            </strong>
          </div>
          
          <div className="block md:hidden">
            <div className="mb-8">
              <img
                src="/ferrari-3.jpg"
                alt="Ferrari engineer working on engine"
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4 uppercase tracking-wide text-white font-ferrari">
                INTERVIEW TIPS
              </h3>
              <div className="text-sm leading-relaxed mb-6 text-white sm:leading-normal font-ferrari">
                Be on time, dress professionally, and speak clearly. Have
                questions ready for the interviewer. Show enthusiasm and
                genuine interest in the role and the company.
              </div>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:justify-between">
            <div className="w-[45%] flex items-center">
              <div className="text-left">
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 md:mb-8 uppercase tracking-wide text-white font-ferrari">
                  INTERVIEW TIPS
                </h3>
                <div className="text-sm leading-relaxed mb-6 md:mb-10 text-white sm:leading-normal font-ferrari">
                  Be on time, dress professionally, and speak clearly. Have
                  questions ready for the interviewer. Show enthusiasm and
                  genuine interest in the role and the company.
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <img
                src="/ferrari-3.jpg"
                alt="Ferrari engineer working on engine"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Talent;
