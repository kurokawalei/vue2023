<template>
  <div class="text-center">
    <h2>產品列表</h2>
  </div>

  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td style="width: 200px">
          <div style="height: 100px; background-size: cover; background-position: center">
            <img :src="item.imageUrl" class="img-fluid" style="height: 100px; object-fit: cover" />
          </div>
        </td>
        <td>{{ item.title }}</td>
        <td>
          <del class="h6">原價 {{ item.origin_price }} 元</del>
          <div class="h5">現在只要 {{ item.price }} 元</div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <RouterLink class="btn btn-outline-secondary me-2" :to="`/product/${item.id}`">查看更多</RouterLink>

            <button type="button" class="btn btn-outline-secondary me-2" @click="addTocart(item.id, 1)">
              <i class="fas fa-spinner fa-pulse"></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <pageInfo :pagination="pagination" :get-products="getProducts"></pageInfo>
</template>

<script>
import pageInfo from "../../components/pageView.vue";
import { RouterLink } from "vue-router";

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      const loader = this.$loading.show({
        loader: "dots",
        color: "#fe0697",
      });

      this.$http(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;

          loader.hide();
        })
        .catch((er) => {
          console.log(er);
        });
    },

    addTocart(product_id, qty) {
      const data = {
        product_id,
        qty,
      };

      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          alert(`${res.data.message}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    RouterLink,
    pageInfo,
  },
  mounted() {
    this.getProducts();
    //  this.$loading.show();
  },
};
</script>
