import {api} from './api';
import {GEOCODE_API_KEY} from '../constants/secrets';

export const getCurrentLocationId = async (query: string) => {
  try {
    const data = {
      q: 'Tashkent',
      language: 'en_US',
    };

    const encoded = new URLSearchParams(data).toString();

    const response = await api.post('typeahead', encoded);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getNearbyRestaurants = async (location_id: string) => {
  try {
    const data = {
      location_id,
      language: 'en_US',
      currency: 'USD',
    };
    const encodedParams = new URLSearchParams(data).toString();

    const response = await api.post('search', encodedParams);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGeocode = async (coords: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${GEOCODE_API_KEY}&geocode=${coords.longitude},${coords.latitude}&lang=en_US&format=json`;

    const response = await fetch(url);
    const data = await response.json();
    return data?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject;
  } catch (error) {
    console.error(error);
  }
};
