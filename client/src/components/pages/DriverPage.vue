<template>
    <!-- Add contribution -->
    <AddContribution :canInputSupplier="true"/>
</template>
    
<script>
    import AddContribution from "../cards/contribution/AddContributionContainer.vue";
  
    export default {
        name: 'SupplierPage',
        components: {
            AddContribution
        }
    }
</script>
