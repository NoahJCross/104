<template>
  <header>
    <div id="navbar">
      <div id="nav-belt">
        <nav class="navbar bg-dark">
          <div id="navbar-container" class="navbar-grid">
            <a href="/" class="navbar-brand text-white">Noah's Shop</a>
            <form class="d-flex search-form" role="search" @submit.prevent="handleSearch">
              <input
                id="search"
                name="search"
                type="search"
                class="form-control me-2"
                placeholder="Search"
                aria-label="Search"
                v-model="searchQuery"
              />
              <button class="btn btn-secondary" type="submit"><i class="fas fa-search"></i></button>
            </form>
            <div id="buttons" class="d-flex gap-2">
              <button
                id="cart-btn"
                class="btn btn-outline-light d-flex gap-2 align-items-center"
                type="button"
                aria-label="Shopping Cart"
                @click="navigateToCart"
              >
                <i class="fas fa-shopping-cart"></i> <span id="cart-count">{{ cartCount }}</span>
              </button>
              <button
                id="signInButton"
                class="btn btn-outline-light text-nowrap"
                type="button"
                aria-label="Sign In"
                @click="navigateToAuthForm"
              >
                {{ isAuthenticated ? "Sign Out" : "Sign In" }}
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div id="nav-main" class="bg-dark-subtle container-fluid d-flex gap-2">
        <button
          id="nav-btn"
          class="btn d-flex gap-2 align-items-center"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          aria-label="Toggle Categories"
        >
          <i class="fas fa-bars"></i> <strong>Categories</strong>
        </button>
        <div class="nav navbar-expand-md flex-nowrap">
          <router-link class="nav-link nav-a text-dark" to="/">Home</router-link>
          <router-link class="nav-link nav-a text-dark" to="/products">Products</router-link>
          <router-link class="nav-link nav-a text-dark" to="/aboutus">About Us</router-link>
          <router-link class="nav-link nav-a text-dark" to="/contactus">Contact Us</router-link>
        </div>
      </div>
    </div>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
      <div class="offcanvas-header">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="nav nav-pills">
          <router-link
            class="nav-link nav-a text-dark w-100"
            :to="{ path: '/products', query: { category: 'Clothing' } }"
            >Clothing</router-link
          >
          <router-link
            class="nav-link nav-a text-dark w-100"
            :to="{ path: '/products', query: { category: 'Electronics' } }"
            >Electronics</router-link
          >
          <router-link
            class="nav-link nav-a text-dark w-100"
            :to="{ path: '/products', query: { category: 'Furniture' } }"
            >Furniture</router-link
          >
          <router-link class="nav-link nav-a text-dark w-100" :to="{ path: '/products', query: { category: 'Shoes' } }"
            >Shoes</router-link
          >
          <router-link
            class="nav-link nav-a text-dark w-100"
            :to="{ path: '/products', query: { category: 'Miscellaneous' } }"
            >Miscellaneous</router-link
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const searchQuery = ref("");
const isAuthenticated = computed(() => store.isAuthenticated);
const cartCount = computed(() => store.cartCount);

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    const currentPath = router.currentRoute.value.path;
    const currentQuery = router.currentRoute.value.query;

    if (currentPath === "/products") {
      router.push({
        path: "/products",
        query: {
          ...currentQuery,
          search: searchQuery.value,
        },
      });
    } else {
      router.push({
        path: "/products",
        query: { search: searchQuery.value },
      });
    }
  }
};

const navigateToCart = () => {
  router.push("/cart");
};

const navigateToAuthForm = () => {
  if (isAuthenticated.value) {
    store.logout();
  }
  router.push("/auth");
};
</script>
