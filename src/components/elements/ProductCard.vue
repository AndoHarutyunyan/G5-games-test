<template>
  <div class="wr_productCard" :class="{ card_decktop_height: isDeviceMobile }">
    <h3>{{ product.brand }}</h3>
    <div class="product">
      <div class="product_img">
        <img :src="product.thumbnail" alt="img" />
      </div>
      <div class="product_info">
        <ul>
          <li><span>title:</span>{{ product.title }}</li>
          <li><span>category:</span>{{ product.category }}</li>
          <li><span>discount:</span>{{ product.discountPercentage }}</li>
          <li><span>price:</span>{{ product.price }}</li>
          <li><span>rating:</span>{{ product.rating }}</li>
          <li :class="{ colorSoldOuth: !stockProduct }">
            <span>stock:</span
            >{{ stockProduct === 0 ? "Sold out" : stockProduct }}
          </li>
        </ul>
      </div>
    </div>
    <div class="description">{{ product.description }}</div>
    <ul v-if="topSalePopular" class="wr_topSalePopular">
      <li class="top">TOP</li>
      <li class="sale">SALE</li>
      <li class="popular">POPULAR</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["product", "topSalePopular"],
  data() {
    return {
      stockProduct: this.product.stock,
      timerId: "",
    };
  },
  methods: {
    generateRandomNumber(max) {
      return Math.floor(Math.random() * max) + 1;
    },
    decrementStock() {
      let sec = this.generateRandomNumber(4);

      this.timerId = setInterval(() => {
        if (this.stockProduct === 0) {
          clearInterval(this.timerId);
        } else {
          this.stockProduct -= 1;
        }
      }, sec * 1000);
    },
  },
  computed: {
    isDeviceMobile() {
      return window.navigator.userAgentData.mobile;
    },
  },
  created() {
    this.decrementStock();
  },
};
</script>

<style lang="scss" scoped>
.wr_productCard {
  position: relative;
  border: 1px solid #c3c3c3;
  padding: 10px;
  border-radius: 8px;
  margin: 10px;
  width: 300px;
  height: 300px;
  box-sizing: border-box;
  @media (max-width: 1042px) {
    width: 400px;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
  h3 {
    text-align: center;
    margin: 0 0 15px 0;
  }
  .product {
    display: flex;
    .product_img {
      width: 150px;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .product_info {
      margin-left: 10px;
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        li {
          margin-bottom: 7px;
          font-size: 14px;
          span {
            color: #c9c9c9;
            margin-right: 5px;
          }
        }
        .colorSoldOuth {
          color: red;
        }
      }
    }
  }
  .description {
    margin-top: 15px;
    font-size: 14px;
  }
  .wr_topSalePopular {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
    bottom: 5px;
    li {
      margin: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 20px;
      border-radius: 4px;
      color: white;
      font-size: 12px;
    }
    .top {
      background: green;
    }
    .sale {
      background: red;
    }
    .popular {
      background: lightblue;
    }
  }
}
.card_decktop_height {
  height: 350px;
}
</style>
