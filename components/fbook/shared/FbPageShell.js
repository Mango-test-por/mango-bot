import React from "react";
import { styled } from "styled-components";

const Shell = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  font-family: "Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;
  color: #1c1e21;
  overflow-y: auto;
  overscroll-behavior-y: none;
`;

const Header = styled.div`
  position: relative;
  inset-inline-start: 0;
  z-index: 1;
`;

const HeaderInner = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  border-bottom: 1px solid #dadde1;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #1c1e21;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 767.98px) {
    opacity: 1;
    pointer-events: auto;
  }
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  color: #0866ff;
  font-size: 20px;
  font-weight: 700;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  inset-inline-start: 0;

  @media (max-width: 479.98px) {
    padding: 0;
    align-items: stretch;
  }
`;

export default function FbPageShell({ children, onBack }) {
  return (
    <Shell>
      <Header>
        <HeaderInner>
          <HeaderRow>
            <BackButton
              type="button"
              onClick={onBack}
              aria-label="Back to previous page"
            >
              <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                <path d="M8.043 3.043a1 1 0 1 1 1.414 1.414c-.638.639-1.32 1.32-2.018 2.015-.84.836-1.701 1.696-2.532 2.528H17.25a1 1 0 1 1 0 2H4.912l2.556 2.554.003.003 1.986 1.986a1 1 0 1 1-1.414 1.414l-1.987-1.986a7265.663 7265.663 0 0 1-3.21-3.209 2.495 2.495 0 0 1-.003-3.526C3.87 7.206 4.97 6.11 6.03 5.051a1339 1339 0 0 0 2.013-2.008z" />
              </svg>
            </BackButton>
            <LogoWrap>
              <svg height="24" viewBox="100 100 900 160" xmlns="http://www.w3.org/2000/svg">
                <path d="M881.583 257.897h29.48v-47.696l41.137 47.696h36.072l-47.89-54.969 40.909-47.663h-32.825l-37.403 43.93v-96.982l-29.48 3.864v151.82Zm-67.988-105.261c-32.728 0-55.455 22.013-55.455 53.929s22.727 53.929 55.455 53.929c32.727 0 55.455-22.013 55.455-53.929s-22.728-53.929-55.455-53.929Zm0 82.728c-15.163 0-25.552-11.721-25.552-28.799s10.389-28.799 25.552-28.799c15.162 0 25.552 11.721 25.552 28.799s-10.39 28.799-25.552 28.799Zm-119.807-82.728c-32.727 0-55.455 22.013-55.455 53.929s22.728 53.929 55.455 53.929c32.728 0 55.455-22.013 55.455-53.929s-22.727-53.929-55.455-53.929Zm0 82.728c-15.162 0-25.552-11.721-25.552-28.799s10.39-28.799 25.552-28.799c15.163 0 25.552 11.721 25.552 28.799s-10.389 28.799-25.552 28.799Zm-112.826-82.728c-13.636 0-24.935 5.357-32.013 15.162v-65.585l-29.513 3.831v151.82h26.169l.519-15.844c6.981 11.818 19.481 18.474 34.838 18.474 27.988 0 48.475-22.728 48.475-53.929 0-31.202-20.39-53.929-48.475-53.929Zm-6.98 82.728c-15.163 0-25.552-11.721-25.552-28.799s10.389-28.799 25.552-28.799c15.162 0 25.552 11.721 25.552 28.799s-10.39 28.799-25.552 28.799Z" fill="#0866ff" />
              </svg>
            </LogoWrap>
          </HeaderRow>
        </HeaderInner>
      </Header>
      <Body>{children}</Body>
    </Shell>
  );
}
