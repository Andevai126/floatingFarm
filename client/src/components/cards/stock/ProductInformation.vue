<template>
	<div class="row justify-content-md-center">
		<div class="container rounded border col-10 pt-3 mb-3 text-center">

			<!-- Dynamically inserted image -->
			<img :src="require(`../../../assets/products/${image}`)" alt="dynamically inserted image of" class="mb-3" style="width: 75px">

			<!-- Title -->
			<p>{{ this.stockProduct.name }}</p>

			<!-- Input weight, check pages for canEdit -->
			<div v-if="canEdit">
				<div class="input-group mb-3">
					<input type="number" v-model="kilos" @input="kilosChanged" class="form-control no-spinners">
					<label class="input-group-text">Kilo</label>
				</div>
			</div>

			<!-- Display weight, check pages for canEdit -->
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
			// Everytime the kilos is changed
			kilosChanged() {
				this.updateExtraProduct();
			},
			updateExtraProduct() {
				// If the kilos input is not a number, send zero instead
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
			// Set a default for the kilos value in return data
			const stockProduct = toRef(props, 'stockProduct');
			defaultKilos = stockProduct.value.kilosInStock;
			// Retrieve and insert the image
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
