<template>
  <div>
    <template v-if="!dogs.length"> Loading... </template>
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
