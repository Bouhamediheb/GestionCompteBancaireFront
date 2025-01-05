<template>
  <div class="container mt-4">
    <h1 class="mb-4">Comptes courants du client</h1>
    
    <div class="mb-3">
      <button @click="$router.push({ name: 'ListClients' })" class="btn btn-secondary">
        <i class="bi bi-arrow-left"></i> Retour

      </button>
    </div>

    <ul v-if="comptes.length" class="list-group">
      <li v-for="compte in comptes" :key="compte.rib" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>RIB:</strong> {{ compte.rib }}
        </div>
        <div>
          <strong>Solde:</strong> {{ compte.solde }} TND
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong></strong>
        </div>
        <div>
          <strong>Totale:</strong> {{ totalMoney }} TND
        </div>
      </li>
    </ul>
    

    
    <p v-else class="text-center mt-4">Aucun compte lié à ce client.</p>
  </div>
</template>

<script>
import compteService from '../services/compteService';
import clientService from '../services/clientService';

export default {
  data() {
    return {
      comptes: [], 
      totalMoney : 0
    };
  },
  created() {
    const clientId = this.$route.params.id; 
    this.fetchComptes(clientId); 
  },
  methods: {
    fetchComptes(clientId) {
      clientService.findLinkedComptes(clientId)
        .then(response => {
          this.comptes = response.data;
          this.totalMoney = this.comptes.reduce((acc, compte) => acc + compte.solde, 0);
          console.log('Fetched comptes:', this.comptes);  
        })
        .catch(error => {
          console.error('Error fetching comptes:', error); 
        });
    },
  },
};
</script>
