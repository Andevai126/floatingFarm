<template>
	<div class="container rounded border bg-light shadow p-3 mt-5 mb-3">

		<h4>Products</h4>
		<hr>

		<!-- 4 Preset products -->
		<div class="container mb-3">
			<div class="row">
				<!-- Gras -->
				<div class="col">
					<p>Gras</p>
					<div class="input-group mb-3">
						<input type="number" v-model="kilosGras" class="form-control no-spinners">
						<label class="input-group-text">Kilo</label>
					</div>
				</div>

				<!-- Bierbostel -->
				<div class="col">
					<p >Bierbostel</p>
					<div class="input-group mb-3">
						<input type="number" v-model="kilosBierbostel" class="form-control no-spinners">
						<label class="input-group-text">Kilo</label>
					</div>
				</div>

				<!-- Second row -->
				<div class="w-100"></div>

				<!-- Proticorn -->
				<div class="col">
					<p>DDGS Proticorn</p>
					<div class="input-group mb-3">
						<input type="number" v-model="kilosDDGSProticorn" class="form-control no-spinners">
						<label class="input-group-text">Kilo</label>
					</div>
				</div>
				
				<!-- Sinaasappelschillen -->
				<div class="col">
					<p>Sinaasappelschillen</p>
					<div class="input-group mb-3">
						<input type="number" v-model="kilosSinaasappelschillen" class="form-control no-spinners">
						<label class="input-group-text">Kilo</label>
					</div>
				</div>
			</div>
		</div>

		<!-- Extra product inputs -->
		<div v-for="(extraProduct, index) in extraProductsInMix" :key="index">
			<ExtraProduct
				:products="products"
				:index="index"
				@updateExtraProductEvent="handleExtraProduct"
			/>
			<br />
		</div>

		<!-- Extra products button -->
		<div class="row justify-content-center">
			<button @click="addExtraProduct" class="btn btn-primary text-dark bg-white col col-3">Add Product</button>
		</div>

		<h4>Date and Time</h4>
		<hr>

		<!-- Date and time -->
		<div class="container mb-3">
			<div class="row">
				<div class="col">
					<div class="input-group">
						<label class="input-group-text">Date</label>
						<input type="date" v-model="date" class="form-control" />
					</div>
				</div>
				<div class="col">
					<div class="input-group">
						<label class="input-group-text">Time</label>
						<input type="time" v-model="time" class="form-control" />
					</div>
				</div>
			</div>
		</div>

		<h4>Notes</h4>
		<hr>

		<!-- Notes -->
		<div class="container mb-3">
			<textarea
				v-model="notes"
				class="form-control"
				maxlength="256"
				style="height: 100px"
				placeholder="Tap to type..."
			></textarea>
		</div>
    
		<!-- Send mix -->
		<div class="row justify-content-center mb-3">
			<button @click="addMix" class="btn btn-primary text-dark bg-white col col-3">Save</button>
		</div>

		<!-- Alerts -->
		<div class="container mb-3">
			<div v-for="(alert, index) in alerts" :key="index" class="alert fade show" :class="alert.type" role="alert">
				<div class="container d-flex align-items-center">
					<div class="container">
						<strong>{{ alert.title }}</strong> &nbsp; {{ alert.message }}
					</div>
					<button @click="hideAlert(index)" type="button" class="btn btn-success text-dark bg-white close" aria-label="Close" style="float: right; margin: 0.75rem">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { ref } from "vue";
	import ExtraProduct from "./ExtraProduct.vue";
	import { getProducts, addMix } from "../../../apiConfig";

	var listOfProducts = ref([]);

	var currentDate = ref("");
	var currentTime = ref("");

	export default {
		name: "AddMixContainer",
		components: {
		ExtraProduct
		},
		methods: {
			// Test function, logs all products that have been added
			logExtraProducts() {
				this.extraProductsInMix.forEach((product) => {
					console.log(product.id, product.name, product.kilos);
				});
			},
			// Adds empty extra product
			addExtraProduct() {
				this.extraProductsInMix.push({id: null, name: '', kilos: 0 });
				this.logExtraProducts();
			},
			// When the ExtraProduct.vue container values change, the array is updated
			handleExtraProduct(extraProduct) {
				this.extraProductsInMix[extraProduct.index] = { id: extraProduct.id, name: extraProduct.name, kilos: extraProduct.kilos };
				this.logExtraProducts();
			},
			addMix() {
				// Get preset products, and values, instead of references or objects
				var productsInMix = [
					{ id: 1, name: 'Gras', kilos: this.kilosGras },
					{ id: 2, name: 'Bierbostel', kilos: this.kilosBierbostel },
					{ id: 3, name: 'DDGS Proticorn', kilos: this.kilosDDGSProticorn },
					{ id: 4, name: 'Sinaasappelschillen', kilos: this.kilosSinaasappelschillen },
					...this.extraProductsInMix.map(p => ({id: p.id, name: p.name, kilos: p.kilos}))
				];
				
				console.log(productsInMix);
				console.log(this.date + " " + this.time, this.notes);

				addMix(productsInMix, this.date + " " + this.time, this.notes)
				.then(() => {
					console.log("Succeeded to add mix");
					// Reset variables
					this.kilosGras = 600;
					this.kilosBierbostel = 500;
					this.kilosDDGSProticorn = 300;
					this.kilosSinaasappelschillen = 0;
					this.extraProductsInMix = [];
					const newDate = new Date();
					this.date = newDate.toISOString().slice(0, 10);
					this.time = newDate.toTimeString().slice(0, 5);
					this.notes = '';

					// Indicate success to user
					this.alerts.push({
						type: 'alert-success',
						title: 'Success',
						message: 'Your mix has been added.',
					});

					// Auto hide alert after 10 seconds
					setTimeout(() => {
						this.hideAlert(this.alerts.length - 1);
					}, 10000);
				})
				.catch(() => {
					console.log("Failed to add mix");
					// Indicate failure to user
					this.alerts.push({
						type: 'alert-danger',
						title: 'Error',
						message: 'Your mix has not been added, check your input fields or refresh the page and try again ;)',
					});
				});
			},
			// Remove the alert at the specified index
			hideAlert(index) {
				this.alerts.splice(index, 1);
			}
		},
		setup() {
			// Set a default for the products value in return data
			getProducts().then((products) => {
				console.log("retrieved products: ", products);
				listOfProducts.value = products;
			});
			// Set a default for the suppliers value in return data
			const newDate = new Date();
			currentDate.value = newDate.toISOString().slice(0, 10);
			currentTime.value = newDate.toTimeString().slice(0, 5);
		},
		data() {
			return {
				products: listOfProducts,
				kilosGras: 600,
				kilosBierbostel: 500,
				kilosDDGSProticorn: 300,
				kilosSinaasappelschillen: 0,
				extraProductsInMix: [],
				date: currentDate,
				time: currentTime,
				notes: "",
				alerts: []
			};
		},
	};
</script>
