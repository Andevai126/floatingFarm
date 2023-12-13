<template>
    <div class="row">
        <!-- left column -->
        <div class="col">
            <AddContribution :canInputSupplier="false"/>
        </div>

        <!-- right column -->
        <div class="col">
            <StockContainer :canEdit="false"/>
            <img alt="Supplier design" src="../../assets/SupplierRightSide.png" style="width: 500px;">
        </div>
    </div>
</template>
    
<script>
    import AddContribution from "../cards/contribution/AddContributionContainer.vue";
    import StockContainer from "../cards/stock/StockContainer.vue";
  
    export default {
        name: 'SupplierPage',
        components: {
            AddContribution,
            StockContainer
        }
    }
</script>
