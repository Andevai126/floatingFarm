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
    <div v-if="roleId==3">
      <SupplierCard/>
    </div>
    <div v-if="roleId==4">
      <UnpackerCard/>
    </div>
    <div v-if="roleId==5">
      <FarmerCard/>
    </div>
  </div>
</template>

<script>
// import { watch } from 'vue';
import { store } from './store';
// import { callApi } from './apiConfig'

import NavBar from './components/NavBar.vue'
import WelcomeCard from './components/WelcomeCard.vue'
import GuestCard from './components/GuestCard.vue'
import AdminCard from './components/adminPage/AdminCard.vue'
import SupplierCard from './components/SupplierCard.vue';
import UnpackerCard from './components/UnpackerCard.vue';
import FarmerCard from './components/farmerPage/FarmerCard.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    WelcomeCard,
    GuestCard,
    AdminCard,
    SupplierCard,
    UnpackerCard,
    FarmerCard
  },
  // setup() {
  //   watch(store.authenticated, async (newVal) => {
  //     if (newVal == true) {
  //       callApi("http://localhost:5000/api/website/getRole").then((response) => {
  //         // console.log("response: ", response.data[0]);
  //         // console.log("before: ", store.roleId)
  //         store.roleId.value = response.data[0].ID;
  //         store.roleTitle.value = response.data[0].title;
  //         // console.log("after: ", store.roleId);

  //         console.log((store.msalInstance).getAccountByHomeId(store.accountId));
  //       });
  //     }
  //   });
  // },
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
