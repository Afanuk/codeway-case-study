<script setup lang="ts">
import { useAuth } from '../composables/useAuth'
import ParameterList from '../components/ParameterList.vue'

const { user, isLoading } = useAuth()
</script>

<template>
  <div class="home-page">
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
    
    <div v-else>
      <ParameterList />
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--color-bg-gradient);
  color: var(--color-text-primary);
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(59, 130, 246, 0.3);
  border-left-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>