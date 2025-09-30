<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const redirectTo = computed(() => route.query.redirect as string || '/')

// Watch for changes in redirectTo and navigate accordingly
watch(redirectTo, () => {
  setTimeout(() => {
    router.replace(redirectTo.value)  // Always use the redirect value
  }, 750)
}, { immediate: true })

const isAuthRedirect = computed(() => redirectTo.value === '/SignIn')
</script>

<template>
  <div class="redirect-page">
    <div class="redirect-container">
      <div class="logo">
        <img class="logo-icon" src="/src/assets/icon.png" alt="Logo" />
      </div>
      
      <div class="loading-content">
        <div class="spinner"></div>
        <h2 v-if="isAuthRedirect">Authentication Required</h2>
        <h2 v-else>Redirecting...</h2>
        <p v-if="isAuthRedirect">Please sign in to continue.</p>
        <p v-else>Please wait while we redirect you to your destination.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.redirect-page {
  background: var(--color-bg-gradient);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.redirect-container {
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.logo {
  margin-bottom: 3rem;
}

.logo-icon {
  width: 120px;
  height: auto;
  border-radius: 1rem;
  max-width: 100%;
}

.loading-content h2 {
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 1.75rem;
}

.loading-content p {
  color: var(--color-text-muted);
  font-size: 1rem;
  margin-bottom: 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(59, 130, 246, 0.3);
  border-left-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto 2rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .redirect-container {
    padding: 2rem 1rem;
  }
  
  .logo-icon {
    width: 80px;
  }
  
  .loading-content h2 {
    font-size: 1.5rem;
  }
  
  .loading-content p {
    font-size: 0.875rem;
  }
}
</style>