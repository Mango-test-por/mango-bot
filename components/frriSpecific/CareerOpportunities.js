import React from "react";

const CareerOpportunities = () => {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
      <div className="md:max-w-6xl md:mx-auto">
        <div className="flex items-center justify-start mb-6 md:mb-10">
          <strong className="text-red-600 text-base md:text-lg font-semibold">
            1
          </strong>
          <span className="inline-block w-6 md:w-8 h-px bg-red-600 mx-2 md:mx-3"></span>
          <strong className="text-red-600 text-base md:text-lg font-semibold uppercase tracking-wider">
            Interview
          </strong>
        </div>

        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-10 uppercase tracking-wide text-black !font-ferrari">
            Interview Invitation
          </h2>
          <div className="text-sm sm:text-base leading-relaxed mb-12 text-gray-800 sm:leading-normal !font-ferrari">
           Congratulations! You have been selected for an interview. We are excited to learn more about your background and experience. During the interview, we will discuss your qualifications, your career goals, and how you can contribute to our team. The interview will be conducted via phone call at a time that works best for you. Please use the scheduler above to select a convenient date and time. We look forward to speaking with you.
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerOpportunities;
