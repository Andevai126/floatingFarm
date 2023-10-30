import { createApp } from 'vue';
import App from './App.vue';
import { initializeMsal } from './msalConfig';

const app = createApp(App);
app.mount('#app');

initializeMsal();