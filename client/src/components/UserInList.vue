<template>
    {{ user.displayName }}
    <select v-model="selectedRole">
        <option v-for="role in roles" :key="role.ID" :value="role.ID">
            {{ role.title }}
        </option>
    </select>
    <select v-model="selectedSupplier">
        <option v-for="supplier in suppliers" :key="supplier.ID" :value="supplier.ID">
            {{ supplier.name }}
        </option>
    </select>
    {{ user.isInAzure }}
    {{ user.isInDatabase }}
    <button @click="saveChanges(user.id)">Log ID (save changes)</button>
    <button @click="deleteUser(user.id)">Log ID (delete user)</button>
</template>

<script>
    import { toRef } from 'vue';

    var defaultRole = null;
    var defaultSupplier = null;

    export default {
        name: 'UserInList',
        methods: {
            saveChanges(id) {
                console.log("saved ", id, this.selectedRole, this.selectedSupplier);
            },
            deleteUser(id) {
                console.log("deleted ", id)
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
        data() {
            return {
                selectedRole: defaultRole,
                selectedSupplier: defaultSupplier
            }
        },
        setup(props) {
            const user = toRef(props, 'user');
            
            defaultRole = user.value.roleID;
            defaultSupplier = user.value.supplierID;
        }
    };
</script>