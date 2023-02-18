<template>
  <div>
    <template v-if="!GET_DOGS.length">
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
      <GeneralSlider
        :sliderData="GET_DOGS"
        :sliderOptions="dogSliderConfig.dog"
      />
    </template>
    <div class="product_contener">
      <ProductCard
        v-for="(item, index) in GET_PRODUCTS"
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
import { storageKeys } from "../helpers/storageKeys";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "gallary-view",
  components: {
    GeneralSlider,
    ProductCard,
  },

  data() {
    return {
      dogSliderConfig: sliderConfig,
    };
  },
  methods: {
    ...mapMutations(["SET_DOGS"]),
    ...mapActions(["getDogImgUrl", "getProducts"]),

    getDogsData() {
      if (!getCookie(storageKeys.cookies.DOGS)) {
        console.log(1111111111111);
        this.updateDogs();
      } else {
        console.log(getCookie(storageKeys.cookies.DOGS));
        this.SET_DOGS(JSON.parse(getCookie(storageKeys.cookies.DOGS)));
      }
    },
    async updateDogs() {
      const dogsArr = [];
      while (dogsArr.length < 10) {
        await this.getDogImgUrl();
        if (this.GET_SINGLE_DOG_DATA) {
          dogsArr.push(this.GET_SINGLE_DOG_DATA);
        }
      }
      this.SET_DOGS(dogsArr);
      setCookie(
        storageKeys.cookies.DOGS,
        JSON.stringify(this.GET_DOGS),
        5 /*Minutes*/
      );
    },
    isTopSale(index) {
      return index < 3;
    },
  },
  computed: {
    ...mapGetters(["GET_PRODUCTS", "GET_SINGLE_DOG_DATA", "GET_DOGS"]),
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
