import axios from "axios";

export function fetchDogs(url) {
  return axios.get(url);
}

export function fetchProducts(url) {
  return axios.get(url);
}
