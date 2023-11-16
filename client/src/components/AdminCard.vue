<template>
    <p>This is the AdminCard component!</p>
    <li v-for="item in items" :key="item">
        {{ item.id }}
        {{ item.displayName }}
        {{ item.roleID }}
        {{ item.roleTitle }}
        {{ item.supplierID }}
        {{ item.supplierName }}
        {{ item.isInAzure }}
        {{ item.isInDatabase }}
        <button @click="saveChanges(item.id)">Log ID (save changes)</button>
        <button @click="deleteUser(item.id)">Log ID (delete user)</button>
    </li>
    <img alt="Admin design" src="./../assets/Admin.png">
</template>

<script>
    import { ref } from 'vue';
    // import { store } from './../store';
    import { getUsers } from './../apiConfig';
    
    var listOfUsers = ref([]);

    export default {
        name: 'AdminCard',
        methods: {
            saveChanges(id) {
                console.log("saved ", id);
            },
            deleteUser(id) {
                console.log("deleted ", id)
            }
        },
        setup() {
            getUsers().then((users) => {
                console.log("retrieved users: ", users);
                listOfUsers.value = users;
            });
        },
        data() {
            return {
                items: listOfUsers
            };
        }
    }

</script>