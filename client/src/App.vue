<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <PostComponent />
  <div v-if="!loggedIn">
    <LoginComponent />
  </div>
  <div v-if="loggedIn">
    <LogoutComponent />
  </div>
</template>

<script>
import PostComponent from './components/PostComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import LogoutComponent from './components/LogoutComponent.vue'

export default {
  name: 'App',
  components: {
    PostComponent,
    LoginComponent,
    LogoutComponent
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
