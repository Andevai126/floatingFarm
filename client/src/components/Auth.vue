<template>
    <h1>auth stuff</h1>
    <button v-if="!authenticated" v-on:click="signIn">Sign in</button>
    <button v-if="authenticated"  v-on:click="signOut">Sign out</button>
    <button v-if="authenticated"  v-on:click="editProfile">Edit profile</button>
</template>
  
<script>


    // import {signIn, signOut, editProfile } from './../authConfig';
    import { signIn, signOut, editProfile } from './../apiConfig';
    import { store } from './../msalConfig';

    // const loggedIn = true;
    // const loggedIn = isAuthenticated();

    export default {
        name: 'AuthComponent',
        data() {
            return {
                authenticated: store.authenticated
            };
        },
        // computed: {
        //     isUserLoggedIn: {
        //         get: function () {
        //             return isAuthenticated
        //         }
        //     }
        // },
        methods: {
            async signIn() {
                signIn();
            },
            async signOut() {
                signOut();
            },
            async editProfile() {
                editProfile();
            }
        }
    }
</script>





  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <!-- <style scoped> -->

  <!-- </style> -->
  ../helpstuff/apiConfig../apiConfig