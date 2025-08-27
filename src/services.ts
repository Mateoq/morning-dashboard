import { Geo, Weather, Quote } from './types';

export function getGeoFromIP(ip: string): Promise<Geo | null> {
  if (!process.env.GEO_API_URL) {
    throw new Error('GEO_API_URL is not defined');
  }
  return fetch(`${process.env.GEO_API_URL}/json/${ip}`)
    .then((response) => response.json())
    .then((data: Geo) => {
      if (data.status === 'success') {
        return data;
      }
      throw new Error('Failed to fetch geolocation');
    })
    .catch((error) => {
      console.error('Error fetching geolocation:', error);
      return null;
    });
}

export function getWeather(lat: number, lon: number): Promise<Weather | null> {
  if (
    !process.env.NEXT_PUBLIC_WEATHER_API_URL ||
    !process.env.NEXT_PUBLIC_WEATHER_API_KEY
  ) {
    throw new Error('WEATHER API URL or key is not defined');
  }
  return fetch(
    `${process.env.NEXT_PUBLIC_WEATHER_API_URL}/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${lat},${lon}&aqi=no`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error('Failed to fetch weather data');
      }
      return data;
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      return null;
    });
}

export function getQuoteOfTheDay(): Promise<Quote | null> {
  if (
    !process.env.NEXT_PUBLIC_QUOTE_API_URL ||
    !process.env.NEXT_PUBLIC_QUOTE_API_KEY
  ) {
    throw new Error('QUOTE_API_URL or QUOTE_API_KEY is not defined');
  }
  return fetch(`${process.env.NEXT_PUBLIC_QUOTE_API_URL}`, {
    headers: {
      'X-Api-Key': process.env.NEXT_PUBLIC_QUOTE_API_KEY || '',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error('Failed to fetch quote');
      }
      return data[0];
    })
    .catch((error) => {
      console.error('Error fetching quote:', error);
      return null;
    });
}
