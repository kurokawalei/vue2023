export default {
    props: ["id", "addTocart", "openModal"],
    data() {
      return {
        modal: {},
        qty: 1,
        tempProduct: {},
        apiUrl: "https://vue3-course-api.hexschool.io/v2/api/kurokawa2023",
      };
    },
    template: "#userProductModal",
    watch: {
      id() {
        // console.log("watch:", this.id);
        if (this.id) {
          axios
            .get(`${this.apiUrl}/product/${this.id}`)
            .then((res) => {
              this.tempProduct = res.data.product;

              this.modal.show();
            })
            .catch((err) => {
              console.log(err);
            
              
            });
        }
      },
    },
    methods: {
      hide() {
        this.modal.hide();
      },
    },
    mounted() {
      this.modal = new bootstrap.Modal(this.$refs.modal);
      this.$refs.modal.addEventListener("hidden.bs.modal", (event) => {
        this.openModal("");
        console.log(this);
        this.qty = 1;
       
      });
    },
  };