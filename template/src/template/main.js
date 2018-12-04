
import Vue from 'vue'
import App from './App'
import router from './routers'

import './icons/index.js'  // icon
import Cookie from 'js-cookie'
Vue.prototype.$cookie = Cookie;

{{#useCommonLayer }}
import VuePrototype from "common-layer/utils/vue/VuePrototype.js"
import TokenUtil from "common-layer/utils/token/TokenUtil.js";
Vue.prototype.$token = TokenUtil;
Vue.prototype.$back = VuePrototype.back;
{{/useCommonLayer }}
// 处理标题信息
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Template'
  next()
});

// 改写Axios相关的参数

{{#useCommonLayer }}
import __axios_global from "common-layer/utils/http/global.js";
import AuthConst from "common-layer/consts/AuthConst.js";
{ { else } }
import __axios_global from "#/utils/http/global.js";
import AuthConst from "#/consts/AuthConst.js";
{{/useCommonLayer }}
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
