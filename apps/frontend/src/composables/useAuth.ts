import { ref, onMounted, onUnmounted } from 'vue'
import type { User } from 'firebase/auth'
import { onAuthStateChange, signIn, signUp, logOut } from '../firebase/auth'

// ✅ SHARED STATE - Created once, used everywhere
const user = ref<User | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// ✅ Initialize auth listener once
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

// ✅ Clean up when app unmounts
const cleanupAuth = () => {
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
    try {
      error.value = null
      await logOut()
    } catch (err: any) {
      error.value = err.message
    }
  }

  // ✅ Return the SAME shared state for all components
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