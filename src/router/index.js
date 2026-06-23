import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/',
    component: () => import('../views/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'news',
        name: 'News',
        component: () => import('../views/front/NewsView.vue')
      },
      {
        path: 'news/:news_id',
        name: 'New',
        component: () => import('../views/front/FullNews.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/AboutView.vue')
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: () => import('../views/front/FavoritesView.vue')
      },
      {
        path: 'tea-intro',
        name: 'TeaIntro',
        component: () => import('../views/front/TeaIntro.vue')
      },
      {
        path: 'category/:category',
        component: () => import('../views/front/CategoryView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/front/CartView.vue')
      },
      {
        path: 'order',
        component: () => import('../views/front/OrderView.vue')
      },
      {
        path: 'pay/:orderId',
        component: () => import('../views/front/PayView.vue')
      },
      {
        path: 'login',
        component: () => import('../views/front/LoginView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/admin/AdminHome.vue')
      },
      {
        path: 'products',
        component: () => import('../views/admin/AdminProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/AdminOrders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/AdminCoupons.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
