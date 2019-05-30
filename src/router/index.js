import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/Home'
import Policy from '../page/Policy'
import PolicyDetail from '../page/PolicyDetail'
import Announcement from '../page/Announcement'
import AnnouncementDetail from '../page/AnnouncementDetail'
import Working from '../page/Working'
import WorkingDetail from '../page/WorkingDetail'
import Introduction from '../page/Introduction'
import Editor from '../page/profile/Editor'
import Login from '../page/Login'
import Apply from '../page/Apply'
import Register from '../page/Register'
import Profile from '../page/profile/Profile'
import ApplyStatus from '../page/profile/ApplyStatus'
import AuditStatus from '../page/profile/AuditStatus'
import SecondAuditStatus from '../page/profile/SecondAuditStatus'
import ReleaseManagement from '../page/profile/ReleaseManagement'
import HighProfile from '../page/profile/HighProfile'
import Admin from '../page/profile/Admin'
import Distribution from '../page/profile/Distribution'
import ModifyPassword from '../page/profile/ModifyPassword'
import Backup from '../page/profile/Backup'
import ConfigSystem from '../page/profile/ConfigSystem'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'/profile/configSystem',
      name:'EdiConfigSystemtor',
      component:ConfigSystem
    },
    {
      path:'/profile/editor',
      name:'Editor',
      component:Editor
    },
    {
      path:'/profile/backup',
      name:'Backup',
      component:Backup
    },
    {
      path:'/profile/modifypassword',
      name:'ModifyPassword',
      component:ModifyPassword
    },
    {
      path:'/profile/high',
      name:'HighProfile',
      component:HighProfile
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/profile/auditstatus',
      name:'AuditStatus',
      component:AuditStatus
    },
    {
      path:'/profile/secondauditstatus',
      name:'SecondAuditStatus',
      component:SecondAuditStatus
    },
    {
      path:'/profile/applystatus',
      name:'ApplyStatus',
      component:ApplyStatus
    },
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {
      path:'/profile',
      name:'Profile',
      component:Profile,
    },
    {
      path:'/profile/releasemanagement',
      name:'ReleaseManagement',
      component:ReleaseManagement,
    },
    {
      path:'/introduction',
      name:'Introduction',
      component:Introduction
    },
    {
      path:'/policy',
      name:'Policy',
      component:Policy
    },
    {
      path:'/policy/detail/:id',
      name:'PolicyDetail',
      component:PolicyDetail
    },   
    {
      path:'/profile/apply/:id/:title',
      name:'Apply',
      component:Apply
    },
    {
      path:'/profile/admin',
      name:'Admin',
      component:Admin
    },    {
      path:'/profile/distribution',
      name:'Distribution',
      component:Distribution
    },
    {
      path:'/announcement',
      name:'Announcement',
      component:Announcement
    },
    {
      path:'/announcement/detail/:id',
      name:'AnnouncementDetail',
      component:AnnouncementDetail
    },
    {
      path:'/working',
      name:'Working',
      component:Working
    },
    {
      path:'/working/detail/:id',
      name:'WorkingDetail',
      component:WorkingDetail
    }
  ]
})
