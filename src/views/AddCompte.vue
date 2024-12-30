<template>
    <div class="container mt-4">
      <h1 class="mb-4">Créer un compte bancaire pour un client</h1>
      <form @submit.prevent="createCompte" class="border p-4 rounded shadow-sm">
        
        <!-- Solde Input -->
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
  
        <!-- Client Selection -->
        <div class="mb-3">
          <label for="client" class="form-label">Sélectionner un client:</label>
          <select v-model="compte.clientId" class="form-select" id="client" required>
            <option v-for="client in clients" :key="client.id" :value="client.id">
              {{ client.nom }} {{ client.prenom }} (ID: {{ client.id }})
            </option>
          </select>
        </div>
  
        <!-- Submit Button -->
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
          clientId: '',  // Use clientId to link to the client
        },
        clients: [],  // List of clients to select from
      };
    },
    created() {
      console.log('Component created');
      this.fetchClients();  // Fetch the list of clients when the component is created
    },
    methods: {
      // Fetch the list of clients from the API
      fetchClients() {
        clientService.findAll()
          .then(response => {
            this.clients = response;  // Set the response to the clients array
            console.log('Clients loaded:', this.clients);  // Debug: check if clients are loaded properly
          })
          .catch(error => {
            console.error('Error fetching clients:', error);  // Log any error
          });
      },
  
      // Create a new compte and link it to a client
      createCompte() {
  const selectedClient = this.clients.find(client => client.id === this.compte.clientId);  // Get full client object from selected ID
 
  const newCompte = {
    solde: this.compte.solde,
    client: selectedClient,  // Pass the full client object
  };

  // Call the backend to save the compte
  compteService.save(newCompte)
    .then(() => {
      this.$router.push({ name: 'ListComptes' });  // Navigate back to the list of comptes
    })
    .catch(error => {
      console.error('Error creating compte:', error);
    });
}


    },
  };
  </script>
  

  