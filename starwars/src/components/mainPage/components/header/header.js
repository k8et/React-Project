import React from "react";
import { Header } from "./style";
import StarWarsSvg from "../../../../assets/svg/starwars";
import BtnParents from "./headerComponent/BtnContainer";
import { Link, Outlet } from "react-router-dom";
import "./HeaderStyle.css";

function HeaderComponent(props) {
  const { data, onCLick, show, width, height, color } = props;
  return (
    <>
      <header>
        <Header>
          <Link to={"/"}>
            <StarWarsSvg width={width} height={height} color={color} />
          </Link>
          <BtnParents data={data} onClick={onCLick} show={show} />
        </Header>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default HeaderComponent;
