import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import UserManage from '../components/UserManage.vue'
import DataManage from '../components/DataManage.vue'

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
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    redirect: '/admin/usermanage',
    children: [
      {
        path: 'usermanage',
        component: UserManage
      },
      {
        path: 'datamanage',
        component: DataManage
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
