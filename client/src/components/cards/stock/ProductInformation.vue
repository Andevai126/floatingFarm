<template>
	<div class="row justify-content-md-center">
		<div class="container rounded border col-10 pt-3 mb-3 text-center">

			<!-- image -->
			<img :src="require(`../../../assets/products/${image}`)" alt="dynamically inserted picture of" class="mb-3" style="width: 75px">

			<!-- title -->
			<p>{{ this.stockProduct.name }}</p>

			<!-- input weight for admin and farmer -->
			<div v-if="canEdit">
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

	var defaultKilos = null;
	var defaultImage = null;

	export default {
		name: 'ProductInformation',
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
			canEdit: {
				type: Boolean,
				required: true
			},
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
				try {
					require(`../../../assets/products/${stockProduct.value.ID}.svg`);
					defaultImage = stockProduct.value.ID + '.svg';
				} catch (error) {
					require(`../../../assets/products/${stockProduct.value.ID}.png`);
					defaultImage = stockProduct.value.ID + '.png';
				}
			} catch (error) {
				defaultImage = '0.png';
			}
		},
		data() {
			return {
				kilos: defaultKilos,
				image: defaultImage
			}
		}
	}
</script>
