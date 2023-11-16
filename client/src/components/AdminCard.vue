<template>
    <p>This is the AdminCard component!</p>
    <li v-for="user in users" :key="user">
        <UserInList :user="user" :roles="roles" :suppliers="suppliers"/>
    </li>
    <img alt="Admin design" src="./../assets/Admin.png">
</template>

<script>
    import { ref } from 'vue';
    import UserInList from './UserInList.vue'
    import { getUsers, getRoles, getSuppliers } from './../apiConfig';
    
    var listOfUsers = ref([]);
    var listOfRoles = ref([]);
    var listOfSuppliers = ref([]);

    export default {
        name: 'AdminCard',
        components: {
            UserInList
        },
        setup() {
            getUsers().then((users) => {
                // console.log("retrieved users: ", users);
                listOfUsers.value = users;
            });
            getRoles().then((roles) => {
                // console.log("retrieved roles: ", roles);
                listOfRoles.value = roles;
            });
            getSuppliers().then((suppliers) => {
                // console.log("retrieved suppliers: ", suppliers);
                listOfSuppliers.value = suppliers;
            });
        },
        data() {
            return {
                users: listOfUsers,
                roles: listOfRoles,
                suppliers: listOfSuppliers
            };
        }
    }
</script>