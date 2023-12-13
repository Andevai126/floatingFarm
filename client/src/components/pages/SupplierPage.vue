<template>
    <div class="row">
        <!-- left column -->
        <div class="col">
            <AddContribution />
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
        },
        setup() {  
            console.log(`price is with a "c"`);
        },
        data() {
            return {

            }
        }
    }
</script>
  