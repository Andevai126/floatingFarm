<template>
    <!-- Display name -->
    <td :style="{ color: user.displayName ? 'black' : 'lightgrey' }">
        {{ user.displayName || 'Tester' }}
    </td>

    <!-- Input role -->
    <td>
        <select v-model="selectedRole" class="form-control">
            <option v-for="role in roles" :key="role.ID" :value="role.ID">
                {{ role.title }}
            </option>
        </select>
    </td>

    <!-- Input supplier -->
    <td>
        <select v-model="selectedSupplier" class="form-control">
            <option v-for="supplier in suppliers" :key="supplier.ID" :value="supplier.ID">
                {{ supplier.name }}
            </option>
        </select>
    </td>

    <!-- Present in AD B2C Database -->
    <td :class="{ 'bg-success': user.isInAzure, 'bg-warning': !user.isInAzure }">
        {{ user.isInAzure }}
    </td>

    <!-- Present in MySQL Database -->
    <td :class="{ 'bg-success': user.isInDatabase, 'bg-warning': !user.isInDatabase }">
        {{ user.isInDatabase }}
    </td>
    
    <!-- Update user -->
    <td>
        <button @click="updateUser(user.id)" class="btn btn-primary text-dark bg-white">Save</button>
    </td>
    
    <!-- Delete user -->
    <td>
        <button @click="deleteUser(user.id)" class="btn btn-primary text-dark bg-white">Delete</button>
    </td>
</template>

<script>
    import { toRef } from 'vue';
    import { updateUser, deleteUser } from '../../../apiConfig';

    var defaultRole = null;
    var defaultSupplier = null;

    export default {
        name: 'UserInList',
        methods: {
            updateUser(id) {
                console.log("saving ", id, this.selectedRole, this.selectedSupplier);
                updateUser(id, this.selectedRole, this.selectedSupplier);
            },
            deleteUser(id) {
                console.log("deleting ", id)
                deleteUser(id);
            }
        },
        props: {
            user: {
                type: Object,
                required: true
            },
            roles: {
                type: Object,
                required: true
            },
            suppliers: {
                type: Object,
                required: true
            }
        },
        setup(props) {
            // Set a default for the selectedRole and selectedSupplier value in return data
            const user = toRef(props, 'user');
            defaultRole = user.value.roleID;
            defaultSupplier = user.value.supplierID;
        },
        data() {
            return {
                selectedRole: defaultRole,
                selectedSupplier: defaultSupplier
            }
        }
    };
</script>

<style scoped>
    /* Different table style, only in this file */
    td {
        background-color: rgb(248, 249, 250);
        vertical-align: middle;
    }
</style>
