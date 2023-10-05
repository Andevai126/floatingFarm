import { createApp } from 'vue'
import App from './App.vue'
import store from './store';

var app = createApp(App);

app.use(store);

app.mount('#app')
