<template>
    <!-- Add mix -->
    <AddMixContainer />
  
    <!-- Stock -->
    <StockContainer :canEdit="true"/>
</template>
  
<script>
    import AddMixContainer from "../cards/mix/AddMixContainer.vue";
    import StockContainer from "../cards/stock/StockContainer.vue";
  
  
    export default {
        name: "FarmerPage",
        components: {
            AddMixContainer,
            StockContainer
        }
    };
</script>
