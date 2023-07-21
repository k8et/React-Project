import { Routes, Route, useLocation } from "react-router-dom";
import { MainPage, Films, Planets, StarCars, Peoples } from "./index";
import { ArrayBtn } from "../../constants/MockData";
import { useEffect, useState } from "react";
import HeaderComponent from "../mainPage/components/header/header";

function RouteScreen() {
  const [data, setData] = useState([]);
  const { pathname } = useLocation();

  const apiPath =
    pathname === "/films"
      ? "films"
      : pathname === "/starships"
      ? "starships"
      : pathname === "/peoples"
      ? "people"
      : pathname === "/planets"
      ? "planets"
      : pathname === "/"
      ? "/"
      : "";

  useEffect(() => {
    const url = `https://swapi.dev/api/${apiPath}`;

    fetch(url)
      .then((res) => res.json())
      .then((resp) => {
        setData((data) => ({
          ...data,
          [apiPath]: resp.results,
        }));
      });
  }, [apiPath]);

  return (
    <>
      <Routes>
        <Route
          element={
            <HeaderComponent
              data={ArrayBtn}
              width={120}
              height={120}
              color={"white"}
            />
          }
        >
          <Route exact path={"/"} element={<MainPage />} />
          <Route path={"/films"} element={<Films value={data["films"]} />} />
          <Route
            path={"/starships"}
            element={<StarCars value={data["starships"]} />}
          />
          <Route
            path={"/planets"}
            element={<Planets value={data["planets"]} />}
          />
          <Route
            path={"/peoples"}
            element={<Peoples value={data["people"]} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default RouteScreen;
