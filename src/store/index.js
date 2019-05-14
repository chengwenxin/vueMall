import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  isLogin: false,
  role:'',
  number:'',
  name:'',
  lastLoginTime:'',
}

export default new Vuex.Store({
  state,
  mutations: {
    // 登录
    login(state, isLogin) {
      state.isLogin = isLogin;
    },
    role(state,params){
      state.role = params.role;
      state.number = params.number;
      state.name = params.name;
    },
    lastLogin(state,time){
      state.lastLoginTime = time
    }

  }
})
