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
import Register from '../page/Register'
import Profile from '../page/profile/Profile'
import applystatus from '../page/profile/applystatus'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/profile/editor',
      name:'Editor',
      component:Editor
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
      path:'/profile/applystatus',
      name:'applystatus',
      component:applystatus
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path:'/profile',
      name:'Profile',
      component:Profile,
      // children: [{
      //   path:'applystatus',
      //   name:'applystatus',
      //   component:applystatus
      // }]
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
