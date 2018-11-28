
import Vue from 'vue'
import App from './App'
import router from './routers'

import './icons/index.js'  // icon
import VuePrototype from "common-layer/utils/vue/VuePrototype.js"
import TokenUtil from "common-layer/utils/token/TokenUtil.js";
import Cookie from 'js-cookie'


Vue.prototype.$back = VuePrototype.back;
Vue.prototype.$token = TokenUtil;
Vue.prototype.$cookie = Cookie;

// 处理标题信息
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Template'
  next()
});

// 改写Axios相关的参数
import __axios_global from "common-layer/utils/http/global.js";
import AuthConst from "common-layer/consts/AuthConst.js";
__axios_global.AUTH_KEY = AuthConst.AuthKey.MEMBER;       //改写：存储Token的Key
__axios_global.BASE_URL = "http://www.mwt315.com";        //改写：API基础路径
__axios_global.api.authCallback = () => {                 //改写：调用API判断出Token失效时的处理函数
  // const signinUrl = `http://mobile.mwt315.com/mobile/views/admin.html#/login?redirect=` + encodeURIComponent(window.location.href);
  // window.location.href = signinUrl;
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
