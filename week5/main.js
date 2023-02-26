import productModal from "./modal.js";
import page from "./pages.js";

Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

//外層
const app = Vue.createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2/api/kurokawa2023",
      products: [],
      cartList: [],
      productId: "",
      qty: "",
      isloading: "",
      pagination: {},
      componentLoading:false,
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      this.componentLoading = true;
      axios
        .get(`${this.apiUrl}/products/?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.componentLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openModal(id) {
      this.productId = id;
      // console.log(id);
    },
    addTocart(product_id, qty) {
      // console.log(product_id, qty);

      const data = {
        product_id,
        qty,
      };

      this.isloading = product_id;

      axios
        .post(`${this.apiUrl}/cart`, { data })
        .then((res) => {
          alert(`${res.data.message}`);
          this.$refs.pmodal.hide();
          this.getcartList();
          this.isloading = "";
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

      this.isloading = item.id;
      axios
        .put(`${this.apiUrl}/cart/${item.id}`, { data })
        .then((res) => {
          alert(`${res.data.message}`);

          this.getcartList();
          this.isloading = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getcartList() {
      axios
        .get(`${this.apiUrl}/cart`)
        .then((res) => {
          this.cartList = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delCart(id) {
      this.isloading = id;

      axios
        .delete(`${this.apiUrl}/cart/${id}`)
        .then((res) => {
          this.isloading = "";
          alert(`${res.data.message}`);
          this.getcartList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delAll() {
      axios
        .delete(`${this.apiUrl}/carts`)
        .then((res) => {
          this.isloading = "";
          alert(`${res.data.message}`);
          this.getcartList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    send() {
      const order = this.form;
      axios
        .post(`${this.apiUrl}/order`, { data: order })
        .then((res) => {
          alert(res.data.message);

          //重置表單+購物車列表

          this.getcartList();
          this.$refs.form.resetForm();
        })
        .catch((er) => {
          alert(er.data.message);
        });
    },
  },

  mounted() {
    this.getProducts();
    this.getcartList();
  },
  components: {
    productModal,
    page,
  },
});

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);
console.log(VueLoading);

app.component('loading', VueLoading.Component);

//  app.component('loading' , VueLoading.Component);

app.mount("#app");
