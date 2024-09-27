<template>
  <div>
    <h1 class="mt-4 mb-4">Shopping Cart</h1>
    <div id="cart-items">
      <CartItem v-for="item in cartItems" :key="item.id" :item="item" />
    </div>
    <div class="text-end mt-4" id="checkout-buttons">
      <button class="btn btn-primary" id="checkout-btn" v-if="cartItems.length > 0" @click="navigateToCheckout">
        Proceed to Checkout
      </button>
      <button
        class="btn btn-secondary"
        id="continue-shopping-btn"
        v-if="cartItems.length === 0"
        @click="navigateToProducts"
      >
        Continue Shopping
      </button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../store";
import { computed } from "vue";
import { useRouter } from "vue-router";
import CartItem from "../components/CartItem.vue";

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.cartItems);

const navigateToCheckout = () => {
  router.push("/checkout");
};

const navigateToProducts = () => {
  router.push("/products");
};
</script>
