<template>
	<!-- Work in progress, this must become GraphContainer.vue -->
	<VemGraph />

	<div class="container rounded border bg-light shadow p-3 mt-5 mb-3">
		<img alt="Presenter design" src="../../assets/Presenter.png" style="width: 90%;">
	</div>

	<StockContainer :can-edit="false" />
</template>
  
<script>
	import VemGraph from './../cards/graphs/VemGraph.vue'
	import StockContainer from '../cards/stock/StockContainer.vue'

	export default {
		name: 'PresenterPage',
		components: { VemGraph, StockContainer },
	}
</script>
