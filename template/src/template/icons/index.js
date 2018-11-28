import Vue from 'vue'
import Icon from 'common-layer/ui/components/icon/Index.vue'// svg组件

// register globally
Vue.component('icon', Icon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('common-layer/ui/icons/svg', false, /\.svg$/)

requireAll(req)
