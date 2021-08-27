import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/DataImport',
    name: 'DataImport',
    component: () => import('@/views/DataImport.vue')
  },
  {
    path: '/ContactUs',
    name: 'ContactUs',
    component: () => import('@/views/ContactUs.vue')
  },
  {
    path: '/ProblemReport',
    name: 'ProblemReport',
    component: () => import('@/views/ProblemReport.vue')
  },
  {
    path: '/About',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
