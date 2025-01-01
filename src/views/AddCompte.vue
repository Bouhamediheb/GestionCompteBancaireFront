<template>
    <div class="container mt-4">
      <h1 class="mb-4">Créer un compte bancaire pour un client</h1>
      <form @submit.prevent="createCompte" class="border p-4 rounded shadow-sm">
        
        <div class="mb-3">
          <label for="solde" class="form-label">Solde:</label>
          <input
            type="number"
            v-model="compte.solde"
            class="form-control"
            id="solde"
            placeholder="Entrez le solde du compte"
            required
          />
        </div>
  
        <div class="mb-3">
          <label for="client" class="form-label">Sélectionner un client:</label>
          <select v-model="compte.clientId" class="form-select" id="client" required>
            <option v-for="client in clients" :key="client.id" :value="client.id">
              {{ client.nom }} {{ client.prenom }} (ID: {{ client.id }})
            </option>
          </select>
        </div>
  
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Ajouter le compte</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import clientService from '../services/clientService';
  import compteService from '../services/compteService';
  
  export default {
    data() {
      return {
        compte: {
          solde: 0,
          clientId: '', 
        },
        clients: [], 
      };
    },
    created() {
      console.log('Component created');
      this.fetchClients(); 
    },
    methods: {
      fetchClients() {
        clientService.findAll()
          .then(response => {
            this.clients = response; 
            console.log('Clients loaded:', this.clients); 
          })
          .catch(error => {
            console.error('Error fetching clients:', error); 
          });
      },
  
      createCompte() {
  const selectedClient = this.clients.find(client => client.id === this.compte.clientId); 
  const newCompte = {
    solde: this.compte.solde,
    client: selectedClient,  
  };

  compteService.save(newCompte)
    .then(() => {
      this.$router.push({ name: 'ListComptes' }); 
    })
    .catch(error => {
      console.error('Error creating compte:', error);
    });
}


    },
  };
  </script>
  

  