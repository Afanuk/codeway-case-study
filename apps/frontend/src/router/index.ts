import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue')
const SignIn = () => import('../pages/SignIn.vue')

export const router = createRouter({
  history: createWebHistory(), // clean URLs like /about (no #)
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/SignIn', name: 'SignIn', component: SignIn },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFound.vue') },
  ],
  scrollBehavior() { return { top: 0 } }
})
