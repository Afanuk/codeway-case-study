<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { login, register, error, isLoading } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const isSignUp = ref(false)

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    return
  }

  try {
    if (isSignUp.value) {
      await register(email.value, password.value)
    } else {
      await login(email.value, password.value)
    }
    // Redirect to home page on successful authentication
    router.push('/')
  } catch (err) {
    console.error('Authentication error:', err)
  }
}

const toggleMode = () => {
  isSignUp.value = !isSignUp.value
  error.value = null
}
</script>

<template>
  <div class="sign-in-page">
    <h1>{{ isSignUp ? 'Sign Up' : 'Sign In' }}</h1>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <form @submit.prevent="handleSubmit">
      <input 
        v-model="email"
        type="email" 
        placeholder="Email" 
        class="search-input"
        required 
      />
      <input 
        v-model="password"
        type="password" 
        placeholder="Password" 
        class="search-input"
        required
      />
      
      <button 
        type="submit" 
        class="submit-button primary"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In') }}
      </button>
    </form>

    <button 
      @click="toggleMode"
      class="submit-button secondary"
      type="button"
    >
      {{ isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up' }}
    </button>
  </div>
</template>

<style scoped>
.sign-in-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.sign-in-page h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: 1px solid #f5c6cb;
}

.search-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.submit-button {
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button.primary {
  background-color: #007bff;
  color: white;
}

.submit-button.primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-button.primary:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.submit-button.secondary {
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.submit-button.secondary:hover {
  background-color: #007bff;
  color: white;
}

.submit-button:last-child {
  margin-bottom: 0;
}
</style>