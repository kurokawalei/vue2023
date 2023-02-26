<template>
  <div class="text-center mt-3 mb-3">
    <h1>前台頁面</h1>
  </div>

  <!-- <router-link to="/home">Home</router-link> |
  <router-link to="/about">About</router-link>| -->
  <router-link to="/products">產品列表</router-link>|
  <router-link to="/carts">購物車</router-link>
  <hr />
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from "vue-router";

export default {
  components: {
    RouterView,
  },
};
</script>
