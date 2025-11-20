import { useState, useEffect } from "react";
import styled from "styled-components";
import { CurrentDate } from "./currentDate";

const WeatherWidget = styled.div `
  width: 180px;
  border: 0.5px solid black;
  border-radius: 10px;
`;

const City = styled.div `
  font-size: 15px;
  font-weight: 500;
  margin-left: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
`;
const Temperature = styled.div `
  font-size: 25px;
  font-weight: 600;
  margin-left: 10px;
`;

const Description = styled.div`
  margin-left: 10px;
`;

export const Weather = () => {
  const [temp,setTemp] = useState('');
  const [city,setCity] = useState('');
  const [weather,setWeather] = useState('')

  useEffect(()=>{
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=en&appid=ddebca2ee6dc727880d481ae18479549")
      .then((res)=>res.json())
      .then(({name,main,weather})=>{
        setTemp(Math.round(main.temp));
        setCity(name);
        setWeather(weather[0].description)
      })
  },[]);

  return(
    <>
    <WeatherWidget>
      <Temperature>{temp}°С</Temperature>
      <City>{city}, <CurrentDate/></City>
      <Description>{weather}</Description>
    </WeatherWidget>
    </>
  )
}