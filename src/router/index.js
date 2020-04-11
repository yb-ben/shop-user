import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path:'',component:()=>import('../views/Main.vue')
      },
      {
        path: 'test',
        component: () => import('../views/Test.vue')
      },
      {
        path: 'my',
        component: ()=>import('../views/My.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('../views/Login/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
