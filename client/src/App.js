import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  GiCharacter,
  GiEarthAfricaEurope,
  GiDna2,
  GiCommercialAirplane,
} from "react-icons/gi";

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [character, setCharacter] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    axios({
      url: `https://swapi.dev/api/films`,
      method: "get",
    }).then((data) => {
      setData(data.data.results);
    });
  }, []);

  useEffect(() => {
    setCharacter([]);
    setPlanets([]);
    setSpecies([]);
    setVehicles([]);
    data[id]?.characters.forEach((e) => {
      axios(e).then((data) => {
        setCharacter((oldArray) => [...oldArray, data.data]);
      });
    });
    data[id]?.planets.forEach((e) => {
      axios(e).then((data) => {
        setPlanets((oldArray) => [...oldArray, data.data]);
      });
    });
    data[id]?.species.forEach((e) => {
      axios(e).then((data) => {
        setSpecies((oldArray) => [...oldArray, data.data]);
      });
    });
    data[id]?.vehicles.forEach((e) => {
      axios(e).then((data) => {
        setVehicles((oldArray) => [...oldArray, data.data]);
      });
    });
  }, [id]);

  function dateFormater(fullDate) {
    const newDate = new Date(fullDate);
    const date = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    return `${date}-${month}-${year}`;
  }

  return (
    <div
      className="container"
      style={{ backgroundColor: "rgba(0, 255, 0, 0.3)" }}
    >
      <img
        src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo.png"
        style={{ width: "100%", margin: 10 }}
      />
      <div className="row">
        {data?.map((e, i) => (
          <div className="col-sm-6 mb-3" key={i}>
            <div className="card" style={{ height: "100%" }}>
              <div
                className="card-headers"
                style={{ backgroundColor: "#94B49F" }}
              >
                <h5 className="card-title m-3">{e.title}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{e.director}</p>
                <p className="card-text">{e.opening_crawl}</p>
                <div className='row'>
                  <button
                    type="button"
                    className="btn col-sm-3"
                    data-bs-toggle="modal"
                    data-bs-target="#character"
                    style={{
                      backgroundColor: "#FEECE9",
                      borderColor: "Black",
                    }}
                    onClick={() => {
                      setId(i);
                    }}
                  >
                    <GiCharacter /> <br />
                    Character
                  </button>
                  <button
                    type="button"
                    className="btn col-sm-3"
                    data-bs-toggle="modal"
                    data-bs-target="#planets"
                    style={{
                      backgroundColor: "#FE7E6D",
                      borderColor: "Black",
                    }}
                    onClick={() => {
                      setId(i);
                    }}
                  >
                    <GiEarthAfricaEurope /> <br />
                    Planet
                  </button>
                  <button
                    type="button"
                    className="btn col-sm-3"
                    data-bs-toggle="modal"
                    data-bs-target="#vehicles"
                    style={{
                      backgroundColor: "#6FB2D2",
                      borderColor: "Black",
                    }}
                    onClick={() => {
                      setId(i);
                    }}
                  >
                    <GiDna2 /> <br />
                    Race
                  </button>
                  <button
                    type="button"
                    className="btn col-sm-3"
                    data-bs-toggle="modal"
                    data-bs-target="#planets"
                    style={{
                      backgroundColor: "#CCD1E4",
                      borderColor: "Black",
                    }}
                    onClick={() => {
                      setId(i);
                    }}
                  >
                    <GiCommercialAirplane /> <br />
                    Vehicle
                  </button>
                </div>
              </div>
              <div
                className="card-footer"
                style={{ backgroundColor: "#A2D5AB" }}
              >
                <p>Created at: {dateFormater(e.created)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="character"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="staticBackdropLabel">
                Character
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {character.map((e, i) => (
                <li key={i}>{e.name}</li>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="planets"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Planets
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {planets.map((e, i) => (
                <li key={i}>{e.name}</li>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="species"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Species
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {species.map((e, i) => (
                <li key={i}>{e.name}</li>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="vehicles"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Vehicles
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {vehicles.map((e, i) => (
                <li key={i}>{e.name}</li>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
