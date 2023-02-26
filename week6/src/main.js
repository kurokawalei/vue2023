import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

// import "./style.css";
import App from "./App.vue";
import router from "./router";
import "./assets/all.scss";
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App);

app.use(VueAxios,axios);
app.use(LoadingPlugin);
app.use(router);
app.mount("#app");
