<template>
    <h1>Log in</h1>
    <form @submit.prevent="login">
        <section>
            <label for="username">Username</label>
            <input id="username" name="username" type="text" v-model="username" autocomplete="username" required autofocus>
        </section>
        <section>
            <label for="current-password">Password</label>
            <input id="current-password" name="password" type="password" v-model="password" autocomplete="current-password" required>
        </section>
        <button type="submit">Log in</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: 'LoginComponent',
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('/api/auth/login/password', {
                    username: this.username,
                    password: this.password
                });
                // console.log(response.data, 'probable login success');

                // Global variable
                this.$store.dispatch('setLoggedIn', response.data.success);
            } catch (error) {
                // console.error(error, 'login failure');
                
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
  