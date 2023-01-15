<template>
  <div>
    <template v-if="!dogs.length">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="margin: auto; background: #fff; display: block"
        width="300px"
        height="300px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <path
          fill="none"
          stroke="#416cff"
          stroke-width="7"
          stroke-dasharray="133.42624267578125 123.162685546875"
          d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
          stroke-linecap="round"
          style="transform: scale(1); transform-origin: 50px 50px"
        >
          <animate
            attributeName="stroke-dashoffset"
            repeatCount="indefinite"
            dur="0.7462686567164178s"
            keyTimes="0;1"
            values="0;256.58892822265625"
          ></animate>
        </path>
      </svg>
    </template>
    <template v-else>
      <GeneralSlider :sliderData="dogs" :sliderOptions="dogSliderConfig.dog" />
    </template>
    <div class="product_contener">
      <ProductCard
        v-for="(item, index) in products"
        :key="item.id"
        :product="item"
        :topSalePopular="isTopSale(index)"
      />
    </div>
  </div>
</template>

<script>
import GeneralSlider from "../components/elements/GeneralSlider.vue";
import ProductCard from "../components/elements/ProductCard.vue";
import sliderConfig from "../config/slider";
import { getCookie, setCookie } from "../helpers/cookie";
import { verifyImageFormat } from "../validations/regex";
import { storageKeys } from "../helpers/storageKeys";
import { URLs } from "../api/url";
import { fetchDogs, fetchProducts } from "../api/api";

export default {
  name: "gallary-view",
  components: {
    GeneralSlider,
    ProductCard,
  },

  data() {
    return {
      dogs: [],
      dogSliderConfig: sliderConfig,
      singleDogData: null,
      products: [],
    };
  },
  methods: {
    setCookie,
    getCookie,
    verifyImageFormat,
    fetchDogs,
    fetchProducts,
    async getDogImgUrl() {
      try {
        const result = await this.fetchDogs(URLs.RANDOM_DOG_URL);
        if (this.verifyImageFormat(result.data.url)) {
          this.singleDogData = null;
          this.getDogImgUrl();
        } else {
          this.singleDogData = result.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getProducts() {
      try {
        if (localStorage.getItem(storageKeys.localStorage.PRODUCTS)) {
          this.products = JSON.parse(
            localStorage.getItem(storageKeys.localStorage.PRODUCTS)
          );
        } else {
          const result = await this.fetchProducts(URLs.PRODUCTS_URL);
          this.products = result.data.products;
          localStorage.setItem(
            storageKeys.localStorage.PRODUCTS,
            JSON.stringify(result.data.products.slice(0, 20))
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    getDogsData() {
      if (!this.getCookie(storageKeys.cookies.DOGS)) {
        this.updateDogs();
      } else {
        this.dogs = JSON.parse(this.getCookie(storageKeys.cookies.DOGS));
      }
    },
    async updateDogs() {
      const dogsArr = [];
      while (dogsArr.length < 10) {
        await this.getDogImgUrl();
        if (this.singleDogData) {
          dogsArr.push(this.singleDogData);
          this.counter++;
        }
      }
      this.dogs = dogsArr;
      this.setCookie(
        storageKeys.cookies.DOGS,
        JSON.stringify(this.dogs),
        5 /*Minutes*/
      );
    },
    isTopSale(index) {
      return index < 3;
    },
  },
  created() {
    this.getDogsData();
    this.getProducts();
  },
};
</script>
<style lang="scss" scoped>
.product_contener {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
}
</style>
