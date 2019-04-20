import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../page/GoodsList'
import Cart from '../page/Cart'
import Address from '../page/Address'
import AddressList from '../page/AddressList'
import OrderConfirm from '../page/OrderConfirm'
import OrderSuccess from '../page/OrderSuccess'
import OrderList from '../page/OrderList.vue'
import GoodsDetails from '../page/GoodsDetails'
import Home from '../page/Home'
import Policy from '../page/Policy'
import PolicyDetail from '../page/PolicyDetail'
import Announcement from '../page/Announcement'
import AnnouncementDetail from '../page/AnnouncementDetail'
import Working from '../page/Working'
import WorkingDetail from '../page/WorkingDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/home',
      name:'Home',
      component:Home
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
    },
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/goodsdetails',
      name: 'GoodsDetails',
      component: GoodsDetails
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/addresslist',
      name: 'AddressList',
      component: AddressList
    },
    {
      path: '/orderconfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderinfo',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
    {
      path: '/orderlist',
      name: 'OrderList',
      component: OrderList
    }
  ]
})
