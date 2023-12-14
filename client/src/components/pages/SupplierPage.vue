<template>
    <div class="row g-0">
        <!-- left column -->
        <div class="col p-2">
            <AddContribution :canInputSupplier="false"/>
        </div>

        <!-- right column -->
        <div class="col p-2">
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
