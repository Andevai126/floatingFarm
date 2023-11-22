<template>
  <div style="height: 200px; border: black solid 2px">
    <img alt="Vue logo" src="./../assets/logoWhiteOnBlack.jpg" style="float: left; height: 150px;">
    <div style="float: right; display: inline-block;">
      <p style="float: left;">{{ username }} ({{ roleTitle }})</p>
      <Auth />
    </div>
    <br>
  </div>
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