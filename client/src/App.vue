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
  import { store } from './store';

  import NavBar from './components/NavBar.vue'
  import WelcomeCard from './components/WelcomeCard.vue'
  import GuestCard from './components/GuestCard.vue'
  import AdminCard from './components/adminPage/AdminCard.vue'
  import SupplierCard from './components/supplierPage/SupplierCard.vue';
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
    font-family: 'Roboto', sans-serif;
  }
</style>
