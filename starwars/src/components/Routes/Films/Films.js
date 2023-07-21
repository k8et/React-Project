import "../../../assets/img/mainBackground.png";
import "./style.css";
import { Film } from "./style";
import Loader from "../../../assets/loader/Loader";
import { useState } from "react";
import { useEffect } from "react";
import { FilmsPhoto } from "../../../constants/MockData";

function Films({ value }) {
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
    <Film>
      <div className={"todoFilms"}>
        <div className={"filmDesc"}>
          <p className={"descTitle"}>Films</p>
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
                  src={`${item.uri}`}
                  alt="film pics"
                  className={"imgFilm"}
                />
              </div>
              <div className={"textContainer"}>
                <p className={"filmTitle"}>{item.title}</p>
                <p className={"filmText"}>{item.opening_crawl}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Film>
  );
}

export default Films;
