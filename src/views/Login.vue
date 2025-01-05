<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="login-card p-5 shadow-lg rounded">
      <h1 class="text-center mb-4 text-primary">Authentication</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="form-label fw-semibold">Nom d'utilisateur:</label>
          <input
            v-model="user.username"
            id="username"
            class="form-control border-2 rounded-pill px-4"
            type="text"
            placeholder="Enter Username"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="form-label fw-semibold">Mot de passe:</label>
          <input
            v-model="user.password"
            id="password"
            class="form-control border-2 rounded-pill px-4"
            type="password"
            placeholder="Enter Password"
            required
          />
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary btn-lg rounded-pill w-100">Login</button>
        </div>
      </form>

      <sweet-modal ref="successModal" icon="success" :blocking="true">
        <div class="text-center mt-5">
          <h5>Authentication réussie</h5>
         
        </div>
      </sweet-modal>

      <sweet-modal ref="failureModal" icon="error" :blocking="true">
        <div class="text-center mt-5">
          <h5>Vérifiez vos informations de connexion</h5>
          
        </div>
      </sweet-modal>
    </div>
  </div>
</template>

<script>
import loginService from '@/services/loginService';
import { SweetModal } from 'sweet-modal-vue-3';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await loginService.login(this.user);
        if (response.status === 200) {
          this.$refs.successModal.open();
          setTimeout(() => {
            this.$router.push('/');
          }, 2000);
        } else {
          this.$refs.failureModal.open();
        }
      } catch (error) {
        console.error('Error logging in:', error);
        this.$refs.failureModal.open();
      }
    },
  },
  components: {
    SweetModal,
  },
};
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 450px;
  background-color: #fff;
  border-radius: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
}

input.form-control {
  height: 45px;
  font-size: 1rem;
}

button {
  font-size: 1.1rem;
  padding: 10px 0;
}

.sweet-modal-container {
  padding: 0;
  width: 300px;
}

.sweet-modal-content {
  border-radius: 10px;
  background-color: #f8f9fa;
}

.sweet-modal-footer {
  display: flex;
  justify-content: center;
}
</style>
