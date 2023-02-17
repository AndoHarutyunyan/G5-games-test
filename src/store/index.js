import Vue from "vue";
import Vuex from "vuex";
import { fetchDogs, fetchProducts } from "../api/api";
import { verifyImageFormat } from "../validations/regex";
import { URLs } from "../api/url";
import { storageKeys } from "../helpers/storageKeys";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dogs: [],
    products: [],
    singleDogData: null,
  },
  getters: {
    GET_PRODUCTS(state) {
      return state.products;
    },
    GET_SINGLE_DOG_DATA(state) {
      return state.singleDogData;
    },
    GET_DOGS(stete) {
      return stete.dogs;
    },
  },
  mutations: {
    SET_DOGS(state, payload) {
      state.dogs = payload;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_SINGLE_DOG_DATA(state, payload) {
      state.singleDogData = payload;
    },
  },

  actions: {
    async getDogImgUrl({ state, commit, dispatch }) {
      try {
        const result = await fetchDogs(URLs.RANDOM_DOG_URL);
        if (verifyImageFormat(result.data.url)) {
          commit("SET_SINGLE_DOG_DATA", null);
          dispatch("getDogImgUrl");
        } else {
          commit("SET_SINGLE_DOG_DATA", result.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getProducts({ state, commit }) {
      try {
        if (localStorage.getItem(storageKeys.localStorage.PRODUCTS)) {
          commit(
            "SET_PRODUCTS",
            JSON.parse(localStorage.getItem(storageKeys.localStorage.PRODUCTS))
          );
        } else {
          const result = await fetchProducts(URLs.PRODUCTS_URL);
          commit("SET_PRODUCTS", result.data.products);
          localStorage.setItem(
            storageKeys.localStorage.PRODUCTS,
            JSON.stringify(result.data.products.slice(0, 20))
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
