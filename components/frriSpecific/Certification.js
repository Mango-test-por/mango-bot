import React from "react";

const Certification = () => {
  return (
    <section className="w-full bg-white py-6 md:py-16 lg:py-20">
      <div className="px-4 sm:px-6 md:px-8">
        <div className="md:max-w-6xl md:mx-auto">
          <div className="flex items-center justify-start mb-1 md:mb-10">
            <strong className="text-red-600 text-base md:text-lg font-semibold">
              5
            </strong>
            <span className="inline-block w-6 md:w-8 h-px bg-red-600 mx-2 md:mx-3"></span>
            <strong className="text-red-600 text-base md:text-lg font-semibold uppercase tracking-wider">
              Benefits
            </strong>
          </div>
          
          <div className="md:flex md:flex-col">
            <div className="max-w-5xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mt-10 mb-4 md:mb-8 uppercase tracking-wide text-black font-ferrari">
                  Why work with us
                </h3>
                <div className="text-xs sm:text-sm leading-relaxed mb-6 md:mb-10 max-w-2xl mx-auto text-black sm:leading-normal font-ferrari">
                  We offer competitive compensation, comprehensive benefits,
                  and opportunities for professional growth. Join a team that
                  values your contributions and supports your career development.
                </div>
   
                <div className="BoxGrid__list__35lfoCAv mt-8 mb-12 grid grid-cols-2 md:grid-cols-2 gap-6 max-w-xl mx-auto">
                  <div className="BoxGrid__item__1tjOz5cT">
                    <div>
                      <div className="BoxGrid__image__goF9g0Ip">
                        <img 
                          src="/ferrari-4.jpg" 
                          alt="Equal-Salary Globally Certified" 
                          title="Equal-Salary Globally Certified" 
                          loading="lazy" 
                          className="Img__image__1RV_fMUN lazyloaded w-full h-auto"
                        />
                      </div>
                      <div className="BoxGrid__itemTitle__1BhHh7Tr"></div>
                      <div className="BoxGrid__description__3VugROya mt-3 text-sm font-semibold">
                        Equal-Salary on a global level
                      </div>
                    </div>
                  </div>
                  <div className="BoxGrid__item__1tjOz5cT">
                    <div>
                      <div className="BoxGrid__image__goF9g0Ip">
                        <img 
                          src="/ferrari4.1.jpg" 
                          alt="Top Employer Italy" 
                          title="Top Employer Italy" 
                          loading="lazy" 
                          className="Img__image__1RV_fMUN lazyloaded w-full h-auto"
                        />
                      </div>
                      <div className="BoxGrid__itemTitle__1BhHh7Tr"></div>
                      <div className="BoxGrid__description__3VugROya mt-3 text-sm font-semibold">
                        Top Employer Italy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certification;
