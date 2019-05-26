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
import {
  Message
} from 'element-ui';
import "./assets/css/base.css"
import 'element-ui/lib/theme-chalk/index.css'

//ueditor文件
// import '../static/ue/ueditor.parse.min.js'
// import '../static/ue/ueditor.all.min.js'
// import '../static/ue/ueditor.config.js'
// import '../static/ue/lang/zh-cn/zh-cn.js'
//自定义指令
import './directives/'
//注册组件
import './components'
//注册element-ui
import elementUI from 'element-ui'
Vue.use(elementUI)
Vue.use(vueResource)
Vue.use(vueLazyLoad, {
  loading: "./static/loading-svg/loading-bars.svg" // 设置图片懒加载
})
Vue.use(infiniteScroll)
Vue.use(Base64)
Vue.config.productionTip = false

// 全局路由守卫
router.beforeResolve((to, from, next) => {
  //判断访问的页面是否为权限页面
  if (to.path.toLowerCase().indexOf('profile') > -1) {
    //进一步判断Vuex store中是否存有已登录信息
    if (!store.state.login) {
      Message.error('暂未登录，请您先登录')  
      //判断当前页面是否为登录页面，解决Vue-router 同路由不跳转限制 
      if(from.name === 'Login'){
        router.go(0)
      }else {
        //若用户未登录则跳转至登录页面
        router.push('/login')
      }
    }
  }
  //继续访问
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
