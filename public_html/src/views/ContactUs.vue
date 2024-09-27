<template>
  <section class="mb-5">
    <h2 class="mb-4">Contact Us</h2>
    <div class="row">
      <div class="col-md-7">
        <h4>Get in Touch</h4>
        <div ref="contactFormContainer"></div>
        <div v-if="message" class="alert alert-info mt-3">
          {{ message }}
        </div>
        <div v-if="formData">
          <h2>Submitted Data:</h2>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, key) in formData" :key="key">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-5">
        <h4>Visit Us</h4>
        <p>125 Arthur Street, Bundoora<br />Melbourne, VIC 3083<br />Australia</p>
        <h4>Call Us</h4>
        <p>Phone: +123 456 789<br />Fax: +123 456 789</p>
        <h4>Email Us</h4>
        <p>
          Email: <a :href="`mailto:${email}`">{{ email }}</a
          ><br />
          Support: <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>
        </p>
        <div ref="mapElement" class="mt-4" style="height: 200px; width: 100%"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ContactForm from "../components/ContactForm.vue";
import { ref, onMounted, h, createApp } from "vue";

const email = "s223226235@deakin.edu.au";
const supportEmail = "s223226235@deakin.edu.au";

const mapElement = ref(null);
const formData = ref(null);
const message = ref("");
const contactFormContainer = ref(null);

const loadGoogleMaps = () => {
  if (!document.getElementById("google-maps")) {
    const script = document.createElement("script");
    script.id = "google-maps";
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCVsYarclI1Vwi3LB3OLrQ5NLAaeaOgXik&loading=async&callback=initMap&v=weekly&libraries=marker`;
    script.async = true;
    document.head.appendChild(script);
    window.initMap = initMap;
  } else {
    initMap();
  }
};

const initMap = async () => {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { Map } = await google.maps.importLibrary("maps");
  const location = { lat: -37.69836878712708, lng: 145.04627565473706 };

  const map = new Map(mapElement.value, {
    zoom: 12,
    center: location,
    mapId: "DEMO_MAP_ID",
  });

  const marker = new AdvancedMarkerElement({
    map,
    position: location,
    title: "Noah's Shop",
  });
};

const handleFormSubmit = async (submittedData) => {
  formData.value = submittedData;
  try {
    const response = await fetch("http://localhost:3000/contact/submitContactForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittedData),
    });

    if (response.ok) {
      message.value = "Form submitted successfully.";
    } else {
      const errorData = await response.json();
      message.value = `Error: ${errorData.error || "An error occurred."}`;
    }
  } catch (error) {
    message.value = `Network error: ${error.error || "An error occurred."}`;
  }
};

onMounted(() => {
  loadGoogleMaps();

  const formVNode = h(ContactForm, {
    onSubmitForm: handleFormSubmit,
  });

  const app = createApp(formVNode);
  app.mount(contactFormContainer.value);
});
</script>
