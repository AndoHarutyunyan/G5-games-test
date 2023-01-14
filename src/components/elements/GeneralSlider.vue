<template>
  <div class="wr_slider">
    <swiper
      :loop="sliderOptions.loop"
      :pagination="sliderOptions.pagination"
      :navigation="sliderOptions.navigation"
      :breakpoints="sliderOptions.breakpoints"
    >
      <swiper-slide
        v-for="(item, index) in sliderData"
        :key="index"
        class="custom_style"
      >
        <img :src="item?.url" class="img-fluid w-100 mx-auto" blank="true" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Navigation, Pagination } from "swiper";
import { SwiperCore, Swiper, SwiperSlide } from "swiper-vue2";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    sliderData: {
      type: Array,
      default: () => [],
    },
    sliderOptions: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.wr_slider {
  .custom_style {
    height: 300px;
  }
  .swiper-container {
    height: 350px;
  }
  .img-fluid {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .w-100 {
    width: 100%;
  }
}
</style>
