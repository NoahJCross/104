<template>
  <section class="mb-5 mt-5">
    <div class="row d-flex justify-content-center">
      <div id="auth-form" class="bg-dark text-white">
        <!-- Sign In Form -->
        <div v-if="isSignIn">
          <h2 class="mb-4">Sign In</h2>
          <form @submit.prevent="handleSignIn">
            <div class="mb-3">
              <label for="emailSignIn" class="form-label">Email address</label>
              <input type="email" class="form-control" id="emailSignIn" v-model="emailSignIn" required />
            </div>
            <div class="mb-3">
              <label for="passwordSignIn" class="form-label">Password</label>
              <input type="password" class="form-control" id="passwordSignIn" v-model="passwordSignIn" required />
            </div>
            <button type="submit" class="btn btn-outline-light">Sign In</button>
            <button type="button" class="btn btn-link" @click="toggleForm">Sign Up</button>
          </form>
        </div>

        <!-- Sign Up Form -->
        <div v-else>
          <h2 class="mb-4">Sign Up</h2>
          <form @submit.prevent="handleSignUp">
            <div class="mb-3">
              <label for="nameRegister" class="form-label">Full Name</label>
              <input type="text" class="form-control" id="nameRegister" v-model="nameRegister" required />
            </div>
            <div class="mb-3">
              <label for="emailRegister" class="form-label">Email address</label>
              <input type="email" class="form-control" id="emailRegister" v-model="emailRegister" required />
            </div>
            <div class="mb-3">
              <label for="passwordRegister" class="form-label">Password</label>
              <input type="password" class="form-control" id="passwordRegister" v-model="passwordRegister" required />
            </div>
            <button type="submit" class="btn btn-outline-light">Sign Up</button>
            <button type="button" class="btn btn-link" @click="toggleForm">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const isSignIn = ref(true);
const emailSignIn = ref("");
const passwordSignIn = ref("");
const nameRegister = ref("");
const emailRegister = ref("");
const passwordRegister = ref("");

const isAuthenticated = computed(() => store.isAuthenticated);

const toggleForm = () => {
  isSignIn.value = !isSignIn.value;
};

const handleSignIn = async () => {
  try {
    await store.login({
      email: emailSignIn.value,
      password: passwordSignIn.value,
    });
    if (isAuthenticated.value) {
      console.log("Login successful");
    }
    router.push("/");
  } catch (error) {
    console.error("Login failed", error);
  }
};

const handleSignUp = async () => {
  try {
    await store.register({
      name: nameRegister.value,
      email: emailRegister.value,
      password: passwordRegister.value,
    });
    toggleForm();
  } catch (error) {
    console.error("Registration failed", error);
  }
};
</script>
