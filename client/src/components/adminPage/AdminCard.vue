<template>
    <!-- users -->
    <div class="container rounded border bg-light shadow p-3 mt-5 mb-3">
        <h4>Users</h4>
        <hr>

        <table class="table">
            <thead>
                <th scope="col">Display name</th>
                <th scope="col">Role</th>
                <th scope="col">Assigment to supplier</th>
                <th scope="col">Present in AD B2C Database</th>
                <th scope="col">Present in MySQL Database</th>
                <th scope="col">Save / Update</th>
                <th scope="col">Delete</th>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user">
                    <UserInList :user="user" :roles="roles" :suppliers="suppliers"/>
                </tr>
            </tbody>
        </table>
    </div>
    
    <!-- stock -->
    <StockCard />

    <!-- design -->
    <img alt="Admin design" src="./../../assets/Admin.png">
</template>

<script>
    import { ref } from 'vue';
    import UserInList from './UserInList.vue'
    import StockCard from './../stockContainer/StockCard.vue';
    import { getUsers, getRoles, getSuppliers } from './../../apiConfig';
    
    var listOfUsers = ref([]);
    var listOfRoles = ref([]);
    var listOfSuppliers = ref([]);

    export default {
        name: 'AdminCard',
        components: {
            UserInList,
            StockCard
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