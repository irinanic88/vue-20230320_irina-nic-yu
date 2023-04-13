import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      path: '/',
      alias: '/meetups',
      component: () => import('../views/PageMeetups.vue'),
      name: 'main',

    },
    {
      path: '/login',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageLogin.vue'),
      name: 'login',

    },
    {
      path: '/register',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageRegister.vue'),
      name: 'register',
    },
    {
      path: '/meetups/create',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageCreateMeetup.vue'),
      name: 'createMeetup',
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageEditMeetup.vue'),
      name: 'editMeetup',
    },
  ],
});

router.beforeEach((to) => {
  const authenticatedUser = isAuthenticated();

  if (to.meta.requireAuth && authenticatedUser) {
    return true;
  } else if (to.meta.requireAuth) {
    return { name: 'login', query: { from: to.path }};
  }

  if (to.meta.requireGuest && authenticatedUser) {
    return { name: 'main'};
  } else if (to.meta.requreGuest) {
    return true;
  }

  return true;
});

export { router };
