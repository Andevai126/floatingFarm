<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <PostComponent />
  <LoginComponent />
</template>

<script>
import PostComponent from './components/PostComponent.vue'
import LoginComponent from './components/LoginComponent.vue'

export default {
  name: 'App',
  components: {
    PostComponent,
    LoginComponent
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
