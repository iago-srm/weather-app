import * as React from "react";
import { couldStartTrivia } from "typescript";
import { placeDetailsAPI, openWeatherAPI } from './apis';
import {
  rainIntensityDecider,
  snowIntensityDecider,
  seasonDecider,
  thunderIntensityDecider,
  drizzleIntensityDecider
} from './weather-decider';

export interface coordinates {
  lat: number;
  lon: number;
}

interface weatherVisual {
  rainIntensity?: number;
  drizzleIntensity?: number;
  thunderIntensity?: number;
  cloudCover?: number;
  snowIntensity?: number;
  sunPosition?: number;
  windSpeed?: number;
}

interface infoPanel {
  localTime?: string;
  descriptions?: string[];
  temperature?: number;
  icons?: string[];
}
interface infoPanelDetails {
  feelsLike?: number;
  pressure?: number;
  humidity?: number;
  windSpeed?: number;
  sunrise?: string;
  sunset?: string;
}

interface WeatherContextState {
  locale: coordinates,
  setPlaceId: (arg: string) => void;
  season: string;
  weather: weatherVisual;
  placeId: string;
  infoPanel: infoPanel;
  infoPanelDetails: infoPanelDetails;
}

export const WeatherContext = React.createContext<WeatherContextState | undefined>(undefined);

interface WeatherProviderProps {
  initialPlaceId: string;
  children: JSX.Element | JSX.Element[];
}

export const WeatherProvider: React.FC<WeatherProviderProps> = (props: WeatherProviderProps) => {

  const [locale, setLocale] = React.useState<coordinates>(undefined);
  const [placeId, setPlaceId] = React.useState<string>(props.initialPlaceId);
  const [season, setSeason] = React.useState('summer');
  const [weather, setWeather] = React.useState<weatherVisual>(undefined);
  const [fetchError, setFetchError] = React.useState<string>(undefined);
  const [infoPanel, setInfoPanel] = React.useState<infoPanel>(undefined);
  const [infoPanelDetails, setInfoPanelDetails] = React.useState<infoPanelDetails>(undefined);

  // Local Time refers to the time in the city being displayed
  const getLocalTime = (timezone: number) => {
    const now = new Date();
    return new Date(now.getTime() + timezone * 1000).toISOString();
  };
  
  const getLocalSunTime = (sunTime: number, timezone: number) => {
    return new Date((sunTime + timezone) * 1000).toISOString();
  };

  const getDayFractionDegrees = (sunriseSec: number, sunsetSec: number, timezone: number) => {
    const localTimeMilSec = new Date().getTime() + timezone * 1000;
    // console.log('localTime:'+new Date(localTimeMilSec).toISOString());
    // console.log('sunrise:'+new Date(sunriseSec*1000).toISOString());
    if(localTimeMilSec < (sunriseSec + timezone) * 1000) {
      return 0;
    }
    const dayOffsetMilSec = localTimeMilSec - (sunriseSec + timezone) * 1000;
    const dayDurationMilSec = (sunsetSec - sunriseSec) * 1000;
    const sunDegrees = Math.ceil((dayOffsetMilSec / dayDurationMilSec) * 180);
    console.log(sunDegrees);
    if(sunDegrees > 180) 
      return 0;
    return sunDegrees;

  };

  React.useEffect(() => {
    const storedVarName = 'weatherApp-placeId';
    if(placeId) {
      setLocale(undefined);
      localStorage.setItem(storedVarName, placeId);
      placeDetailsAPI(placeId).then(newLocale => {
        setLocale({lat: newLocale.data.lat, lon: newLocale.data.lng});
        setPlaceId(undefined);
      }).catch(error => {
        console.log('error fetching details: '+error);
        setFetchError(error);
      });
    } 
    // else {
    //   const storedPlaceId = localStorage.getItem(storedVarName);
    //   if(storedPlaceId) {
    //     setPlaceId(storedPlaceId);
    //     setLocale(undefined);

    //   }
    // }
  }, [placeId]);

  React.useEffect(() => {
    if(locale) {
      const season = seasonDecider(locale);
      setSeason(season);
      const apiCall = () => {
        openWeatherAPI({lat: locale.lat, lon: locale.lon, lang: 'pt_br'}).then(res => {

          const weathers = res.data.weather;
          const descriptions: string[] = [];
          const icons: string[] = [];

          let info: infoPanel = {};
          let infoDetails: infoPanelDetails = {};
          let parsedWeather: weatherVisual = {};

          weathers.forEach((w: any) => {
            
            descriptions.push(w.description);
            icons.push(w.icon);
            
            const weatherString = w.id.toString();
            const group = weatherString[0]; // group is the first digit of the weather code
            
            let rainIntensity = 0;
            let thunderIntensity = 0;
            let drizzleIntensity = 0;
            let snowIntensity = 0;

            switch(group) {
              case '2':
              case '3':
              case '5': // rain
                rainIntensity = rainIntensityDecider(weatherString);
                if(rainIntensity) parsedWeather = {...parsedWeather, rainIntensity};
                thunderIntensity = thunderIntensityDecider(weatherString);
                if(thunderIntensity) parsedWeather = {...parsedWeather, thunderIntensity};
                drizzleIntensity = drizzleIntensityDecider(weatherString);
                if(drizzleIntensity) parsedWeather = {...parsedWeather, drizzleIntensity};
                break;
              case '6': // snow
                snowIntensity = snowIntensityDecider(weatherString);
                if(snowIntensity) parsedWeather = {...parsedWeather, snowIntensity};
                break;
            }
          });

          info = {
            localTime: getLocalTime(res.data.timezone),
            descriptions, 
            icons, 
            temperature: res.data.main.temp, 
          };
          infoDetails = {
            feelsLike: res.data.main.feels_like,
            windSpeed: res.data.wind.speed,
            humidity: res.data.main.humidity,
            pressure: res.data.main.pressure,
            sunrise: getLocalSunTime(res.data.sys.sunrise, res.data.timezone),
            sunset: getLocalSunTime(res.data.sys.sunset, res.data.timezone),
          }
          parsedWeather = {
            ...parsedWeather, 
            cloudCover: res.data.clouds.all,
            sunPosition: getDayFractionDegrees(res.data.sys.sunrise, res.data.sys.sunset, res.data.timezone),
            windSpeed: res.data.wind.speed,
          };

          console.log(res.data.name);
          console.log(JSON.stringify(res.data.sys));
          console.log(JSON.stringify(res.data.weather));
          console.log(JSON.stringify(parsedWeather));

          setInfoPanel(info);
          setInfoPanelDetails(infoDetails);
          setWeather(parsedWeather);
          setLocale(undefined);
        }).catch(error => {
          setFetchError(error);
          console.log(error);
        });
      }
      apiCall();
      // setInterval(apiCall, 10000);
    }
  }, [locale]);

  return (
    <WeatherContext.Provider value={{ 
      locale, 
      placeId, 
      setPlaceId, 
      season, 
      weather,
      infoPanel,
      infoPanelDetails
    }}>
      {props.children}
    </WeatherContext.Provider>
  );
}