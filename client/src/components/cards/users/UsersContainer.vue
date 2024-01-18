<template>
    <div class="container rounded border bg-light shadow p-3 mt-5 mb-3">

        <h4>Users</h4>
        <hr>

        <table class="table">
            <!-- First row or head -->
            <thead>
                <th scope="col">Display name</th>
                <th scope="col">Role</th>
                <th scope="col">Assigment to supplier</th>
                <th scope="col">Present in AD B2C Database</th>
                <th scope="col">Present in MySQL Database</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </thead>

            <!-- Other rows -->
            <tbody>
                <tr v-for="user in users" :key="user" style="border-top: 1px solid #DEE2E6;">
                    <UserInformation :user="user" :roles="roles" :suppliers="suppliers"/>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import { ref } from 'vue';
    import UserInformation from './UserInformation.vue'
    import { getUsers, getRoles, getSuppliers } from '../../../apiConfig';
    
    var listOfUsers = ref([]);
    var listOfRoles = ref([]);
    var listOfSuppliers = ref([]);

    export default {
        name: 'AdminCard',
        components: {
            UserInformation,
        },
        setup() {
            // Set a default for the users value in return data
            getUsers().then((users) => {
                listOfUsers.value = users;
            });
            // Set a default for the roles value in return data
            getRoles().then((roles) => {
                listOfRoles.value = roles;
            });
            // Set a default for the suppliers value in return data
            getSuppliers().then((suppliers) => {
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
