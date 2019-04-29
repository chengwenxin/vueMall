import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  isLogin: false,
  role:''
}

export default new Vuex.Store({
  state,
  mutations: {
    // 登录
    login(state, isLogin) {
      state.isLogin = isLogin;
    },
    role(state,role){
      state.role = role;
    }
  }
})
