<template>
    <!-- users -->
    <UsersContainer />
    
    <!-- stock -->
    <StockContainer :canEdit="true"/>
</template>

<script>
    import UsersContainer from '../cards/users/UsersContainer.vue';
    import StockContainer from '../cards/stock/StockContainer.vue';

    export default {
        name: 'AdminPage',
        components: {
            UsersContainer,
            StockContainer
        }
    }
</script>
