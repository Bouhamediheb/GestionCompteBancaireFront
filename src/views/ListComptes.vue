<template>
  <div class="container mt-4">
    <h1 class="mb-4">Comptes</h1>
    <div class="mb-3">
      <router-link to="/add-compte" class="btn btn-primary">Créer un nouveau compte</router-link>
    </div>

    <div class="mb-4">
      <input
        v-model="searchKey"
        class="form-control"
        type="text"
        placeholder="Rechercher par nom du client..."
      />
    </div>
    
    <ul class="list-group" v-if="filteredComptes.length">
      <li v-for="compte in filteredComptes" :key="compte.rib" class="list-group-item d-flex justify-content-between align-items-center" :id="compte.rib">
        <div>
          <strong>RIB:</strong> {{ compte.rib }}
          <br />
          <strong>Solde:</strong> {{ compte.solde }} TND
          <br />
          <strong>Client:</strong> 
          {{ compte.client?.nom || 'Unknown' }} 
          {{ compte.client?.prenom || 'Unknown' }} 
          (CIN: {{ compte.client?.cin || 'N/A' }})
        </div>
        
        <div>
          <button @click="editCompte(compte.rib)" class="btn btn-warning btn-sm me-2">Modifier</button>
          
          <button @click="confirmDelete(compte.rib)" class="btn btn-danger btn-sm me-2">Supprimer</button>

          <button @click="deleteCompteAjax(compte.rib)" class="btn btn-danger btn-sm">Supprimer(AJAX)</button>
      </div>
      </li>
    </ul>
    
    <p v-else class="text-center mt-4">Aucun compte trouvé </p>
    
    <sweet-modal ref="confirmDeleteModal" :blocking="true">
      <div class="text-center">
        <h5>Voulez-vous vraiment supprimer ce compte ?</h5>
        <div class="mt-3">
          <button @click="deleteConfirmed" class="btn btn-danger me-2">Supprimer</button>
          <button @click="$refs.confirmDeleteModal.close()" class="btn btn-secondary">Annuler</button>
        </div>
      </div>
    </sweet-modal>

    <sweet-modal icon="success" ref="deletedClientCompte">
      <div class="mt-5">
        <h5>Compte supprimé avec succès !</h5>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import compteService from '../services/compteService';
import { SweetModal } from 'sweet-modal-vue-3';
import $ from 'jquery'

export default {
  components: {
    SweetModal,
  },
  data() {
    return {
      comptes: [], 
      searchKey: '', 
      compteToDelete: null, 
    };
  },
  computed: {
    filteredComptes() {
      const key = this.searchKey.toLowerCase();
      return this.comptes.filter(compte => {
        const rib = typeof compte.rib === 'string' ? compte.rib.toLowerCase() : '';
        const clientName = typeof compte.client?.nom === 'string' && typeof compte.client?.prenom === 'string'
          ? `${compte.client.nom} ${compte.client.prenom}`.toLowerCase()
          : '';
        return rib.includes(key) || clientName.includes(key);
      });
    },
  },
  created() {
    this.fetchComptes(); 
  },
  methods: {
    fetchComptes() {
      compteService.findAll()
        .then(response => {
          this.comptes = response.data; 
          console.log('Comptes loaded:', this.comptes); 
        })
        .catch(err => {
          console.error('Error fetching comptes:', err);
        });
    },
    confirmDelete(rib) {
      this.compteToDelete = rib;
      this.$refs.confirmDeleteModal.open();
    },

    deleteConfirmed() {
      if (!this.compteToDelete) return;

      compteService.delete(this.compteToDelete)
        .then(() => {
          this.fetchComptes();
          this.$refs.confirmDeleteModal.close(); 
          this.compteToDelete = null;
          this.$refs.deletedClientCompte.open();
          setTimeout(() => {
            this.$refs.deletedClientCompte.close();
          }, 2000);
        })
        .catch(error => {
          console.error('Error deleting account:', error);
          this.$refs.confirmDeleteModal.close(); 
        });
    },

    deleteCompteAjax(rib) {
      console.log('Deleting account via AJAX:', rib);
      compteService.deleteAjax(rib)
        .then(() => {
          //remove the row with jquery
          $(`#${rib}`).remove();
          this.$refs.deletedClientCompte.open();
          setTimeout(() => {
            this.$refs.deletedClientCompte.close();
          }, 2000);
        })
        .catch(error => {
          console.error('Error deleting account via AJAX:', error);
        });
    },

    editCompte(rib) {
      this.$router.push({ name: 'EditCompte', params: { rib } });
    },
  },
};
</script>
