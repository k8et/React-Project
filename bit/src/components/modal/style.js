import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  width: 30%;
  border-radius: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); 
`;
export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  align-self: flex-end;
  font-size: 16px;
  cursor: pointer;
  color: #333;
  margin-bottom: 5px;
  margin-right: 5px;
`;

export const FavoriteButton = styled.button`
  align-self: flex-end;
  margin-top: 5px;
  margin-right: 5px;
  background-color: transparent;
  border: none;
`;

export const Input = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const BuySellButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;
