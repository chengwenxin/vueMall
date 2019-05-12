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
      },{
        label: '发布管理',
        path: '/profile/releasemanagement'
      }]
    }
  },
  mounted(){
    this.menuList()
  },
  methods: {
    menuList() {
      console.log(localStorage.role)
      if (localStorage.role === '学生' || localStorage.role === 'student') {
        this.menu= [{
            label: '个人信息',
            path: '/profile'
          }, {
            label: '申请状态',
            path: '/profile/applystatus'
          }]
      } else if (localStorage.role === '辅导员' || localStorage.role === 'instructor') {
        this.menu= [{
          label: '个人信息',
          path: '/profile'
        }, {
          label: '审核状态',
          path: '/profile/auditstatus'
        }]
      } else if (localStorage.role === "学生处" || localStorage.role === 'staff') {
        this.menu= [{
          label: '个人信息',
          path: '/profile'
        }, {
          label: '复审状态',
          path: '/profile/secondauditstatus'
        }, {
          label: '发布信息',
          path: '/profile/editor'
        }, {
          label: '发布管理',
          path: '/profile/releasemanagement'
        }]
      }
    }
  }
}
