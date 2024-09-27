<template>
  <div id="product-list" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
    <div v-for="product in filteredProducts" :key="product.id" class="col-md-4 mb-4">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "../store";
import { useRoute } from "vue-router";
import ProductCard from "../components/ProductCard.vue";

const store = useStore();
const route = useRoute();

const searchQuery = ref(route.query.search || "");
const categoryFilter = ref(route.query.category || "");

const getProducts = computed(() => store.products);

const filteredProducts = computed(() => {
  const searchQueryLower = searchQuery.value.toLowerCase();
  const categoryFilterLower = categoryFilter.value.toLowerCase();
  return getProducts.value.filter((product) => {
    const matchesSearchQuery = searchQueryLower
      ? product.title.toLowerCase().includes(searchQueryLower) ||
        product.description.toLowerCase().includes(searchQueryLower)
      : true;
    const matchesCategory = categoryFilterLower ? product.category.name.toLowerCase() === categoryFilterLower : true;
    return matchesSearchQuery && matchesCategory;
  });
});

const fetchProducts = async () => {
  await store.fetchProducts();
};

onMounted(async () => {
  await fetchProducts();
});

watch(
  () => route.query.search,
  (newVal) => {
    searchQuery.value = newVal || "";
  }
);

watch(
  () => route.query.category,
  (newVal) => {
    categoryFilter.value = newVal || "";
  }
);
</script>
