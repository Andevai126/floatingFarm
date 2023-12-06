import { createApp } from 'vue';
import App from './App.vue';
import { initializeMsal } from './msalConfig';

import 'bootstrap/dist/css/bootstrap.css';
// Popper does not work anyway?
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);
app.mount('#app');

initializeMsal();