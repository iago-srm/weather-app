import axios, {AxiosResponse} from 'axios';

export const autocompleteAPI = (input: string) => {
  const endpoint = axios.create(
    {
      baseURL: 'https://us-central1-weather-app-298719.cloudfunctions.net'
    }
  );
  return endpoint.get('autocomplete',
    {
      params: {
        input,
        language: 'pt-BR'
      }
    }
  );
}

export const placeDetailsAPI = (placeId: string) => {
  const endpoint = axios.create(
    {
      baseURL: 'https://us-central1-weather-app-298719.cloudfunctions.net'
    }
  );
  return endpoint.get('placedetails',
    {
      params: {
        place_id: placeId,
      }
    }
  );
}
7// https://openweathermap.org/current
export const openWeatherAPI = (args: {lat: number, lon: number, lang: string}): Promise<AxiosResponse> => {
  const endpoint = axios.create({baseURL: 'http://api.openweathermap.org'});
  
  return endpoint.get('data/2.5/weather',
    {
      params: {
        appid: '50cff947a3c3121166df7e0d4b775475',
        units: 'metric',
        lat: Math.round(args.lat * 100) / 100,
        lon: Math.round(args.lon * 100) / 100,
        lang: args.lang
      }
    },
   );
}