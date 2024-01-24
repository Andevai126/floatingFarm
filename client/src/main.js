import { createApp } from 'vue';
import App from './App.vue';
import { initializeMsal } from './msalConfig';

// Get Bootstrap classes
import 'bootstrap/dist/css/bootstrap.css';
// Get Bootstrap js for collapse in overviews
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);
app.mount('#app');

initializeMsal();

// The order of create app and init msal does not matter,
// but init msal is slower, so this order feels more logical