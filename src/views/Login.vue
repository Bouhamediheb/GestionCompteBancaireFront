<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="login-card p-5 shadow-lg rounded">
        <h1 class="text-center mb-4 text-primary">LOGIN</h1>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="username" class="form-label fw-semibold">username:</label>
            <input
              v-model="user.username"
              id="username"
              class="form-control border-2 rounded-pill px-4"
              type="username"
              placeholder="Enter username"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="password" class="form-label fw-semibold">Password:</label>
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
          <div class="text-center mt-5 pt-5">
            <h5>Bienvenue !</h5>
            <div class="mt-5 pt-5">
              <button @click="closeSuccessModal" class="btn btn-success">OK</button>
            </div>
          </div>
        </sweet-modal>
  
        <sweet-modal ref="failureModal" icon="error" :blocking="true">
          <div class="text-center mt-5 pt-5">
            <h5>Login Failed</h5>
            <div class="mt-5 pt-5">
              <button @click="closeFailureModal" class="btn btn-danger">OK</button>
            </div>
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
          password: ''
        }
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
            }, 5000);
          } else {
            this.$refs.failureModal.open();
          }
        } catch (error) {
          console.error('Error logging in:', error);
          this.$refs.failureModal.open();
        }
      },
      closeSuccessModal() {
        this.$refs.successModal.close();
      },
      closeFailureModal() {
        this.$refs.failureModal.close();
      }
    },
    components: {
      SweetModal
    }
  };
  </script>
  