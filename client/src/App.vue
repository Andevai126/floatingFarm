<template>
  <!-- The navigation bar is always visible -->
  <NavBar />
  <div v-if="!authenticated">
    <WelcomePage />
  </div>
  <div v-else>
    
    <div v-if="roleId==1">
      <GuestPage />
    </div>
    <div v-if="roleId==2">
      <AdminPage/>
    </div>
    <div v-if="roleId==3">
      <SupplierPage/>
    </div>
    <div v-if="roleId==4">
      <UnpackerPage/>
    </div>
    <div v-if="roleId==5">
      <FarmerPage/>
    </div>
    <div v-if="roleId==6">
      <PresenterPage/>
    </div>
    <!-- Note that a v-else is not used for integrity -->
    <div v-if="roleId==7">
      <DriverPage/>
    </div>

  </div>
</template>

<script>
  import { store } from './store';

  import NavBar from './components/cards/nav/NavBar.vue';
  import WelcomePage from './components/pages/WelcomePage.vue';

  import GuestPage from './components/pages/GuestPage.vue';
  import AdminPage from './components/pages/AdminPage.vue';
  import SupplierPage from './components/pages/SupplierPage.vue';
  import UnpackerPage from './components/pages/UnpackerPage.vue';
  import FarmerPage from './components/pages/FarmerPage.vue';
  import PresenterPage from './components/pages/PresenterPage.vue';
  import DriverPage from './components/pages/DriverPage.vue';

  export default {
    name: 'App',
    components: {
      NavBar,
      WelcomePage,

      GuestPage,
      AdminPage,
      SupplierPage,
      UnpackerPage,
      FarmerPage,
      PresenterPage,
      DriverPage
    },
    data() {
      return {
        authenticated: store.authenticated,
        roleId: store.roleId
      };
    },
  }
</script>
