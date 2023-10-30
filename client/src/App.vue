<template>
  <NavBar />
  <WelcomeCard />
  <GuestCard />
  <AdminCard/>

  <!-- <GuestComponent />
  <div v-if="!loggedIn">
    <LoginComponent />
  </div>
  <div v-if="loggedIn">
    <LogoutComponent />
  </div> -->
</template>

<script>
import NavBar from './components/NavBar.vue'
import WelcomeCard from './components/WelcomeCard.vue'
import GuestCard from './components/GuestCard.vue'
import AdminCard from './components/AdminCard.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    WelcomeCard,
    GuestCard,
    AdminCard
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
