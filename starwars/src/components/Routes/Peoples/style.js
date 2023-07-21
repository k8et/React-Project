import styled from "styled-components";
import img from "../../../assets/img/backgroundPeoples.png";

export const People = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${img});
  background-size: cover;
  background-color: #595959;
  padding-top: 120px;
`;
