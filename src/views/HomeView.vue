<template>
    <div class="home-view text-center">
      <div class="container">
        <h1>Welcome to the Bank Management System</h1>
        <p class="lead">Your one-stop solution to manage clients and accounts.</p>
        
        <div class="mt-4">
          <p>Get started by exploring the following:</p>
          <ul class="list-unstyled">
            <li>
              <router-link to="/clients" class="btn btn-primary">Manage Clients</router-link>
            </li>
            <li>
              <router-link to="/comptes" class="btn btn-primary mt-2">View Accounts</router-link>
            </li>
          </ul>
        </div>
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
  