<template>
  <div class="container mt-4">
    <h1 class="mb-4">{{ isEditMode ? 'Edit' : 'Create' }} Client</h1>
    <form @submit.prevent="submitForm" class="border p-4 rounded shadow-sm">
      
      <!-- CIN Input -->
      <div class="mb-3">
        <label for="cin" class="form-label">CIN:</label>
        <input
          v-model="client.cin"
          id="cin"
          class="form-control"
          :disabled="isEditMode"
          placeholder="Enter Client CIN"
          required
        />
      </div>
      
      <!-- First Name Input -->
      <div class="mb-3">
        <label for="nom" class="form-label">First Name:</label>
        <input
          v-model="client.nom"
          id="nom"
          class="form-control"
          placeholder="Enter First Name"
          required
        />
      </div>

      <!-- Last Name Input -->
      <div class="mb-3">
        <label for="prenom" class="form-label">Last Name:</label>
        <input
          v-model="client.prenom"
          id="prenom"
          class="form-control"
          placeholder="Enter Last Name"
          required
        />
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? 'Update Client' : 'Create Client' }}
        </button>
      </div>
    </form>
  </div>
</template>

  <script>
  import clientService from '../services/clientService';
  
  export default {
    data() {
      return {
        client: {
          cin: '',
          nom: '',
          prenom: '',
        },
        isEditMode: false,
      };
    },
    created() {
      const id = this.$route.params.id;
      if (id) {
        this.isEditMode = true;
        this.fetchClient(id);
      }
    },
    methods: {
      fetchClient(id) {
        clientService.findById(id).then(response => {
          this.client = response.data;
        });
      },
      submitForm() {
        if (this.isEditMode) {
          clientService.update(this.client.cin, this.client).then(() => {
            this.$router.push({ name: 'ListClients' });
          });
        } else {
          clientService.save(this.client).then(() => {
            this.$router.push({ name: 'ListClients' });
          });
        }
      },
    },
  };
  </script>
  