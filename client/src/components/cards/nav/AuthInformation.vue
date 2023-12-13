<template>
    <button v-if="!authenticated" v-on:click="signIn"      class="btn btn-primary text-dark bg-white">Sign in</button>
    <div v-if="authenticated" class="text-center">
        {{ username }} ({{ roleTitle }})
        &nbsp;
        <button v-on:click="editProfile"                   class="btn btn-primary text-dark bg-white">Edit profile</button>
        &nbsp;
        <button v-on:click="signOut"                       class="btn btn-primary text-dark bg-white">Sign out</button>
    </div>
</template>
  
<script>
    import { signIn, signOut, editProfile } from '../../../apiConfig';
    import { store } from '../../../store';

    export default {
        name: 'AuthInformation',
        data() {
            return {
                authenticated: store.authenticated,
                username: store.username,
                roleTitle: store.roleTitle
            };
        },
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