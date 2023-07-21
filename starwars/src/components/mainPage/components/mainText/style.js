import styled from "styled-components";

export const MainTitle = styled.div`
  width: 70%;
  height: 20em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12%;

  & span:nth-child(2) {
    color: white;
    font-size: 6em;
    position: relative;
    bottom: 90px;
  }
  & span:nth-child(4) {
    color: white;
    font-size: 6em;
    position: relative;
    top: 90px;
  }
  & span:nth-child(1) {
    color: gray;
    font-size: 5.5em;
  }
  & span:nth-child(3) {
    color: gray;
    font-size: 5.5em;
  }
  & span {
    text-transform: uppercase;
    font-family: "Onyx", cursive;
  }
`;

export const MainRelease = styled.div`
  padding-top: 7%;
  margin-left: 8%;
  width: 45%;
  display: flex;
  justify-content: space-between;
`;

export const Release = styled.div`
  & p:nth-child(1) {
    text-align: center;
    color: white;
    font-family: "Franklin Gothic Medium", sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 1.5em;
  }
`;

export const LoremContainer = styled.div`
  width: 45%;

  & p:nth-child(1) {
    color: #9b9b9b;
    font-family: "Franklin Gothic Medium", sans-serif;
    font-weight: 300;
    font-size: 1em;
  }
  & a:nth-child(2) {
    color: white;
    font-family: "Franklin Gothic Medium", serif;
  }
`;
