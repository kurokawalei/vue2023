<template>
  <div class="text-center">
    <h2>購物車</h2>
  </div>
  <div class="text-end">
    <button class="btn btn-outline-danger" type="button" @click="delCartAll">清空購物車</button>
  </div>

  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cartList.carts">
        <tr v-for="item in cartList.carts" :key="item.id">
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="delCart(item.id)">
              <i class="fas fa-spinner fa-pulse"></i>
              x
            </button>
          </td>

          <td>
            {{ item.product.title }}
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-1 mt-1">
                <select class="form-select" v-model="item.qty" @change="editCart(item)">
                  <option v-for="i in 30" :key="`${i}qq`" :value="i">{{ i }}</option>
                </select>
                <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
              </div>
            </div>
          </td>
          <td class="text-start">
            <span class="me-5"> {{ item.product.price }}元</span>
            <small class="text-success">折扣價：</small>
            {{ item.final_total }}元
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cartList.total }}元</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cartList.final_total }}元</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      cartList: [],
    };
  },
  methods: {
    getCarList() {
      const loader = this.$loading.show({
        loader: "dots",
        color: "#fe0697",
      });

      this.$http(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`).then((res) => {
        this.cartList = res.data.data;
        loader.hide();
      });
    },
    delCart(id) {
      const loader = this.$loading.show({
        loader: "dots",
        color: "#fe0697",
      });

      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${id}`)
        .then((res) => {
          alert(`${res.data.message}`);
          loader.hide();
          this.getCarList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editCart(item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };

      this.$http
        .put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
        .then((res) => {
          alert(`${res.data.message}`);
          this.getCarList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delCartAll(){

        this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
         
          alert(`${res.data.message}`);
          this.getCarList();
        })
        .catch((err) => {
          console.log(err);
        });

    }
  },
  mounted() {
    this.getCarList();
  },
};
</script>
