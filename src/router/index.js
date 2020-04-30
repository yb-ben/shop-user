import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{title:'首页'},
    children: [
      {
        path:'',component:()=>import('../views/Main.vue'),
        meta:{title:'首页'},
      },
      {
        path: 'Cart',
        name:'Cart',
        component: () => import('../views/Cart.vue'),
        meta:{title:'购物车'}
      },
      {
        path: 'my',
        component: ()=>import('../views/My.vue'),
        meta:{title:'个人中心'}
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue'),
        meta:{title:'分类'}
      }
    ]
  },
  {
    path:'/order/result',
    name:'Result',
    component:()=>import('../views/Order/Result.vue'),
    meta:{
      title:'支付结果'
    }
  },
  {
      path:'/order/confirm',
      name:'ConfirmOrder',
      component:()=>import('../views/Order/Confirm.vue'),
      meta:{
        title:'确认订单'
      }
  },
  {
    path:'/order/payment',
    name:'Payment',
    component:()=>import('../views/Order/Payment.vue'),
    meta:{
      title:'收银台'
    }
  },
  {
    path:'/order/my',
    name:'MyOrder',
    component:()=>import('../views/Order/MyOrder.vue'),
    meta:{
      title:'我的订单'
    }
  },
  {
      path:'/addr/list',
      name:'Addr',
      component:()=>import('../views/User/Addr.vue'),
      meta:{
        title:'收货地址'
      }
  },
  {
    path:'/addr/add',
    name:'NewAddr',
    component:()=>import('../views/User/NewAddr.vue'),
    meta:{
      title:'收货地址'
    }
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('../views/Login/Login.vue'),
    meta:{
      title:'用户登录'
    }
  },
  {
    path:'/register/phone',
    name:'RegisterPhone',
    component:()=>import('../views/Login/Phone.vue'),
    meta:{title:'注册'}
  },
  {
    path:'/register/code',
    name:'RegisterCode',
    component:()=>import('../views/Login/Code.vue'),
    meta:{title:'注册'}
  },

  {
    path:'/goods/list',
    name:'GoodsList',
    component:()=>import('../views/Goods/List.vue'),
    meta:{title:'商品列表'},
  },
  {
    path:'/goods/:id',
    name:'GoodsDetail',
    component:()=>import('../views/Goods/Detail.vue'),

  }
]

const router = new VueRouter({
  routes
})

export default router
