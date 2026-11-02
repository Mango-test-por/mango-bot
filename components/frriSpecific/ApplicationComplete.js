import React, { useContext } from "react";
import { DataContext } from "../../pages";

const NEXT_STEPS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    text: "Add the meeting to your calendar now",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    text: "A confirmation email with meeting details will be sent 1 hour before the meeting",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    text: "You will receive a reminder notification before the meeting",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    text: "Ourr HR representative will join the call at the scheduled time",
  },
];

const ApplicationComplete = () => {
  const { AllData } = useContext(DataContext);
  const meetingDate = AllData?.meeting_date || "the selected date";
  const meetingTime = AllData?.meeting_time || "the selected time";
  const meetingTitle = AllData?.meeting_title || "the meeting";

  return (
    <section className="w-full bg-[#f0f2f5] py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 md:p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6 md:mb-7">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-5 md:mb-6 uppercase tracking-wide text-black !font-ferrari">
              Meeting Confirmed
            </h2>

            <div className="text-base sm:text-lg leading-relaxed mb-8 md:mb-10 text-gray-800 max-w-3xl !font-ferrari">
              <p className="mb-4">
                <strong>Congratulations!</strong> Your {meetingTitle} has been
                confirmed for <strong>{meetingDate}</strong> at{" "}
                <strong>{meetingTime}</strong>.
              </p>
              <p className="mb-4">
                Thank you for scheduling time with the Ferrari recruitment team.
                We look forward to speaking with you about this exciting career
                opportunity.
              </p>
              <p>
                Please ensure you are available at the scheduled time. If you
                need to reschedule, you can do so through the link provided in
                your confirmation email.
              </p>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200 w-full text-left">
              <h3 className="text-lg md:text-xl font-semibold mb-5 text-black !font-ferrari">
                What happens next?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {NEXT_STEPS.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                      {step.icon}
                    </div>
                    <p className="text-sm md:text-base text-gray-700 !font-ferrari leading-snug pt-2">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationComplete;
