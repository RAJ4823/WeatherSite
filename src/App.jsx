import react, { useState, useEffect } from 'react';
import WeatherInfoArea from './components/Weather_Info_Area/WeatherInfoArea';
import SettingArea from './components/Setting_Area/SettingArea';
import SearchArea from './components/Search_Area/SearchArea';
import FavArea from './components/Fav_Area/FavArea';
import Header from './components/Header';
import Footer from './components/Footer';
import { changeDefaultBg, changeDynamicBg } from './components/ChangeBg';
import './app.css';

// Change default BG when app is loaded
changeDefaultBg();
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_TEMP_UNIT = {
  c: 'metric',
  f: 'imperial',
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [settings, setSettings] = useState({
    dynamicBg: localStorage.getItem('dynamicBg') || '4',
    defaultBg: localStorage.getItem('defaultBg') || 'ON',
    temp_unit: localStorage.getItem('temp_unit') || 'c',
  });

  const [popup, setPopup] = useState({
    favArea: false,
    settingArea: false,
  });

  function fetchLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }
  // Will fetch the users current location
  useEffect(fetchLocation, [lat, long]);

  const search = async (cityName) => {
    setIsLoading(true);
    let query = null;
    const tempUnit = API_TEMP_UNIT[settings.temp_unit];

    if (cityName) {
      query = `?q=${cityName}&appid=${API_KEY}&units=${tempUnit}`;
    } else if (lat && long) {
      query = `?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${tempUnit}`;
    } else {
      setIsLoading(false);
      let __confirm = confirm(
        'Location permission is not granted. Would you want to give permission?'
      );
      if (__confirm) fetchLocation();
      return;
    }

    Promise.all([
      await fetch(`${API_URL}/weather/${query}`).then((resp) => resp.json()),
      await fetch(`${API_URL}/forecast/${query}`).then((resp) => resp.json()),
    ]).then((res) => {
      setIsLoading(false);
      if (res[0].cod !== 200) {
        document.documentElement.style.setProperty('--color', `RED`);
        alert('Searched City Name Is Invalid or It Does Not Exist');
        return;
      }

      let cityNameTitle = res[0].name;
      res[0].sys.country ? (cityNameTitle += ', ' + res[0].sys.country) : '';
      changeDynamicBg(res[0]);
      setData({
        currentWeather: res[0],
        hourlyForecast: res[1],
        headerTitle: cityNameTitle,
      });
    });
  };

  function gotoSearchArea() {
    changeDefaultBg();
    setData(null);
    setPopup({
      favArea: false,
      settingArea: false,
    });
  }
  function toggleFavArea() {
    setPopup({
      favArea: !popup.favArea,
      settingArea: false,
    });
  }
  function toggleSettingArea() {
    setPopup({
      favArea: false,
      settingArea: !popup.settingArea,
    });
  }
  function closeArea() {
    setPopup({
      favArea: false,
      settingArea: false,
    });
  }
  function changeSettings(key, value) {
    let newSettings = { ...settings, [key]: value };
    localStorage.setItem(key, value);
    setSettings(newSettings);
    if (key === 'defaultBg') changeDefaultBg();
  }

  return (
    <>
      {popup.favArea && !data && (
        <FavArea onSearch={search} onClose={closeArea} />
      )}
      {popup.settingArea && !data && (
        <SettingArea onClose={closeArea} onChange={changeSettings} />
      )}
      <Header
        title={data ? data.headerTitle : 'Weather Site'}
        onBack={gotoSearchArea}
        onToggleFav={toggleFavArea}
        onToggleSetting={toggleSettingArea}
      />

      {data ? (
        <WeatherInfoArea
          currentWeather={data.currentWeather}
          hourlyForecast={data.hourlyForecast}
        />
      ) : (
        <SearchArea onSearch={search} isLoading={isLoading} />
      )}

      <Footer />
    </>
  );
}
