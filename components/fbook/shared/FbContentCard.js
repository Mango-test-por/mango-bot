import { styled } from "styled-components";

const FbContentCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 32px;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 767.98px) {
    max-width: 450px;
    padding: 24px;
  }

  @media (max-width: 479.98px) {
    max-width: 100%;
    border-radius: 0;
    padding: 16px;
    box-shadow: none;
  }
`;

export default FbContentCard;
