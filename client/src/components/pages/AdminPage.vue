<template>
    <!-- Users -->
    <UsersContainer />

    <div class="container mt-5 mb-3" style="padding-left: 0px; padding-right: 0px;">
        <div class="row g-0">
            <div class="col" style="padding-right: 1rem;">
                <!-- Last contributions -->
                <LastContributions />
            </div>

            <div class="col" style="padding-left: 1rem;">
                <!-- Last mixes -->
                <LastMixes />
            </div>
        </div>
    </div>

    <!-- Stock -->
    <StockContainer :canEdit="true"/>
</template>

<script>
    import UsersContainer from '../cards/users/UsersContainer.vue';
    import LastContributions from '../cards/overviews/LastContributions.vue';
    import LastMixes from '../cards/overviews/LastMixes.vue';
    import StockContainer from '../cards/stock/StockContainer.vue';

    export default {
        name: 'AdminPage',
        components: {
            UsersContainer,
            LastContributions,
            LastMixes,
            StockContainer
        }
    }
</script>
