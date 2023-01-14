const sliderConfig = {
  dog: {
    loop: true,
    pagination: { clickable: true },
    navigation: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  },
};

export default sliderConfig;
