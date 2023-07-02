import styled from "styled-components";
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const FormPos = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  padding: 24px;
  background-color: #f7f7f7;
  border-radius: 8px;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: none;
  background-color: #3f51b5;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #2c387e;
  }
`;