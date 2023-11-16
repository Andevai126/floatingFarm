<template>
    <p>This is the AdminCard component!</p>
    <li v-for="item in items" :key="item">
        {{ item.id }}
        {{ item.displayName }}
        {{ item.roleID }}
        {{ item.roleTitle }}
        {{ item.supplierID }}
        {{ item.isInAzure }}
        {{ item.isInDatabase }}
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
        // methods: {
        //     async getUsers() {
        //         // await
        //     }
        // },
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