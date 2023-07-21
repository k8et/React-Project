import { People } from "./style";
import Loader from "../../../assets/loader/Loader";
import { useEffect, useState } from "react";
import { FilmsPhoto } from "../../../constants/MockData";

function Peoples({ value }) {
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
    <People>
      <div className={"filmDesc"}>
        <p className={"descTitle"}>Peoples</p>
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
                src={`${item.people}`}
                alt="film pics"
                className={"imgFilm"}
              />
            </div>
            <div className={"textContainer"}>
              <p className={"filmTitle"}>{item.name}</p>
              <p className={"filmText"}>Gender: {item.gender}</p>
              <p className={"filmText"}>Height: {item.height}</p>
              <p className={"filmText"}>Mass: {item.mass}</p>
              <p className={"filmText"}>Skin color: {item.skin_color}</p>
              <p className={"filmText"}>Birth years: {item.birth_year}</p>
              <p className={"filmText"}>Eye color: {item.eye_color}</p>
            </div>
          </div>
        );
      })}
    </People>
  );
}

export default Peoples;
