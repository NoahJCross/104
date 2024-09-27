<template>
  <div>
    <div id="product-view" v-if="product" class="row">
      <div class="col-lg-4 col-md-6">
        <div id="main-image" class="text-center mb-3">
          <img :src="product.images[activeImageIndex]" class="img-fluid" :alt="product.title" />
        </div>
        <div id="thumbnail-images" class="d-flex justify-content-between gap-2">
          <img
            v-for="(img, index) in product.images"
            :key="index"
            :src="img"
            class="thumbnail img-thumbnail"
            :class="{ active: index === activeImageIndex }"
            @click="changeImage(index)"
            style="width: 30%; cursor: pointer"
          />
        </div>
      </div>
      <div class="col-lg-8 col-md-6">
        <h1>{{ product.title }}</h1>
        <h4 class="text-muted">{{ product.category.name }}</h4>
        <div v-if="product.discount">
          <div class="d-flex gap-2">
            <h2 class="text-decoration-line-through text-muted">${{ product.price }}</h2>
            <h2>
              <strong>${{ (product.price * (1 - product.discount / 100)).toFixed(2) }}</strong>
            </h2>
          </div>
        </div>
        <div v-else>
          <h2>${{ product.price }}</h2>
        </div>
        <p>{{ product.description }}</p>
        <div class="text-end">
          <button class="btn btn-outline-dark btn-add-to-cart" @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>{{ errorMessage }}</p>
    </div>
    <div id="suggestions" class="row mt-5">
      <h3 class="mb-4">Products You May Like</h3>
      <div
        v-for="(product, index) in suggestedProducts"
        :key="product.id"
        :class="getProductCardContainerClasses(index)"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "../store";
import { useRoute } from "vue-router";
import ProductCard from "../components/ProductCard.vue";

const store = useStore();
const route = useRoute();

const product = ref(null);
const activeImageIndex = ref(0);
const errorMessage = ref("");

const getProducts = computed(() => store.products);

const suggestedProducts = computed(() => {
  if (!product.value) return [];
  return getProducts.value
    .filter((p) => p.category.name === product.value.category.name && p.id !== product.value.id)
    .slice(0, 6);
});

const fetchProductById = async () => {
  const productId = route.params.id;
  if (!productId) {
    errorMessage.value = "No product specified.";
    return;
  }
  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let fetchedProduct = await response.json();
    product.value = { ...fetchedProduct, quantity: 0 };
    if (!product.value) {
      errorMessage.value = "Product not found.";
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    errorMessage.value = "An error occurred while fetching the product.";
  }
};

const addToCart = (product) => {
  store.updateCart({ item: product, action: "add" });
};

const changeImage = (index) => {
  activeImageIndex.value = index;
};

const getProductCardContainerClasses = (index) => {
  return [
    "col-sm-6 col-md-4 col-lg-3 col-xxl-2 mb-4",
    index === 3 ? "d-sm-block d-md-none d-lg-block" : "",
    index >= 4 ? "d-none d-xxl-block" : "",
  ].join(" ");
};

onMounted(async () => {
  await fetchProductById();
});

onMounted(async () => {
  await store.fetchProducts();
});
</script>
