import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Viajes from '../views/Viajes.vue'
import store from '@/store/index.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/viajes',
    name: 'Viajes',
    component: Viajes
  },
  {
    path: '/rutas',
    name: 'Rutas',
    component: () => import(/* webpackChunkName: "rutas" */ '../views/Rutas.vue')
  },
  {
    path: '/nosotros',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'CreateUser',
    component: () => import(/* webpackChunkName: "register" */ '../views/CreateUser.vue')
  },
  {
    path: '/reserva',
    name: 'Reserva',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "reserva" */ '../views/Reserva.vue')
  },
  {
    path: '/resumen',
    name: 'Resumen',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "resumen" */ '../views/Resumen.vue')
  },
  {
    path: '/perfil',
    redirect: '/personal-info',
    name: 'Perfil',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "perfil" */ '../views/Perfil.vue'),
    children: [
      {
        path: '/personal-info',
        name: 'PersonalInfo',
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "personalInfo" */ '../views/PersonalInfo.vue')
      },
      {
        path: '/reservas-personales',
        name: 'ReservasPersonales',
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "reservasPersonales" */ '../views/ReservasPersonales.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import(
      /* webpackChunkName: "NotFoundPage"*/
      "../views/NotFound.vue"
    )
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = 'OVERIDE - ' + to.name;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.isLoged) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router
