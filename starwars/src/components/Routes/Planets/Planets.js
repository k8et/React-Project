import { Planet } from "./style";
import Loader from "../../../assets/loader/Loader";
import { useEffect, useState } from "react";
import { FilmsPhoto } from "../../../constants/MockData";

function Planets({ value }) {
  let [values, setValues] = useState([]);
  let [film, setFilm] = useState([]);

  useEffect(() => {
    const addPics = FilmsPhoto.map((e) => e);
    setFilm(addPics);
  }, []);

  const completeTodo = async () => {
    const arr = [];
    for (let key in value) {
      for (let i = 0; i < value.length; i++) {
        arr[i] = await value[i];
        await Object.assign(value[key], film[key]);
      }
    }
    return arr;
  };

  useEffect(() => {
    completeTodo().then((p) => setValues(p));
  }, [value]);

  if (!value) {
    return <Loader />;
  }

  return (
    <Planet>
      <div className={"filmDesc"}>
        <p className={"descTitle"}>Planets</p>
        <p className={"descText"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias
          assumenda aut beatae deleniti distinctio doloremque eos error
          molestiae natus pariatur perferendis, perspiciatis porro possimus,
          sequi sit soluta ullam vero!
        </p>
      </div>
      {value.map((item) => {
        return (
          <div className={"infoCard"}>
            <div className={"imgContainer"}>
              <img
                src={`${item.planet}`}
                alt="film pics"
                className={"imgFilm"}
              />
            </div>
            <div className={"textContainer"}>
              <p className={"filmTitle"}>{item.name}</p>
              <p className={"filmText"}>climate: {item.climate}</p>
              <p className={"filmText"}>gravity: {item.gravity}</p>
              <p className={"filmText"}>crated: {item.created}</p>
              <p className={"filmText"}>population: {item.population}</p>
              <p className={"filmText"}>diameter: {item.diameter} Km²</p>
              <p className={"filmText"}>terrain: {item.terrain} Km²</p>
            </div>
          </div>
        );
      })}
    </Planet>
  );
}

export default Planets;
