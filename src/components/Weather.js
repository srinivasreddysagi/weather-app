import { useEffect, useState } from "react";
import "./Weather.css";
import { FaSearchLocation } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

function Weather() {
    const [location, setLocation] = useState(null);
    const [redCode, setRedCode] = useState(false);
    const [origin, setOrigin] = useState(null);
    const [data, setData] = useState(null);
    const [errMsg, setErrMsg] = useState('Aw Oww! Something went wrong');

    useEffect(() => {
      window.navigator.geolocation.getCurrentPosition(console.log, console.log);

      fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=&limit=5&appid=`
      )
          .then()
          .then() 
          .catch();
    }, []);

    function sendRequest() {
      fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=$location&appid=APIkey&units=metric`
      ).then((response)=> {
        if(response.ok) {
          return response.json();
        } else {
          setRedCode(true);
        }
      }
      ).then((response) => {
        if(response.status === 404) {
          setErrMsg('Location not found!');
        }
      }).catch((e)=>console.log(e))
    }

    if(redCode) {
      return(
        <p className="error">{errMsg}</p>
      );
    }

    return (
        <>
            <div className="card">
                <div className="input-container">
                    <input
                        type="text"
                        name="search"
                        placeholder="Location"
                        className="search"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button className="btn-search">
                        <FaSearchLocation />
                    </button>
                </div>
                <div className="result">
                    <p className="city">
                        <MdLocationPin /> Hyderabad
                    </p>
                    <div className="temp">
                        <h3>Temperature</h3>
                        <div className="bar long"></div>
                        <h1>
                            29 <span>°C</span>
                        </h1>
                    </div>
                    <div className="stats">
                        <div className="min">
                            <h4>Minimum</h4>
                            <div className="bar"></div>
                            <h2>
                                26 <span>°C</span>
                            </h2>
                        </div>
                        <div className="humid">
                            <h4>Humidity</h4>
                            <div className="bar"></div>
                            <h2>
                                98 <span>%</span>
                            </h2>
                        </div>
                        <div className="max">
                            <h4>Maximum</h4>
                            <div className="bar"></div>
                            <h2>
                                34 <span>°C</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Weather;
