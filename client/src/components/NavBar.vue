<!-- for logo and login stuff and shows acount info -->
<template>
    <p>This is the NavBar component!</p>
    <img alt="Vue logo" src="./../assets/logo.png">
    <Auth />
</template>

<script>
import Auth from './Auth.vue'

export default {
  name: 'NavBar',
  components: {
    Auth
  }
}

</script>