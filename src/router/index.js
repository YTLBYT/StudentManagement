import Vue from 'vue'
import VueRouter from 'vue-router'
import ListStudent from '../views/listStudent.vue'
import Login from '../views/login.vue';
import Layout from '../views/Layout.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/listStudent',
    //=========子路由========
    children: [
      //========学生列表========
      {
        path: 'listStudent',
        name: 'ListStudent',
        component: ListStudent
      },
      {
        path: 'addStudent',
        name: 'AddStudent',
        component: () => import('@/views/addStudent')
      },
      {
        path: 'editStudent',
        name: 'EditStudent',
        component: () => import('@/views/editStudent')
      },
    ]
  }
]

import Cookies from 'js-cookie';

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') next()
  const admin = Cookies.get("admin")
  if (!admin && to.path !== '/login') return next("/login")  // 强制退回到登录页面
  // 访问 /home 的时候，并且cookie里面存在数据，这个时候我就直接放行
  next()
})

export default router
