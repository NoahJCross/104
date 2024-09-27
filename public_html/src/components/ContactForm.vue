<template>
  <form @submit.prevent="handleSubmit" ref="contactForm">
    <div class="mb-3">
      <label for="fullName" class="form-label">Full Name</label>
      <input type="text" class="form-control" id="fullName" v-model.trim="form.fullName" />
      <div v-if="errors.fullName" class="error-message text-danger">{{ errors.fullName }}</div>
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email" v-model="form.email" />
      <div v-if="errors.email" class="error-message text-danger">{{ errors.email }}</div>
    </div>

    <div class="mb-3">
      <label for="phone" class="form-label">Phone Number</label>
      <input type="tel" class="form-control" id="phone" v-model="form.phone" />
      <div v-if="errors.phone" class="error-message text-danger">{{ errors.phone }}</div>
    </div>

    <div class="mb-3">
      <label> <input type="checkbox" v-model="form.agreeToTerms" /> Agree to terms and conditions </label>
      <div v-if="errors.agreeToTerms" class="error-message text-danger">{{ errors.agreeToTerms }}</div>
    </div>

    <div class="mb-3">
      <label>Preferred Contact Method</label>
      <div class="radio-container d-flex gap-2">
        <label> <input type="radio" value="email" v-model="form.contactMethod" /> Email </label>
        <label> <input type="radio" value="phone" v-model="form.contactMethod" /> Phone </label>
      </div>
      <div v-if="errors.contactMethod" class="error-message text-danger">{{ errors.contactMethod }}</div>
    </div>

    <div class="mb-3">
      <label for="subject">Subject</label>
      <select v-model="form.subject" class="form-control">
        <option disabled value="">Please select one</option>
        <option v-for="option in subjects" :key="option">{{ option }}</option>
      </select>
      <div v-if="errors.subject" class="error-message text-danger">{{ errors.subject }}</div>
    </div>

    <div class="mb-3">
      <label for="message" class="form-label">Message</label>
      <textarea class="form-control" id="message" v-model.trim="form.message" rows="5"></textarea>
      <div v-if="errors.message" class="error-message text-danger">{{ errors.message }}</div>
    </div>

    <button type="submit" class="btn btn-outline-dark mb-3">Submit</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  fullName: "",
  email: "",
  phone: "",
  agreeToTerms: false,
  contactMethod: "",
  subject: "",
  message: "",
});

const emit = defineEmits(["submitForm"]);

const subjects = ["General Inquiry", "Support", "Feedback", "Other"];
const errors = ref({});
const contactForm = ref(null);

const handleSubmit = () => {
  errors.value = {};

  const fields = {
    fullName: "Full Name is required",
    email: "Email is required",
    phone: "Phone number is required",
    agreeToTerms: "You must agree to the terms",
    contactMethod: "Please select a contact method",
    subject: "Please select a subject",
    message: "Message is required",
  };

  Object.keys(fields).forEach((field) => {
    if (!form.value[field]) {
      errors.value[field] = fields[field];
    }
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.value.email)) {
    errors.value.email = "Enter a valid email address.";
  }

  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(form.value.phone)) {
    errors.value.phone = "Enter a valid 10-digit phone number.";
  }

  if (Object.keys(errors.value).length === 0) {
    const formData = {
      fullName: form.value.fullName,
      email: form.value.email,
      phone: form.value.phone,
      agreeToTerms: form.value.agreeToTerms,
      contactMethod: form.value.contactMethod,
      subject: form.value.subject,
      message: form.value.message,
    };
    emit("submitForm", formData);
    contactForm.value.reset();
  }
};
</script>

<style scoped>
.radio-container {
  display: flex;
  gap: 1rem;
}
</style>
