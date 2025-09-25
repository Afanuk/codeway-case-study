<script setup lang="ts">
import { useAuth } from '../composables/useAuth'

const { user, logout, isLoading } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>

<template>
  <div class="home-page">
    <div v-if="isLoading" class="loading">
      Loading...
    </div>
    
    <div v-else-if="user" class="authenticated">
      <h1>Welcome, {{ user.email }}!</h1>
      <p>You are successfully signed in.</p>
      <button @click="handleLogout" class="logout-button">
        Sign Out
      </button>
    </div>
    
    <div v-else class="unauthenticated">
      <h1>Welcome to the Home Page</h1>
      <p>Please sign in to access your account.</p>
      <router-link to="/SignIn" class="sign-in-link">
        Go to Sign In
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
}

.loading {
  font-size: 18px;
  color: #666;
}

.authenticated h1,
.unauthenticated h1 {
  color: #333;
  margin-bottom: 1rem;
}

.authenticated p,
.unauthenticated p {
  color: #666;
  margin-bottom: 2rem;
}

.logout-button,
.sign-in-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover,
.sign-in-link:hover {
  background-color: #0056b3;
}
</style>