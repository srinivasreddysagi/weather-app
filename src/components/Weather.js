import { useEffect, useState } from "react";
import "./Weather.css";
import { FaSearchLocation } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Weather() {
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState("");
    const [redCode, setRedCode] = useState(false);
    const [data, setData] = useState(null);
    const [errMsg, setErrMsg] = useState("Please enter your location");

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition((res) => {
          const { latitude, longitude } = res.coords;
            sendRequest(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0f328458436cb65875a7ed1032336221&units=metric`
            );
        }, console.log);
    });

    async function sendRequest(request) {
      console.log(request);
        await fetch(request)
            .then((response) => {
                if (response.ok) {
                  console.log(response);
                    return response.json();
                } else if (response.status === 404 || response.status === 404) {
                    setRedCode(true);
                    setErrMsg("Aw Oww! Something went wrong");
                } else {
                    setRedCode(true);
                    setErrMsg("Please enter your location"); //Location not found!
                }
            })
            .then((response) => {
                setData(response);
                console.log(data);
            })
            .catch((e) => console.log(e));
        await setIsLoading(false);
    }

    if (isLoading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
                <AiOutlineLoading3Quarters className="load-rotate" />
            </div>
        );
    } 
    if (redCode) {
        return (
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
                    <button
                        className="btn-search"
                        onClick={() => {
                            setIsLoading(true);
                            sendRequest(
                                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0f328458436cb65875a7ed1032336221&units=metric`
                            );
                        }}
                    >
                        <FaSearchLocation />
                    </button>
                </div>
                <h3 className="error">{errMsg}</h3>
            </div>
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
                    <button
                        className="btn-search"
                        onClick={() =>
                            sendRequest(
                                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=&units=metric`
                            )
                        }
                    >
                        <FaSearchLocation />
                    </button>
                </div>
                <div className="result">
                    <p className="city">
                        <MdLocationPin /> {`${data.name}, ${data.sys.country}`}
                    </p>
                    <div className="temp">
                        <h3>Temperature</h3>
                        <div className="bar long"></div>
                        <h1>
                            {data.main.temp} <span>°C</span>
                        </h1>
                    </div>
                    <div className="stats">
                        <div className="min">
                            <h4>Minimum</h4>
                            <div className="bar"></div>
                            <h2>
                                {data.main.temp_min} <span>°C</span>
                            </h2>
                        </div>
                        <div className="humid">
                            <h4>Humidity</h4>
                            <div className="bar"></div>
                            <h2>
                                {data.main.humidity} <span>%</span>
                            </h2>
                        </div>
                        <div className="max">
                            <h4>Maximum</h4>
                            <div className="bar"></div>
                            <h2>
                                {data.main.temp_max} <span>°C</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Weather;
