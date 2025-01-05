<template>
  <div>
    <header class="bg-dark text-white p-3" v-if="isLoggedIn">
      <div class="container d-flex justify-content-between align-items-center">
        <h3 class="mb-0"> Gestion des Comptes Bancaires</h3>
        <nav>
          <ul class="list-unstyled d-flex mb-0">
            <li class="me-3"><router-link to="/" class="btn btn-primary">Accueil</router-link></li>
            <li class="me-3"><router-link to="/clients" class="btn btn-primary">Clients</router-link></li>
            <li><router-link to="/comptes" class="btn btn-primary">Comptes</router-link></li>
            <li class="ms-3">
              <button @click="logout" class="btn btn-danger" v-if="isLoggedIn">Déconnexion</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <header class="bg-dark text-white p-3" v-else>
      <div class="container d-flex justify-content-between align-items-center">
        <h3 class="mb-0"> Gestion des Comptes Bancaires</h3>
        <nav>
          <ul class="list-unstyled d-flex mb-0">
            <li><router-link to="/login" class="btn btn-primary">Connexion</router-link></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="container mt-4">
      <router-view />
    </main>

    <footer class="bg-dark text-white py-3 mt-5">
      <div class="container text-center">
        <p class="mb-0">&copy; Projet Spring Boot -- 2024 </p>
        <p class="mb-0">CHAABENE Jawhar</p>
        <p class="mb-0">BOUHAMED Iheb</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn')
    };
  },
  watch: {
    $route(to, from) {
      this.isLoggedIn = localStorage.getItem('isLoggedIn');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('isLoggedIn');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 100;
}

main {
  min-height: 80vh;
}

footer {
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
