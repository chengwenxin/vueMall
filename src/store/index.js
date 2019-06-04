import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  // 登录状态
  login: window.sessionStorage.login,
  role:window.sessionStorage.role,
  number:window.sessionStorage.number,
  name:window.sessionStorage.name,
  lastLoginTime:window.sessionStorage.lastLoginTime,
  college:window.sessionStorage.college,
}

export default new Vuex.Store({
  state,
  mutations: {
    // 登录
    changeLogin(state, isLogin) {
      window.sessionStorage.setItem('login',isLogin)
      state.login = isLogin;
    },
    setBase(state,params){
      state.role = params.role;
      state.number = params.number;
      state.name = params.name;
      window.sessionStorage.setItem('role',params.role)
      window.sessionStorage.setItem('number',params.number)
      window.sessionStorage.setItem('name',params.name)
      if(params.college){
        state.college = params.college
        window.sessionStorage.setItem('college',params.college)
      }
    },
    lastLogin(state,time){
      state.lastLoginTime = time
    }

  }
})


