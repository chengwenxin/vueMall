export default {
  data() {
    return {
      menu: [{
        label: '个人信息',
        path: '/profile'
      }]
    }
  },
  mounted(){
    this.menuList()
  },
  computed:{
    role(){
      return this.$store.state.role
    }
  },
  methods: {
    menuList() {
      if (this.role === '学生' || this.role === 'student') {
        this.menu= [{
            label: '个人信息',
            path: '/profile'
          }, {
            label: '申请状态',
            path: '/profile/applystatus'
          }]
      } else if (this.role === '辅导员' || this.role === 'instructor') {
        this.menu= [{
          label: '个人信息',
          path: '/profile/high'
        }, {
          label: '初审管理',
          path: '/profile/auditstatus'
        }]
      } else if (this.role === "学生处" || this.role === 'staff') {
        this.menu= [{
          label: '个人信息',
          path: '/profile/high'
        }, {
          label: '复审管理',
          path: '/profile/secondauditstatus'
        }, {
          label: '发布信息',
          path: '/profile/editor'
        }, {
          label: '发布管理',
          path: '/profile/releasemanagement'
        }]
      }else {
        this.menu= [{
          label: '个人信息',
          path: '/profile/high'
        }, {
          label: '分配账户',
          path: '/profile/distribution'
        }]
      }
    }
  }
}
