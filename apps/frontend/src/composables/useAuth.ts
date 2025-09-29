import { ref, onMounted, onUnmounted } from 'vue'
import type { User } from 'firebase/auth'
import { onAuthStateChange, signIn, signUp, logOut } from '../firebase/auth'

export const useAuth = () => {
  const user = ref<User | null>(null)
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  let unsubscribe: (() => void) | null = null

  onMounted(() => {
    // Listen to authentication state changes
    unsubscribe = onAuthStateChange((authUser) => {
      user.value = authUser
      isLoading.value = false
      console.log('Auth state changed:', authUser)
    })
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

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

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout
  }
}