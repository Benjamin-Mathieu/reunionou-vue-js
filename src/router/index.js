import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/inscription',
    component: () => import('../views/Inscription.vue')
  },
  {
    path: '/events',
    component: () => import('../views/Events.vue')
  },
  {
    path: '/profil',
    component: () => import('../views/Profil.vue')
  },
  {
    path: '/newMdp',
    component: () => import('../views/NewMdp.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
