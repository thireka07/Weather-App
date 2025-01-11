import { useState } from 'react';
import './App.css';

/*Images*/
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import nightIcon from "./assets/night.png";
import partlyIcon from "./assets/partly cloudy.png";
import partlynightIcon from "./assets/partly cloudy night.png";
import cloudyIcon from "./assets/cloudy.png";
import cloudynightIcon from "./assets/cloudy night.png";
import overcastIcon from "./assets/overcast.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rainy.png";
import thunderstormIcon from "./assets/thunderstorm.png";
import snowIcon from "./assets/snowy.png";
import humidityIcon from "./assets/humidity.png";
import windIcon from "./assets/wind.png";
import initialIcon from "./assets/initial.png";

const WeatherDetails = ({ icon, temp, city, country, lat, lon, humidity, wind, description }) => {
  return (
    <>
      <div className="weather">
        <div className='image'>
          <img src={icon} alt="Image" />
        </div>
        <div className="weather-change">
          <div className="temp">{temp}&deg;C</div>
          <div className="weather-description">{description}</div>
        </div>
      </div>

      <div className="location">{city}</div>
      <div className="country">{country} </div>
      <div className="cord">
        <div>
          <span className='lat'>Lattitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>Longitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className='icon' />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind" className='icon' />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>

    </>
  );
};


function App() {
  let api_key = "fc46ccadefafc95dc618c37f63ba32b1";

  const [text, setText] = useState("");

  const [icon, setIcon] = useState(null);
  const [temp, setTemp] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setwind] = useState(null);
  const [description, setDescription] = useState("");

  const [cityNotFound, setCityNotFound] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": nightIcon,
    "02d": partlyIcon,
    "02n": partlynightIcon,
    "03d": cloudyIcon,
    "03n": cloudynightIcon,
    "04d": overcastIcon,
    "04n": overcastIcon,
    "09d": drizzleIcon,
    "09n": drizzleIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "11d": thunderstormIcon,
    "11n": thunderstormIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const weatherDescriptionMap = {
    "01d": "Sunny",
    "01n": "Clear night",   
    "02d": "Partly cloudy",
    "02n": "Partly cloudy night",
    "03d": "Cloudy",
    "03n": "Cloudy",
    "04d": "Overcast",
    "04n": "Overcast",
    "09d": "Rainy",
    "09n": "Rainy night",
    "10d": "Rainy",
    "10n": "Rainy night",
    "11d": "thunderstorm",
    "11d": "thunderstorm",
    "13d": "Snowy",
    "13n": "Snowy night",
  };


  const search = async () => {
    if (text.trim() === "") {
      setEmptySearch(true);
      return;
    }

    setEmptySearch(false);
    setLoading(true);
    setError(null);
    setCityNotFound(false);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);
      if (data.cod === "404") {
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setwind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setDescription(weatherDescriptionMap[weatherIconCode] || "Clear");
      setCityNotFound(false);
      setSearched(true);
    } catch (error) {
      console.error("An error occurred:", error.message);
      setError("An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    };
  };

  // useEffect(function () {
  //   search();
  // }, []);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input
            type="text"
            className='cityInput'
            placeholder='Search City'
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown} />
          <div className='search-icon' onClick={() => search()}>
            <img src={searchIcon} alt="search" />
          </div>
        </div>

        {Loading && <div className="Loading-message">Loading...</div>}
        {!searched && !Loading && !cityNotFound && !error &&(
          <div className="initial-container">
            <img src={initialIcon} alt="Search for weather" className="initial-image" />
            <div className="initial-message">Search for a city to get weather information</div>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City not found</div>}
        {emptySearch && <div className="error-message">Please enter a city name</div>}

        {searched && !Loading && !cityNotFound && !emptySearch && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity} wind={wind} description={description} />
        }
      </div>
    </>
  );
}

export default App
