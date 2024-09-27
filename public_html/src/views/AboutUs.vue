<template>
  <div>
    <section class="mb-5">
      <h2 class="mb-4">About Your Ecommerce Platform</h2>
      <p>
        Welcome to Your Ecommerce Platform, where shopping meets convenience and endless possibilities. As a global
        online marketplace, we bring together buyers and sellers from around the world, offering a diverse range of
        products and services.
      </p>
      <p>
        At Your Ecommerce Platform, we are dedicated to creating an inclusive and dynamic marketplace that caters to
        every shopper's needs. Whether you're looking for electronics, fashion, home goods, or unique handmade items,
        you'll find a wide selection at competitive prices.
      </p>
      <p>
        Our platform empowers sellers of all sizes – from independent artisans to established brands – to showcase their
        products to a global audience. We provide robust tools and support to help businesses grow and thrive in the
        digital economy.
      </p>
      <p>
        Customer satisfaction is at the heart of everything we do. We strive to deliver a seamless shopping experience
        with secure transactions, reliable customer support, and a user-friendly interface. Explore, shop, and connect
        with Your Ecommerce Platform today!
      </p>
    </section>
    <section class="mb-5">
      <h2 class="mb-4">Our Mission</h2>
      <p>
        At Your Ecommerce Platform, our mission is to empower individuals and businesses by providing a trusted online
        marketplace that promotes innovation, creativity, and economic growth. We aim to:
      </p>
      <ul>
        <li>Connect buyers and sellers worldwide through a seamless and secure platform.</li>
        <li>
          Support small businesses and artisans by providing them with a global platform to showcase their products.
        </li>
        <li>
          Offer a diverse range of products and services that cater to every customer's lifestyle and preferences.
        </li>
        <li>Deliver exceptional customer service and ensure a positive shopping experience for all users.</li>
        <li>Continuously innovate and evolve to meet the changing needs of our global community.</li>
      </ul>
    </section>
    <section class="mb-5">
      <h2 class="mb-4">Our Team</h2>
      <div class="d-flex gap-4" id="team-members">
        <MemberCard v-for="member in team" :key="member.id" :member="member" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useStore } from "../store";
import { onMounted, computed } from "vue";
import MemberCard from "../components/MemberCard.vue";

const store = useStore();

const team = computed(() => store.team);

onMounted(async () => {
  await store.fetchTeam();
});
</script>
