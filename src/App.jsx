
import axios from 'axios';
import { useEffect, useState } from 'react';
import './styles.css';
import localizacion from './iconos/localizacion.png';
import fall from './iconos/fall.png'

function App() {
  const [weather, setWeather] = useState();
  const [isFarenheit, setIsFarenheit] = useState(true);
  
  useEffect(() => {
    const success = pos => {
      const lat =pos.coords.latitude;
      const lon =pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9a84dbf51fa78c5487e1d19855497b1a`)
        .then(res => {
          setWeather(res.data);
        })
    }
  

    navigator.geolocation.getCurrentPosition(success);
  }, []) 

  return (
    <div className="App">
      <h1 >Weather App <span><img src={fall} alt="" /></span></h1>
      {weather && <h2> {weather.name} <span> <img src={localizacion} alt="" /> </span></h2>} 
      {weather && <h4> {weather.weather[0].description}</h4>}
      {weather && <img src= {`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />}
      {weather && <h2> {Math.round(isFarenheit ? 1.8 * (weather.main.temp - 273) + 32 : weather.main.temp - 273)} {isFarenheit ? "ºF": "ºC"}</h2>}
      <button onClick={() => setIsFarenheit(!isFarenheit)}>Change Degress</button>
    </div>
  )
}

export default App


