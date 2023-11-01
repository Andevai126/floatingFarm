<template>
    <p>This is the NavBar component! Welcome {{ username }} ({{ roleTitle }})</p>
    <img alt="Vue logo" src="./../assets/logo.png">
    <Auth />
</template>

<script>
import Auth from './Auth.vue';
import { store } from './../store';

export default {
  name: 'NavBar',
  components: {
    Auth
  },
  data() {
    return {
      username: store.username,
      roleTitle: store.roleTitle
    };
  }
}

</script>