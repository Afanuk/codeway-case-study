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
    console.log('Missing email or password')
    return
  }

  try {
    if (isSignUp.value) {
      console.log('Attempting to register...')
      await register(email.value, password.value)
    } else {
      console.log('Attempting to login...')
      await login(email.value, password.value)
    }
    console.log('Authentication successful, redirecting...')
    
    router.push('/redirect?redirect=/')
  } catch (err) {
    console.error('Authentication error:', err)
  }
}

const toggleMode = () => {
  console.log('toggleMode called, switching from', isSignUp.value ? 'Sign Up' : 'Sign In', 'to', !isSignUp.value ? 'Sign Up' : 'Sign In')
  isSignUp.value = !isSignUp.value
  error.value = null
}
</script>

<template>
  <div class="sign-in-page">
    <div class="sign-in-container">
      <div class="logo">
        <img class="logo-icon" src="/src/assets/icon.png" alt="Logo" ></img>
      </div>
      
      <h2>{{ isSignUp ? 'Create Account' : 'Please sign in' }}</h2>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="sign-in-form">
        <input 
          v-model="email"
          type="email" 
          placeholder="E-mail address" 
          class="form-input form-input-email"
          required 
        />
        <input 
          v-model="password"
          type="password" 
          placeholder="Password" 
          class="form-input form-input-password"
          required
        />
        
        <button 
          type="submit" 
          class="sign-in-button"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign in') }}
        </button>
      </form>

      <button 
        @click="toggleMode"
        class="toggle-button"
        type="button"
      >
        {{ isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up' }}
      </button>

      <div class="footer">
        Codeway © 2021
      </div>
    </div>
  </div>
</template>

<style scoped>
.sign-in-page {
  background: linear-gradient(180deg, #1a1930 0%, #161524 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 1rem;
}

.sign-in-container {
  padding: clamp(1.5rem, 5vw, 3rem);
  width: 90%;
  max-width: 25rem;
  min-width: 17.5rem;
  text-align: center;
  margin-top: -10%;
}

.logo {
  margin-bottom: 2rem;
}

.logo-icon {
  width: 15rem;
  height: 9.2rem;
  border-radius: 1rem;
  margin: 0 auto;
  position: relative;
  max-width: 100%;
}


h2 {
  color: rgb(70, 61, 112);
  margin-bottom: 1rem;
  font-weight: 400;
  font-size: 1.5rem;
}

.error-message {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.0625rem solid rgba(239, 68, 68, 0.2);
}

.sign-in-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.form-input {
  background:none;
  border: 0.0625rem solid rgb(70, 61, 112);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0;
  color: #ffffff;
  font-size: 1rem;
  width: 100%;
}

.form-input-email {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.form-input-password {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-bottom: 1rem;
}

.form-input::placeholder {
  color: #6b7280;
}

.form-input:focus {
  outline: none;
  border-color: #b32ca7;  
}

.sign-in-button {
  background: linear-gradient(45deg, #265299 0%, #4271bd 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}

.sign-in-button:hover:not(:disabled) {
  background: linear-gradient(45deg, #1a3d75 0%, #265299 100%);
}

.sign-in-button:disabled {
  background: #6b7280;
  cursor: not-allowed;
}

.toggle-button {
  background: transparent;
  color: #3b82f6;
  border: 0.0625rem solid #3b82f6;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 2rem;
  width: 100%;
}

.toggle-button:hover {
  background: #3b82f6;
  color: white;
}

.footer {
  color: #6b7280;
  font-size: 0.875rem;
}
</style>