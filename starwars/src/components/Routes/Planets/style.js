import styled from "styled-components";
import img from "../../../assets/img/backgroundPlanets.png";

export const Planet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
  padding-top: 120px;
`;
