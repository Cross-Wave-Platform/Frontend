import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'
import UserManage from '../components/UserManage.vue'
import DataManage from '../components/DataManage.vue'
import store from '../store'

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
    component: () => import('@/views/Profile.vue'),
    meta: {
      authRequirement: 2
    }
  },
  {
    path: '/DataImport',
    name: 'DataImport',
    component: () => import('@/views/DataImport.vue'),
    meta: {
      authRequirement: 1
    }
  },
  {
    path: '/ContactUs',
    name: 'ContactUs',
    component: () => import('@/views/ContactUs.vue'),
    meta: {
      authRequirement: 3
    }
  },
  {
    path: '/ProblemReport',
    name: 'ProblemReport',
    component: () => import('@/views/ProblemReport.vue'),
    meta: {
      authRequirement: 3
    }
  },
  {
    path: '/About',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      authRequirement: 3
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    redirect: '/admin/usermanage',
    children: [
      {
        path: 'usermanage',
        component: UserManage,
        meta: {
          authRequirement: 1
        }
      },
      {
        path: 'datamanage',
        component: DataManage,
        meta: {
          authRequirement: 1
        }
      }
    ]
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShopCart.vue'),
    meta: {
      authRequirement: 2
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
    meta: {
      authRequirement: 2
    }
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

router.beforeEach((to, from, next) => {
  // console.log('to: ', to)
  // console.log('from: ', from)
  if (to.matched.some(record => record.meta.authRequirement)) {
    if (store.state.userdata.auth <= to.meta.authRequirement) {
      console.log('go in')
      next()
    } else {
      console.log('reject')
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router
