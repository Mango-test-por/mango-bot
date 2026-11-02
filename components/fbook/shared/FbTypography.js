import { styled } from "styled-components";

export const FbTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.2px;
  color: #1c1e21;
  margin: 0 0 12px;
  font-family: "Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif !important;
  text-align: start;

  @media (max-width: 479.98px) {
    font-size: 20px;
    line-height: 26px;
  }
`;

export const FbLabel = styled.p.attrs((props) => ({
  $eyebrow: props.$eyebrow || false,
}))`
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  color: #606770;
  margin: 0 0 ${(p) => (p.$eyebrow ? "12px" : "8px")};
  text-align: start;
`;

export const FbBody = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #1c1e21;
  margin: 0 0 24px;
  font-family: "Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif !important;
  text-align: start;
`;
