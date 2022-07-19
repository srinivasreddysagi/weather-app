import { useEffect, useState } from "react";
import "./Weather.css";
import { FaSearchLocation } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Weather() {
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState("");
    const [redCode, setRedCode] = useState(false);
    const [data, setData] = useState(null);
    const [errMsg, setErrMsg] = useState("Please enter your location");

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(
            (res) => {
                const { latitude, longitude } = res.coords;
                setIsLoading(true);
                sendRequest(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0f328458436cb65875a7ed1032336221&units=metric`
                );
            },
            (e) => {
                if (e.PERMISSION_DENIED === 1) {
                    setRedCode(true);
                    setErrMsg(
                        "Please enter your location or allow location access"
                    );
                }
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function sendRequest(request) {
        await fetch(request)
            .then((response) => {
                if (response.ok) {
                    setRedCode(false);
                    setLocation("");
                    return response.json();
                } else if (response.status === 400 || response.status === 404) {
                    setRedCode(true);
                    setErrMsg("Location not found!");
                    setLocation("");
                } else if (response.status >= 429) {
                    setRedCode(true);
                    setErrMsg(response.statusText);
                    setLocation("");
                } else {
                    setRedCode(true);
                    setErrMsg("Please check the location entered");
                }
            })
            .then((response) => {
                setData(response);
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
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}
                    />
                    <button
                        className="btn-search"
                        onClick={() => {
                            if (location.trim() !== "") {
                                setIsLoading(true);
                                sendRequest(
                                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0f328458436cb65875a7ed1032336221&units=metric`
                                );
                            } else {
                                setRedCode(true);
                                setErrMsg("Location cannot be empty");
                                setLocation("");
                            }
                        }}
                    >
                        <FaSearchLocation />
                    </button>
                    <small className="error">{redCode ? errMsg : null}</small>
                </div>
                <div className={redCode ? "result hide" : "result"}>
                    <p className="city">
                        <MdLocationPin />{" "}
                        {`${data?.name}, ${data?.sys?.country}`}
                    </p>
                    <div className="temp">
                        <h3>Temperature</h3>
                        <div className="bar long"></div>
                        <h1>
                            {data?.main?.temp} <span>°C</span>
                        </h1>
                    </div>
                    <div className="stats">
                        <div className="min">
                            <h5>Minimum</h5>
                            <div className="bar"></div>
                            <h3>
                                {data?.main?.temp_min} <span>°C</span>
                            </h3>
                        </div>
                        <div className="humid">
                            <h5>Humidity</h5>
                            <div className="bar"></div>
                            <h3>
                                {data?.main?.humidity} <span>%</span>
                            </h3>
                        </div>
                        <div className="max">
                            <h5>Maximum</h5>
                            <div className="bar"></div>
                            <h3>
                                {data?.main?.temp_max} <span>°C</span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Weather;
