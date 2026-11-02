import React from "react";
import { styled } from "styled-components";

const Button = styled.button`
  background-color: #0866ff;
  border: none;
  width: 100%;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  padding: 0;
  height: 44px;
  border-radius: 22px;
  text-transform: none;
  line-height: 1;
  font-family: "Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;

  &:hover:not(:disabled) {
    background-color: #005fe6;
  }

  &:active:not(:disabled) {
    background-color: #0053cc;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #0866ff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  @media (max-width: 479.98px) {
    height: 48px;
    border-radius: 24px;
  }
`;

export default function FbButton({ children, onClick, disabled, type = "button", ...rest }) {
  return (
    <Button type={type} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </Button>
  );
}
