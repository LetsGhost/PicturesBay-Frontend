<!-- src/components/ErrorAlert.vue -->
<template>
    <div v-if="message" class="error-alert">
      <p>Error: {{ message }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps<{
    message: string;
  }>();
  </script>
  
  <style scoped>
  .error-alert {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>