import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  /* 首页 */
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views//Index'),
    meta: {
      permissionAuth: 999
    }
  },
  /* 空白页 */
  {
    path: '/empty',
    name: 'Empty',
    component: () => import('@/views/abnormal/Empty')
  },
  /* 页面找不到 */
  {
    path: '*',
    name: 'Lost',
    component: () => import('@/views/abnormal/Lost')
  }
]

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
