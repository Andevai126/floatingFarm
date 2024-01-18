<template>
    <div class="row g-0">
        <!-- Left column -->
        <div class="col p-2">
            <!-- Add contribution -->
            <AddContribution :canInputSupplier="false"/>
        </div>

        <!-- Right column -->
        <div class="col p-2">
            <!-- Stock -->
            <StockContainer :canEdit="false"/>
            <InfoContainer />
        </div>
    </div>
</template>
    
<script>
    import AddContribution from "../cards/contribution/AddContributionContainer.vue";
    import StockContainer from "../cards/stock/StockContainer.vue";
    import InfoContainer from "../cards/InfoContainer.vue";
  
    export default {
        name: 'SupplierPage',
        components: {
            AddContribution,
            StockContainer,
            InfoContainer
        }
    }
</script>
