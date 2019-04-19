// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import vueResource from 'vue-resource'
import vueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import Base64 from 'js-base64'
//自定义指令
import './directives/'
//注册组件
import './components'
//注册element-ui
import elementUI from 'element-ui'
Vue.use(elementUI)
Vue.use(vueResource)
Vue.use(vueLazyLoad,{
	loading:"./static/loading-svg/loading-bars.svg"  // 设置图片懒加载
})
Vue.use(infiniteScroll)
Vue.use(Base64)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
