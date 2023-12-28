<template>
	<div class="container rounded border bg-light shadow p-3 mt-5 mb-3">
		<h4>Products</h4>
		<hr>

		<!-- product inputs -->
		<div v-for="(extraProduct, index) in extraProductsInContribution" :key="index">
			<ExtraProduct
				:products="products"
				:containers="containers"
				:index="index"
				@updateExtraProductEvent="handleExtraProduct"
			/>
			<br />
		</div>

		<!-- products button -->
		<div class="row justify-content-center mb-3">
			<button @click="addExtraProduct" class="btn btn-primary text-dark bg-white col col-3">Add Product</button>
		</div>

		<h4>Logistics of Transport</h4>
		<hr>

		<!-- date and time -->
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

		<!-- is delivery -->
		<div class="container mb-3">
			<div class="form-check form-switch">
				<input class="form-check-input" type="checkbox" role="switch" v-model="isDelivery">
				This contribution will be {{ isDelivery ? 'delivered.' : 'collected by Floating Farm.' }}
			</div>
		</div>

		<!-- choose supplier -->
		<div v-if="canInputSupplier">
			<div class="container mb-3">
				<div class="input-group mb-3">
					<label class="input-group-text">Supplier</label>
					<select v-model="selectedSupplier" class="form-control">
						<option v-for="supplier in suppliers" :key="supplier.ID" :value="supplier.ID">
							{{ supplier.name }}
						</option>
					</select>
				</div>
			</div>
		</div>

		<h4>Notes</h4>
		<hr>

		<!-- notes -->
		<div class="container mb-3">
			<textarea
				v-model="notes"
				class="form-control"
				maxlength="256"
				style="height: 100px"
				placeholder="Tap to type..."
			></textarea>
		</div>

		<!-- send -->
		<div class="row justify-content-center mb-3">
			<button @click="addContribution" class="btn btn-primary text-dark bg-white col col-3">Save</button>
		</div>

		<!-- alerts -->
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
	import { ref, toRef } from 'vue';
	import ExtraProduct from "./ExtraProduct.vue";
	import { getProducts, getContainers, getSuppliers, addContribution } from "../../../apiConfig";

	var listOfProducts = ref([]);
	var listOfContainers = ref([]);
	var listOfSuppliers = ref([]);

	var currentDate = ref("");
	var currentTime = ref("");

	export default {
		name: 'AddContributionContainer',
		components: {
			ExtraProduct,
		},
		methods: {
			logExtraProducts() {
				this.extraProductsInContribution.forEach((product) => {
					console.log(product.id, product.name, product.quantity, product.containerId, product.containerName);
				});
				console.log("canInputSupplier: ", this.canInputSupplier);
			},
			addExtraProduct() {
				this.extraProductsInContribution.push({ id: null, name: '', quantity: 0, containerId: null, containerName: '' });
			},
			handleExtraProduct(extraProduct) {
				this.extraProductsInContribution[extraProduct.index] = { id: extraProduct.id, name: extraProduct.name, quantity: extraProduct.quantity, containerId: extraProduct.containerId, containerName: extraProduct.containerName };
				this.logExtraProducts();
			},
			addContribution() {
				var productsInContribution = [
					...this.extraProductsInContribution.map(p => ({id: p.id, name: p.name, quantity: p.quantity, containerId: p.containerId, containerName: p.containerName}))
				];

				console.log(productsInContribution);
				console.log(this.date + " " + this.time, this.isDelivery, this.selectedSupplier, this.notes);
				
				addContribution(productsInContribution, this.date + " " + this.time, this.isDelivery, this.selectedSupplier, this.notes)
				.then(() => {
					console.log("Succeeded to add contribution");
					// Reset variables
					this.extraProductsInContribution = [];
					const newDate = new Date();
					this.date = newDate.toISOString().slice(0, 10);
					this.time = newDate.toTimeString().slice(0, 5);
					this.isDelivery = true;
					this.selectedSupplier = null;
					this.notes = '';

					// Indicate success to user
					this.alerts.push({
						type: 'alert-success',
						title: 'Success',
						message: 'Your contribution has been added.',
					});

					// Auto hide alert after 10 seconds
					setTimeout(() => {
						this.hideAlert(this.alerts.length - 1);
					}, 10000);
				})
				.catch(() => {
					console.log("Failed to add contribution");
					// Indicate failure to user
					this.alerts.push({
						type: 'alert-danger',
						title: 'Error',
						message: 'Your contribution has not been added, check your input fields or refresh the page and try again ;)',
					});
				});
			},
			hideAlert(index) {
				// Remove the alert at the specified index
				this.alerts.splice(index, 1);
			}
		},
		props: {
            canInputSupplier: {
                type: Boolean,
                required: true
            }
        },
		setup(props) {
			getProducts().then((products) => {
				console.log("retrieved products: ", products);
				listOfProducts.value = products;
			});
			getContainers().then((containers) => {
				console.log("retrieved containers: ", containers);
				listOfContainers.value = containers;
			});
			const canInputSupplierObject = toRef(props, 'canInputSupplier');
            const canInputSupplier = canInputSupplierObject.value;
            if (canInputSupplier) {
				getSuppliers().then((suppliers) => {
					listOfSuppliers.value = suppliers;
				});
			}
			const newDate = new Date();
			currentDate.value = newDate.toISOString().slice(0, 10);
			currentTime.value = newDate.toTimeString().slice(0, 5);
		},
		data() {
			return {
				products: listOfProducts,
				containers: listOfContainers,
				suppliers: listOfSuppliers,
				selectedSupplier: null,
				extraProductsInContribution: [{ id: null, name: '', quantity: 0, containerId: null, containerName: '' }],
				date: currentDate,
				time: currentTime,
				isDelivery: true,
				notes: "",
				alerts: []
			}
		}
	}
</script>
