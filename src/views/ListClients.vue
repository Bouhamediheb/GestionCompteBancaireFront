<template>
  <div class="container mt-4">
    <h1 class="mb-4">Clients</h1>
    
    <div class="mb-3">
      <router-link to="/add-client" class="btn btn-primary">Créer un nouveau client</router-link>
    </div>

    <div class="mb-3">
      <input
        type="text"
        v-model="searchQuery"
        @input="searchClients"
        class="form-control"
        placeholder="Search clients by name..."
      />
      <ul v-if="suggestions.length" class="list-group mt-2">
        <li
          v-for="client in suggestions"
          :key="client.id"
          class="list-group-item"
          @click="selectClient(client)"
        >
          {{ client.nom }} {{ client.prenom }}
        </li>
      </ul>
    </div>

    <ul v-if="filteredClients.length" class="list-group">
      <li
        v-for="client in filteredClients"
        :key="client.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>ID:</strong> {{ client.id }}
          <strong>CIN:</strong> {{ client.cin }}
          <br />
          <strong>Name:</strong> {{ client.nom }} {{ client.prenom }}
        </div>
        <div>
          <button @click="editClient(client.id)" class="btn btn-warning btn-sm me-2">Edit</button>
          <button @click="confirmDelete(client.id)" class="btn btn-danger btn-sm me-2">Delete</button>
          <button @click="showLinkedComptes(client.id)" class="btn btn-info btn-sm">View Comptes</button>
        </div>
      </li>
    </ul>

    <p v-else class="text-center mt-4">Aucun client trouvé !</p>
    
    <sweet-modal ref="confirmDeleteModal" :blocking="true">
      <div class="text-center">
        <h5>Voulez-vous vraiment supprimer ce client ?</h5>
        <div class="mt-3">
          <button @click="deleteConfirmed" class="btn btn-danger me-2">Supprimer</button>
          <button @click="$refs.confirmDeleteModal.close()" class="btn btn-secondary">Annuler</button>
        </div>
      </div>
    </sweet-modal>
    
    <sweet-modal icon="success" ref="deletedClientAccount">
      <div class="mt-5">
        Client a été supprimé avec succès !
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import clientService from '../services/clientService';
import { SweetModal } from "sweet-modal-vue-3";

export default {
  components: {
    SweetModal,
  },
  data() {
    return {
      searchQuery: '',
      suggestions: [],
      selectedClient: null,
      clients: [],
    };
  },
  computed: {
    filteredClients() {
      return this.selectedClient ? [this.selectedClient] : this.clients;
    },
  },
  created() {
    this.fetchClients();
  },
  methods: {
    fetchClients() {
      clientService.findAll()
        .then(response => {
          this.clients = response.data;
        })
        .catch(error => {
          console.error('Error fetching clients:', error);
        });
    },
    searchClients() {
      if (!this.searchQuery) {
        this.suggestions = [];
        this.selectedClient = null;
        return;
      }

      clientService.search(this.searchQuery)
        .then(response => {
          this.suggestions = response.data;
        })
        .catch(error => {
          console.error('Error searching clients:', error);
        });
    },
    selectClient(client) {
      this.selectedClient = client;
      this.suggestions = [];
    },
    editClient(id) {
      this.$router.push({ name: 'EditClient', params: { id } });
    },
    confirmDelete(id) {
      this.selectedClient = this.clients.find(client => client.id === id);
      this.$refs.confirmDeleteModal.open();
    },
    deleteConfirmed() {
      clientService.delete(this.selectedClient.id)
        .then(() => {
          this.$refs.confirmDeleteModal.close();
          this.$refs.deletedClientAccount.open();
          setTimeout(() => {
            this.$refs.deletedClientAccount.close();
          }, 2000);
          setTimeout(() => {
            this.fetchClients();
          }, 2000);
        })
        .catch(error => {
          console.error('Error deleting client:', error);
        });
    },
    showLinkedComptes(id) {
      this.$router.push({ name: 'LinkedComptes', params: { id } });
    },
  },
};
</script>
