import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://worldwide-restaurants.p.rapidapi.com/',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'a193bbc212msh2dc12a52e30a6bdp16d5c8jsn156c3add2dbd',
    'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
  },
});
