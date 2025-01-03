import { createRouter, createWebHistory } from 'vue-router';
import ListClients from '../views/ListClients.vue';
import EditClient from '../views/EditClient.vue';
import ListComptes from '../views/ListComptes.vue';
import EditCompte from '../views/EditCompte.vue';
import AddCompte from '../views/AddCompte.vue';
import LinkedComptes from '../views/LinkedComptes.vue';
import HomeView from '../views/HomeView.vue';
import AddClient from '../views/AddClient.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/add-client', name: 'AddClient', component: AddClient },
  { path: '/clients/edit/:id', name: 'EditClient', component: EditClient },
  { path: '/clients', name: 'ListClients', component: ListClients },
  { path: '/comptes', name: 'ListComptes', component: ListComptes },
  { path: '/edit-compte/:id?', name: 'EditCompte', component: EditCompte },
  { path: '/add-compte', name: 'AddCompte', component: AddCompte },
  { path: '/comptes/:id', name: 'LinkedComptes', component: LinkedComptes },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn'); 
  if (to.path !== '/login' && !isLoggedIn) {
    next('/login'); 
  } else {
    next(); 
  }
});

export default router;
