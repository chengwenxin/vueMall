export default {
  data() {
    return {
      menu: [{
        label: '个人信息',
        path: '/profile'
      }, {
        label: '申请状态',
        path: '/profile/applystatus'
      }, {
        label: '发布信息',
        path: '/profile/editor'
      }]
    }
  },
  mounted(){
    this.menuList()
  },
  methods: {
    menuList() {
      if (this.$store.state.role === '学生' || this.$store.state.role === 'student') {
        this.menu= [{
            label: '个人信息',
            path: '/profile'
          }, {
            label: '申请状态',
            path: '/profile/applystatus'
          }]
      } else if (this.$store.state.role === '辅导员' || this.$store.state.role === 'instructor') {
        this.menu= [{
          label: '个人信息',
          path: '/profile'
        }, {
          label: '审核状态',
          path: '/profile/auditstatus'
        }, {
          label: '发布信息',
          path: '/profile/editor'
        }]
      } else if (this.$store.state.role === "学生处" || this.$store.state.role === 'staff') {
        this.menu= [{
          label: '个人信息',
          path: '/profile'
        }, {
          label: '复审状态',
          path: '/profile/secondauditstatus'
        }, {
          label: '发布信息',
          path: '/profile/editor'
        }]
      }
    }
  }
}
