<template>
	<div class="row justify-content-md-center">
		<div class="container rounded border col col-6 pt-3 mb-3 text-center">
			<!-- image -->
			<img :src="require(`./../../assets/products/${imageId}.png`)" alt="dynamically inserted picture of" class="mb-3">

			<!-- title -->
			<p>{{ this.stockProduct.name }}</p>

			<!-- input weight for admin and farmer -->
			<div v-if="roleId==2 || roleId==5">
				<div class="input-group mb-3">
					<input type="number" v-model="kilos" @input="kilosChanged" class="form-control no-spinners">
					<label class="input-group-text">Kilo</label>
				</div>
			</div>

			<!-- display weight for supplier -->
			<div v-else>
				{{ kilos }} Kilo
			</div>
		</div>
	</div>
</template>

<script>
	import { toRef } from "vue";
	import { store } from "./../../store";

	var defaultKilos = null;
	var defaultImageId = null;

	export default {
		name: 'ProductInStock',
		emits: ['updateProductInStockEvent'],
		methods: {
			kilosChanged() {
				this.updateExtraProduct();
			},
			updateExtraProduct() {
				const kilos = (typeof this.kilos === 'number') ? this.kilos : 0;
				this.$emit('updateProductInStockEvent', {index: this.index, ID: this.stockProduct.ID, name: this.stockProduct.name, kilosInStock: kilos});
			}
		},
		props: {
			stockProduct: {
				type: Object,
				required: true
			},
			index: {
                type: Number,
                required: true
            }
		},
		setup(props) {
			const stockProduct = toRef(props, 'stockProduct');
			defaultKilos = stockProduct.value.kilosInStock;
			try {
				require(`./../../assets/products/${stockProduct.value.ID}.png`);
				defaultImageId = stockProduct.value.ID;
			} catch (error) {
				defaultImageId = 0;
			}
		},
		data() {
			return {
				roleId: store.roleId,
				kilos: defaultKilos,
				imageId: defaultImageId
			}
		}
	}
</script>

<style scoped>
  /* Custom CSS to hide number input arrows */
  .no-spinners {
	-moz-appearance: textfield;
	appearance: textfield;
  }
  .no-spinners::-webkit-inner-spin-button, .no-spinners::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
  }
</style>