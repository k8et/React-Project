import styled from "styled-components";
import img from "../../../assets/img/backgroundStarShip.png";

export const StarShip = styled.div`
  background-image: url(${img});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #3f3f3f;
  width: 100%;
  padding-top: 120px;
  color: white;
`;
