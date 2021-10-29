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
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '最新消息'
    }
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      title: '個人頁面',
      requiresAuth: true,
      authRequirement: 2
    }
  },
  {
    path: '/DataImport',
    name: 'DataImport',
    component: () => import('@/views/DataImport.vue'),
    meta: {
      title: '資料匯入',
      requiresAuth: true,
      authRequirement: 1
    }
  },
  {
    path: '/ContactUs',
    name: 'ContactUs',
    component: () => import('@/views/ContactUs.vue'),
    meta: {
      title: '聯繫我們',
      requiresAuth: true,
      authRequirement: 3
    }
  },
  {
    path: '/ProblemReport',
    name: 'ProblemReport',
    component: () => import('@/views/ProblemReport.vue'),
    meta: {
      title: '問題回報',
      requiresAuth: true,
      authRequirement: 3
    }
  },
  {
    path: '/About',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About',
      requiresAuth: true,
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
          title: '使用者權限管理',
          requiresAuth: true,
          authRequirement: 1
        }
      },
      {
        path: 'datamanage',
        component: DataManage,
        meta: {
          title: '資料權限管理',
          requiresAuth: true,
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
      title: '我的資料',
      requiresAuth: true,
      authRequirement: 2
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
    meta: {
      title: '資料查詢'
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userdata.auth <= to.meta.authRequirement) {
      // console.log('go in')
      next()
    } else {
      // console.log('reject')
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

const DEFAULT_TITLE = 'KIT System'
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  })
})
export default router
