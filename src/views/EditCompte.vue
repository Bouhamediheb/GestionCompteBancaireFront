<template>
  <div class="container mt-4">
    <h1 class="mb-4">{{ isEditMode ? 'Edit' : 'Create' }} Account</h1>
    <form @submit.prevent="submitForm" class="border p-4 rounded shadow-sm">
      
      <div class="mb-3">
        <label for="rib" class="form-label">RIB:</label>
        <input
          v-model="compte.rib"
          id="rib"
          class="form-control"
          :disabled="isEditMode"
          placeholder="Enter RIB"
          required
        />
      </div>
      
      <div class="mb-3">
        <label for="solde" class="form-label">Solde:</label>
        <input
          v-model="compte.solde"
          id="solde"
          class="form-control"
          type="number"
          placeholder="Enter Solde"
          required
        />
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? 'Update Account' : 'Create Account' }}
        </button>
      </div>
    </form>
  </div>
</template>

  <script>
  import compteService from '../services/compteService';
  
  export default {
    data() {
      return {
        compte: {
          rib: '',
          solde: '',
        },
        isEditMode: false,
      };
    },
    created() {
      const id = this.$route.params.id;
      if (id) {
        this.isEditMode = true;
        this.fetchCompte(id);
      }
    },
    methods: {
      fetchCompte(id) {
        compteService.findById(id).then(response => {
          this.compte = response.data;
        });
      },
      submitForm() {
        if (this.isEditMode) {
          compteService.update(this.compte.rib, this.compte).then(() => {
            this.$router.push({ name: 'ListComptes' });
          });
        } else {
          compteService.save(this.compte).then(() => {
            this.$router.push({ name: 'ListComptes' });
          });
        }
      },
    },
  };
  </script>
  