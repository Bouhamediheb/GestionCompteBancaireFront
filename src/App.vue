<template>
  <div>
    <header class="bg-dark text-white p-3">
      <div class="container d-flex justify-content-between align-items-center">
        <h1 class="mb-0">Bank Management System</h1>
        <nav>
          <ul class="list-unstyled d-flex mb-0">
            <li class="me-3"><router-link to="/" class="text-white text-decoration-none">Home</router-link></li>
            <li class="me-3"><router-link to="/clients" class="text-white text-decoration-none">Clients</router-link></li>
            <li><router-link to="/comptes" class="text-white text-decoration-none">Accounts</router-link></li>
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
};
</script>

<style scoped>
/* Add some styling for the header and footer */
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
