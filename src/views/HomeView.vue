<template>
    <div class="home-view text-center">
      <div class="container">
        <h1> Bienvenue à notre application de gestion de clients et de comptes bancaires</h1>
        <p class="lead">Vous pouvez gérer vos clients et leurs comptes bancaires en toute simplicité.</p>        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
    
  };

  </script>
  
  <style scoped>
  .home-view {
    margin-top: 50px;
  }
  
  h1 {
    font-size: 3rem;
    font-weight: bold;
    color: #343a40;
  }
  
  p.lead {
    font-size: 1.25rem;
    color: #6c757d;
  }
  
  ul {
    padding-left: 0;
  }
  
  ul li {
    margin: 10px 0;
  }
  
  ul li a {
    font-size: 1.1rem;
    text-decoration: none;
  }
  
  ul li a:hover {
    text-decoration: underline;
  }
  </style>
  