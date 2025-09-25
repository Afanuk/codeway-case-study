<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound'
})
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
}

.not-found h1 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.not-found a {
  color: #3498db;
  text-decoration: none;
}

.not-found a:hover {
  text-decoration: underline;
}
</style>