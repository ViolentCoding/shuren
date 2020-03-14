import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRouterMap = [{
  path: '/login',
  component: (resolve) => require(['@/views/login/index'], resolve),
  hidden: true
},
{
  path: '/register',
  component: (resolve) => require(['@/views/register/index'], resolve),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/search',

  children: [{
    path: '/search',
    name: 'search',
    component: resolve => require(['@/views/search/search'], resolve),
    meta: {
      title: '搜索精英',
      icon: 'search'
    }
  }]
},
{
  path: '/jianli',
  component: Layout,
  redirect: '/resume',
  children: [{
    path: '/resume',
    name: 'resume',
    component: (resolve) => require(['@/views/resume/resume'], resolve),
    meta: {
      title: '简历库',
      icon: 'resume'
    }
  }

  ]
},
{
  path: '/huobi',
  component: Layout,
  redirect: '/currency',
  children: [{
    path: '/currency',
    name: 'currency',
    component: (resolve) => require(['@/views/currency/currency'], resolve),
    meta: {
      title: '简历币',
      icon: 'currency'
    }
  }

  ]
},
{
  path: '/info',
  component: Layout,
  redirect: '/information',
  children: [{
    path: '/information',
    name: 'information',
    component: (resolve) => require(['@/views/information/myInfo'], resolve),
    meta: {
      title: '我的资料',
      icon: 'mine'
    }
  }

  ]
}

]
export const lastRouter = [
  {
    path: '/404',
    component: (resolve) => require(['@/views/404'], resolve),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表

export const asyncRouterMap = [

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  console.log('reset router')
}

export default router
