import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BtnContainer = styled.div`
  width: 35em;
  display: flex;
  justify-content: space-around;
  margin-right: 2%;
`;

export const SearchContainer = styled.div`
  display: flex;
`;

export const SearchInput = styled.input`
  padding: 5px 5px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const HeaderBtn = styled.button`
  border-style: none;
  background-color: transparent;
  color: gray;
  font-size: 1em;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    color: #ababab;
  }

  &:active {
    color: #ffffff;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  border-style: none;
  background-color: transparent;
  color: gray;
  font-size: 1em;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    color: #ababab;
  }

  &:active {
    color: #ffffff;
  }
`;
