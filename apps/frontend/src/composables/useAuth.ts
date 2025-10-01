import { ref, onMounted, onUnmounted } from 'vue'
import type { User } from 'firebase/auth'
import { onAuthStateChange, signIn, signUp, logOut } from '../firebase/auth'

// global state - shared across all components using this composable
const user = ref<User | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Initialize auth listener once
let unsubscribe: (() => void) | null = null
let isInitialized = false

const initializeAuth = () => {
  if (isInitialized) return
  
  unsubscribe = onAuthStateChange((authUser) => {
    user.value = authUser
    isLoading.value = false
    console.log('Auth state changed:', authUser)
  })
  
  isInitialized = true
}

// Cleanup function to unsubscribe from auth listener
const cleanupAuth = () => {
  console.log('Cleaning up auth listener...')
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
    isInitialized = false
  }
}

export const useAuth = () => {
  // Initialize auth listener on first use
  if (!isInitialized) {
    initializeAuth()
  }

  const login = async (email: string, password: string) => {
    try {
      error.value = null
      isLoading.value = true
      await signIn(email, password)
    } catch (err: any) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const register = async (email: string, password: string) => {
    try {
      error.value = null
      isLoading.value = true
      await signUp(email, password)
    } catch (err: any) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    console.log('Attempting logout...')
    try {
      error.value = null
      await logOut()
    } catch (err: any) {
      error.value = err.message
    }
  }

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    cleanupAuth // Export cleanup function
  }
}