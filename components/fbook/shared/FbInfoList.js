import React from "react";
import { styled } from "styled-components";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 36px;

  @media (max-width: 479.98px) {
    gap: 12px;
    margin-bottom: 28px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-top: 2px;
  }
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #1c1e21;
  text-align: start;
`;

export function FbInfoList({ children }) {
  return <List>{children}</List>;
}

export function FbInfoRow({ icon, children }) {
  return (
    <Row>
      {icon}
      <Text>{children}</Text>
    </Row>
  );
}
