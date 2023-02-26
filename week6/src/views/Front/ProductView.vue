<template>
  <div class="text-center">
    <h2>產品頁面(單)</h2>
  </div>

  <div class="imgBox text-center">
    <img :src="product.imageUrl" />
  </div>
  <div class="infoBox">
    <div class="title">
      {{ product.title }}
    </div>
    <div class="textMain">
      {{ product.content }}
    </div>
  </div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProduct() {
      const loader = this.$loading.show({
        loader: "dots",
        color: "#fe0697",
      });

      const id = this.$route.params.id;
      this.$http(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/product/${id}`).then((res) => {
        this.product = res.data.product;

        loader.hide();
      });
    },
  },
  mounted() {
    this.getProduct();
  },
  components: {},
};
</script>
