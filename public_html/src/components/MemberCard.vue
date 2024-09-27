<template>
  <div class="card h-100">
    <img :src="member.avatar" class="card-img-top" :alt="member.name" />
    <div class="card-body">
      <h5 class="card-title">{{ member.name }}</h5>
      <p class="card-text">{{ member.role }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  member: {
    type: Object,
    required: true,
  },
});
</script>
