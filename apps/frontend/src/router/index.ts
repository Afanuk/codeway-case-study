import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const Home = () => import('../pages/Home.vue')
const SignIn = () => import('../pages/SignIn.vue')
const Redirect = () => import('../pages/Redirect.vue')

export const router = createRouter({
  history: createWebHistory(), // clean URLs like /about (no #)
  routes: [
    { 
      path: '/', 
      name: 'Home', 
      component: Home,
      meta: { requiresAuth: true }
    },
    { path: '/SignIn', name: 'SignIn', component: SignIn },
    { path: '/redirect', name: 'Redirect', component: Redirect },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFound.vue') },
  ],
  scrollBehavior() { return { top: 0 } }
})

// Navigation guard to check authentication
router.beforeEach(async (to, from, next) => {
  const { user, isLoading } = useAuth()
  console.log('Navigating to:', to.fullPath, 'from:', from.fullPath, 'user:', user.value)

  // Wait for auth to finish loading
  let attempts = 0
  while (isLoading.value && attempts < 50) { // Max 2.5 seconds
    await new Promise(resolve => setTimeout(resolve, 50))
    attempts++
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !user.value) {
    // Redirect to redirect page, which will then redirect to SignIn
    next('/redirect?redirect=/SignIn')
  } else if (to.name === 'SignIn' && user.value) {
    // If user is already authenticated and tries to access SignIn, redirect to home
    next('/')
  } else {
    next()
  }
})
