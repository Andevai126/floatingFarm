<template>
  <NavBar />
  <div v-if="!authenticated">
    <WelcomeCard />
  </div>
  <div v-else>
    <div v-if="roleId==1">
      <GuestCard />
    </div>
    <div v-if="roleId==2">
      <AdminCard/>
    </div>
    
  </div>
  

  <!-- <GuestComponent />
  <div v-if="!loggedIn">
    <LoginComponent />
  </div>
  <div v-if="loggedIn">
    <LogoutComponent />
  </div> -->
</template>

<script>
import { watch } from 'vue';
import { store } from './msalConfig';
import { callApi } from './apiConfig'

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
  setup() {
    watch(store.authenticated, async (newVal) => {
      if (newVal == true) {
        callApi("http://localhost:5000/api/website/getRole").then((response) => {
          store.roleId = response.data[0].ID;
          store.roleName = response.data[0].title;
          console.log(store.roleId);
        });
      }
    });
  },
  data() {
    return {
      authenticated: store.authenticated,
      roleId: store.roleId
    };
  },
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
