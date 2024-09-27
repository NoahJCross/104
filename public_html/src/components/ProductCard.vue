<template>
  <div class="card h-100 position-relative" :class="classes">
    <img :src="product.images[0]" class="card-img-top" :alt="product.title" />
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <div class="d-flex justify-content-between align-items-center">
        <div v-if="product.discount" class="position-absolute top-0 end-0 bg-warning px-2 py-1">
          <span>{{ product.discount }}% Off</span>
        </div>
        <h4 v-if="product.discount" class="text-decoration-line-through text-muted">${{ product.price }}</h4>
        <h4 v-if="product.discount">
          <strong>${{ (product.price * (1 - product.discount / 100)).toFixed(2) }}</strong>
        </h4>
        <h4 v-else>
          <strong>${{ product.price }}</strong>
        </h4>
        <a :href="`/product/${product.id}`" class="btn btn-outline-dark">View</a>
      </div>
      <p class="card-text">
        <small class="text-muted">{{ product.category.name }}</small>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
  classes: String,
});
</script>
