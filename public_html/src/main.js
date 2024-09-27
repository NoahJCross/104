import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useStore } from "./store";
import "./css/styles.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
const store = useStore();
store.initializeAuth();
store.initializeCart();

app.use(router);
app.mount("#app");
