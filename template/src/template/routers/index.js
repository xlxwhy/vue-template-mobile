
// const _import = require('./_import_' + process.env.NODE_ENV)
const _import = require('./_import')

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



export const constantRouterMap = [


  { path: '/home', name: "Home", component: _import('/home/Index.vue'), },
  { path: '/404', name: "NotFound", component: _import('/404/Index.vue'), },
  { path: '/', name: "Index", redirect: '/home', },
  { path: '*', name: "None", redirect: '/404', },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

