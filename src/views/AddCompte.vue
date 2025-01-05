<template>
  <div class="container mt-4">
    <h1 class="mb-4">Créer un compte bancaire pour un client</h1>
    <form @submit.prevent="createCompte" class="border p-4 rounded shadow-sm">

      <div class="mb-3">
        <label for="cin" class="form-label">CIN du client:</label>
        <input
          type="text"
          v-model="client.cin"
          class="form-control"
          id="cin"
          placeholder="Entrez le CIN du client"
          required
        />
      </div>


     

      <div class="mb-3">
        <label for="firstName" class="form-label">Prénom du client:</label>
        <input
          type="text"
          v-model="client.prenom"
          class="form-control"
          disabled
          id="firstName"
          placeholder="Remplissage automatique par CIN"
          required
        />
      </div>

      <div class="mb-3">
        <label for="lastName" class="form-label">Nom du client:</label>
        <input
          type="text"
          v-model="client.nom"
          class="form-control"
          disabled
          id="lastName"
          placeholder="Remplissage automatique par CIN"
          required
        />
      </div>

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
     
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Ajouter le compte</button>
      </div>
    </form>

    <sweet-modal ref="successModal" icon="success">
      <div class="mt-5">
        <h5>Compte bancaire créé avec succès !</h5>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import clientService from '../services/clientService';
import compteService from '../services/compteService';
import { SweetModal } from 'sweet-modal-vue-3';
import Compte from '../models/Compte';

export default {
  components: {
    SweetModal,
  },
  data() {
    return {
      compte: new Compte(null, 0, null),
      client: {
        prenom: '',
        nom: '',
        cin: '',
      },
      clients: [],
    };
  },
  created() {
    this.fetchClients();
  },
  methods: {
    fetchClients() {
      clientService.findAll()
        .then(response => {
          console.log('Clients:', response.data);
          this.clients = response.data;
          this.initializeAutocomplete();
        })
        .catch(error => {
          console.error('Error fetching clients:', error);
        });
    },

    initializeAutocomplete() {
      const clientCins = this.clients.map(client => {
        return {
          label: `${client.cin} - ${client.prenom} ${client.nom}`,
          value: client.cin
        };
      });

      $('#cin').autocomplete({
        source: clientCins,
        select: (event, ui) => {
          const selectedClient = this.clients.find(client => client.cin === ui.item.value);
          if (selectedClient) {
            this.client.cin = selectedClient.cin;
            this.client.prenom = selectedClient.prenom;
            this.client.nom = selectedClient.nom;
          }
        },
        minLength: 1,
      });
    },

    createCompte() {
      const selectedClient = this.clients.find(client => client.cin === this.client.cin);
      if (!selectedClient) {
        console.error('Client not found');
        return;
      }

      const newCompte = {
        solde: this.compte.solde,
        client: selectedClient,
      };

      compteService.save(newCompte)
        .then(() => {
          this.$refs.successModal.open();
          setTimeout(() => {
            this.$refs.successModal.close();
          }, 2000);
          setTimeout(() => {
            this.$router.push({ name: 'ListComptes' });
          }, 2000);
        })
        .catch(error => {
          console.error('Error creating compte:', error);
        });
    },

    closeSuccessModal() {
      this.$refs.successModal.close();
      this.$router.push({ name: 'ListComptes' });
    }
  }
};
</script>
<style >
.ui-autocomplete {
  max-height: 250px;
  overflow-y: auto;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
  padding: 4px 0;
  width: 50%; 
  box-sizing: border-box;
}

.ui-menu-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.ui-menu-item:hover {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  transform: scale(1.02);
}

.ui-state-focus {
  background-color: #00c1ff !important;
  color: white !important;
  font-weight: bold;
  transform: scale(1.05);
}

.ui-autocomplete .ui-state-active {
  background-color: #007bff !important;
  color: white;
}
</style>
