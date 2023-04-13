//import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

//import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
//import ContactCoach from './pages/requests/ContactCoach.vue';
//import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
//import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

//In order not to load all routes if pages are not visited
const CoachDetail  = () => import('./pages/coaches/CoachDetail.vue');
const ContactCoach  = () => import('./pages/requests/ContactCoach.vue');
const RequestsReceived  = () => import('./pages/requests/RequestsReceived.vue');
const UserAuth  = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach } // /coaches/c1/contact
      ]
    },

    //{ path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
    
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },

      beforeEnter: (_, _2, next) => {
        //const isAuth = store.getters.isAuthenticated
        let isCoach = store.getters['coaches/isCoach'];

        const userId = store.getters.userId;
        //console.log(userId)
        const coaches = [];

        (async () => {
          const response = await fetch(
            `https://find-a-coach-vuejs-app-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
          );
          const responseData = await response.json();
      
          if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
          }
      
          for (const key in responseData) {
            const coach = {
              id: key,
            };
            coaches.push(coach);
          }
      
          //console.log(coaches)
          console.log(coaches.some(coach => coach.id === userId));
          isCoach = coaches.some(coach => coach.id === userId);

          if (isCoach) {
            next('/coaches');
          } else {
            next();
          }

        })();


      },

    },

    { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
