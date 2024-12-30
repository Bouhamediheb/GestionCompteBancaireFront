import { createRouter, createWebHistory } from 'vue-router';
import ListClients from '../views/ListClients.vue';
import EditClient from '../views/EditClient.vue';
import ListComptes from '../views/ListComptes.vue';
import EditCompte from '../views/EditCompte.vue';
import AddCompte from '../views/AddCompte.vue';
import LinkedComptes from '../views/LinkedComptes.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },

  { path: '/edit-client/:id?', name: 'EditClient', component: EditClient },
  { path: '/comptes', name: 'ListComptes', component: ListComptes },
  { path: '/clients', name: 'ListClients', component: ListClients },

  { path: '/edit-compte/:id?', name: 'EditCompte', component: EditCompte },
  { path: '/add-compte', name: 'AddCompte', component: AddCompte },
  {
    path: '/comptes/:id', 
    name: 'LinkedComptes',
    component: LinkedComptes,
  },];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
