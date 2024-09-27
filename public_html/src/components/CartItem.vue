<template>
  <div class="card mb-3 horizontal-card">
    <button
      class="btn btn-danger remove-btn"
      @click="removeItem(item)"
      style="position: absolute; top: 10px; right: 10px"
    >
      Remove
    </button>
    <div class="d-flex align-items-center">
      <img
        :src="item.images[0]"
        class="img-fluid rounded-start me-3"
        :alt="item.title"
        style="max-height: 230px; width: auto"
      />
      <div class="card-body">
        <h5 class="card-title">{{ item.title }}</h5>
        <p class="card-text">Price: ${{ (item.price * item.quantity).toFixed(2) }}</p>
        <div class="input-group mb-3">
          <button class="btn btn-outline-secondary" type="button" @click="updateQuantity(item, 'decrement')">-</button>
          <input type="text" class="form-control quantity-input text-center" :value="item.quantity" readonly />
          <button class="btn btn-outline-secondary" type="button" @click="updateQuantity(item, 'increment')">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../store";

const props = defineProps({
  item: Object,
});

const store = useStore();

const removeItem = () => {
  store.updateCart({ item: props.item, action: "remove" });
};

const updateQuantity = (action) => {
  let updatedItem = { ...props.item };
  if (action === "increment") {
    updatedItem.quantity += 1;
  } else if (action === "decrement" && props.item.quantity > 1) {
    updatedItem.quantity -= 1;
  }
  store.updateCart({ item: updatedItem, action: "update" });
};
</script>
