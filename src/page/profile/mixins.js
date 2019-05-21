export default {
  data() {
    return {
      menu:[],
    }
  },
  computed:{
    role(){
      return this.$store.state.role
    },
    menuc(){
      if (this.role === '学生' || this.role === 'student') {
        this.menu= [
          {
            label: '首页',
            path: '/'
          },{
            label: '个人信息',
            path: '/profile'
          }, {
            label: '修改密码',
            path: '/profile/modifypassword'
          },{
            label: '申请状态',
            path: '/profile/applystatus'
          },{
            label: '资助项目',
            path: '/policy'
          },{
            label: '退出登录',
            path: '/login'
          }]
      } else if (this.role === '辅导员' || this.role === 'instructor') {
        this.menu= [ {
          label: '首页',
          path: '/'
        },{
          label: '个人信息',
          path: '/profile/high'
        },{
          label: '初审管理',
          path: '/profile/auditstatus'
        },{
          label: '退出登录',
          path: '/login'
        }]
      } else if (this.role === "学生处" || this.role === 'staff') {
        this.menu= [{
          label: '首页',
          path: '/'
        },{
          label: '复审管理',
          path: '/profile/secondauditstatus'
        }, {
          label: '发布信息',
          path: '/profile/editor'
        }, {
          label: '发布管理',
          path: '/profile/releasemanagement'
        },{
          label: '个人信息',
          path: '/profile/high'
        },{
          label: '退出登录',
          path: '/login'
        }]
      }else {
        this.menu= [ {
          label: '首页',
          path: '/'
        },{
          label: '个人信息',
          path: '/profile/high'
        }, {
          label: '分配账户',
          path: '/profile/distribution'
        },{
          label: '退出登录',
          path: '/login'
        }]
      }
      return this.menu
    }
  }
}
