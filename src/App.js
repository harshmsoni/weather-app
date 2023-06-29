import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=10216d7853074fb3f9aff89b952a63f9`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      if (data.name || error) {
        // Clear previous data and error if present
        setData({});
        setError("");
      }
      axios
        .get(weatherURL)
        .then((resp) => {
          setData(resp.data);
          setError("");
        })
        .catch((error) => {
          setError("Please enter a valid location.");
        });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter City Name"
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        {error && <p className="error">{error}</p>}
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{((data.main.temp - 32 )* (5/9)).toFixed(2)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{((data.main.feels_like - 32 )* (5/9)).toFixed(2)}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity}</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
