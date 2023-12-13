<template>
    <!-- users -->
    <UsersContainer />
    
    <!-- stock -->
    <StockContainer :canEdit="true"/>

    <!-- design -->
    <img alt="Admin design" src="../../assets/Admin.png">
</template>

<script>
    import UsersContainer from '../cards/users/UsersContainer.vue';
    import StockContainer from '../cards/stock/StockContainer.vue';

    export default {
        name: 'AdminPage',
        components: {
            UsersContainer,
            StockContainer
        },
        setup() {

        },
        data() {
            return {

            };
        }
    }
</script>