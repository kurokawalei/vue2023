import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontLayout.vue'),
    children:[
      {
        path: 'home',
        component: () => import('../views/Front/HomeView.vue')
      },
      {
        path: 'about',
        component: () => import('../views/Front/AboutView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/Front/ProductsView.vue')
      },
      {
        path: 'carts',
        component: () => import('../views/Front/CartView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/Front/ProductView.vue')
      }
    ]

    
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
