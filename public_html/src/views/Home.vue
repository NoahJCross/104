<template>
  <div>
    <section id="featured" class="mb-4">
      <h2 class="mb-4">Featured Products</h2>
      <div id="featured-container" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        <div v-for="(product, index) in featuredProducts" :key="product.id">
          <ProductCard :product="product" :classes="getProductCardClasses(index)" />
        </div>
      </div>
    </section>
    <section id="best-sellers" class="mb-4">
      <h2 class="mb-3">Best Sellers</h2>
      <div id="best-sellers-container" class="products-container">
        <ProductCard v-for="product in bestSellers" :key="product.id" :product="product" />
      </div>
    </section>
    <section id="sales" class="mb-4">
      <h2 class="mb-3">Discounted Items</h2>
      <div id="discounts" class="products-container">
        <ProductCard v-for="product in discounts" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "../store";
import ProductCard from "../components/ProductCard.vue";

const store = useStore();

const getProducts = computed(() => store.products);

const featuredProducts = computed(() => {
  return getProducts.value.filter((product) => product.isFeatured);
});

const bestSellers = computed(() => {
  return getProducts.value.sort((a, b) => b.totalSold - a.totalSold).slice(0, 10);
});

const discounts = computed(() => {
  return getProducts.value.filter((product) => product.discount).slice(0, 10);
});

const getProductCardClasses = (index) => {
  if (index >= 6 && index < 8) return "d-none d-lg-block";
  if (index >= 8) return "d-none d-xl-block";
  return "";
};

onMounted(async () => {
  await store.fetchProducts();
});
</script>
