import { StarShip } from "./style";
import "./style.css";
import Loader from "../../../assets/loader/Loader";
import { useEffect, useState } from "react";
import { FilmsPhoto } from "../../../constants/MockData";

function StarCars({ value }) {
  let [values, setValues] = useState([]);
  let [film, setFilm] = useState([]);

  useEffect(() => {
    const addPics = FilmsPhoto.map((e) => e);
    setFilm(addPics);
  }, []);

  // let arr = [1, 1, 2, 2, 4, 3, 5, 6, 7];
  //
  // let data = new Set(arr);
  //
  // console.log(data);

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
    <StarShip>
      <div className={"filmDesc"}>
        <p className={"descTitle"}>Star Cars</p>
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
                src={`${item.starship}`}
                alt="film pics"
                className={"imgFilm"}
              />
            </div>
            <div className={"textContainer"}>
              <p className={"filmTitle"}>{item.name}</p>
              <p className={"filmText"}>cost: {item.cost_in_credits}</p>
              <p className={"filmText"}>length: {item.length} m</p>
              <p className={"filmText"}>model: {item.model}</p>
              <p className={"filmText"}>crew amount: {item.crew}</p>
              <p className={"filmText"}>passengers: {item.passengers}</p>
              <p className={"filmText"}>
                max atmosphere speed: {item.max_atmosphering_speed}
              </p>
              <p className={"filmText"}>
                starship class: {item.starship_class}
              </p>
            </div>
          </div>
        );
      })}
    </StarShip>
  );
}
export default StarCars;
