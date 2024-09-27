import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import AboutUs from "./views/AboutUs.vue";
import AuthForm from "./views/AuthForm.vue";
import Cart from "./views/Cart.vue";
import ContactUs from "./views/ContactUs.vue";
import Product from "./views/Product.vue";
import Products from "./views/Products.vue";
import MainLayout from "./layouts/MainLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: Home, meta: { id: "home-page" } },
      { path: "/aboutus", component: AboutUs, meta: { id: "aboutus-page" } },
      { path: "/cart", component: Cart, meta: { id: "cart-page" } },
      { path: "/contactus", component: ContactUs, meta: { id: "contactus-page" } },
      { path: "/product/:id", component: Product, meta: { id: "product-page" } },
      { path: "/products", component: Products, meta: { id: "products-page" } },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [{ path: "", component: AuthForm, meta: { id: "auth-page" } }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
