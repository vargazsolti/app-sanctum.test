import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Login from '@/pages/auth/Login.vue'
import Dashboard from '@/pages/Dashboard.vue'

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { public: true } },
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/submenu1', name: 'submenu1', component: Dashboard, meta:{requiresAuth:true}},
  { path: '/submenu2', name: 'submenu2', component: Dashboard, meta:{requiresAuth:true}},
  { path: '/submenu3', name: 'submenu3', component: Dashboard, meta:{requiresAuth:true}},
  { path: '/submenu4', name: 'submenu4', component: Dashboard, meta:{requiresAuth:true}},
  { path: '/submenu5', name: 'submenu5', component: Dashboard, meta:{requiresAuth:true}},
  
  { path: '/othersubmenu1', name: 'othersubmenu1', component: Dashboard, meta:{requiresAuth:true}},
  { path: '/othersubmenu2', name: 'othersubmenu2', component: Dashboard, meta:{requiresAuth:true}},



    // új stubok
  { path: '/notifications', name: 'notifications', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/settings', name: 'settings', component: Dashboard, meta: { requiresAuth: true } },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!to.meta.public && to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  }
  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
