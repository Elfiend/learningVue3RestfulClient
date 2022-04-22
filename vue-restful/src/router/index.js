import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/social',
      name: 'SocialLogin',
      component: () => import('../views/SocialLoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/resendemail',
      name: 'resendemail',
      component: () => import('../views/ResendEmailView.vue')
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: () => import('../views/ChangePassword.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/api/auth/email_verification/:uid/:token/',
      name: 'email_verification',
      component: () => import('../views/EmailVerification.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/', '/social',];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (to.path.includes('api/auth/email_verification')) {
    next();
    return;
  }
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
