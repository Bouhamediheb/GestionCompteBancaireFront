import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Optionally, import Bootstrap JS (if you're using features like dropdowns, modals, etc.)
import 'bootstrap';

createApp(App).use(router).mount('#app');
