<template>
    <h1>Log out</h1>
    <form @submit.prevent="logout">
        <button class="logout" type="submit">Log out</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: 'LogoutComponent',
    methods: {
        async logout() {
            try {
                const response = await axios.post('/api/auth/logout');
                // console.log(response.data, 'probable logout success');

                // Global variable
                this.$store.dispatch('setLoggedIn', response.data.success);
            } catch (error) {
                // console.error(error, 'logout failure');
                
                //Global variable
                this.$store.dispatch('setLoggedIn', false);
            }
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
  