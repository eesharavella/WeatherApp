import React, { useState } from 'react';
import './App.css';
import notFoundImage from './images/404-image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const APIKey = '35a9b286d40ed8a384c3f46415d0e4ea';

  const handleSearch = () => {
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
      .then(response => response.json())
      .then(json => {
        if (json.cod === '404') {
          setError(true);
          setWeatherData(null);
        } else {
          setError(false);
          setWeatherData(json);
        }
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
        setError(true);
        setWeatherData(null);
      });
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="display-4 mb-4 text-white">Weather Forecaster</h1>
      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="bi bi-geo-alt-fill"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your location"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Get Weather
        </button>
      </div>

      <div className="card weather-card">
        <div className="card-body">
          {error && (
            <div className="not-found text-center">
              <img src={notFoundImage} alt="Not found" />
              <p className="mt-3">Oops! Invalid location :/</p>
            </div>
          )}

          {weatherData && (
            <div className="weather-box text-center">
              <p className="display-1 temperature">
                {parseInt(weatherData.main.temp)}
                <span className="unit">°C</span>
              </p>
              <p className="lead description">{weatherData.weather[0].description}</p>
            </div>
          )}

          {weatherData && (
            <div className="weather-details mt-4">
              <div className="row">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-droplet-fill"></i>
                    <div className="ms-2">
                      <span>{weatherData.main.humidity}%</span>
                      <p className="mb-0">Humidity</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-wind"></i>
                    <div className="ms-2">
                      <span>{parseInt(weatherData.wind.speed)} Km/h</span>
                      <p className="mb-0">Wind Speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;