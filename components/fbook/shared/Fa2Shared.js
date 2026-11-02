import { styled } from "styled-components";

export const Fa2Input = styled.input`
  width: 100%;
  border: 1px solid #ccd0d5;
  padding: 14px 16px;
  outline: none !important;
  border-radius: 6px;
  font-size: 15px;
  font-family: "Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif !important;
  color: #1c1e21;
  background: #fff;
  box-sizing: border-box;
  margin-bottom: 12px;

  &.redborder {
    border: 1px solid #d93025 !important;
  }

  &:focus {
    border: 1px solid #0866ff;
    box-shadow: 0 0 0 2px rgba(8, 102, 255, 0.2);
  }

  &:disabled {
    background: #f0f2f5;
  }
`;

export const Fa2Error = styled.div`
  font-size: 12px;
  color: #d93025;
  text-align: left;
  padding-bottom: 0.5rem;
  margin-top: -0.25rem;
  font-family: "Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif !important;
`;

export const Fa2ImageWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
  min-height: 200px;
  background-color: #f0f2f5;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  @media (max-width: 479.98px) {
    min-height: 160px;
    border-radius: 4px;
  }
`;

export const Fa2SmallText = styled.div`
  color: #1c1e21;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  font-family: "Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif !important;
`;
