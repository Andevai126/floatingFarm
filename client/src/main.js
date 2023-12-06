import { createApp } from 'vue';
import App from './App.vue';
import { initializeMsal } from './msalConfig';

import 'bootstrap/dist/css/bootstrap.css';

const app = createApp(App);
app.mount('#app');

initializeMsal();