import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from './config'

// Sign up with email and password
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

// Listen to authentication state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  //Firebase's onAuthStateChanged returns an unsubscribe function
  return onAuthStateChanged(auth, callback)
}