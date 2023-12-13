<template>
  <div class="container rounded border bg-light shadow p-3 mt-5 mb-3">
    <h4>Products</h4>
    <hr>

    <!-- 4 preset products -->
    <div class="container mb-3">
      <div class="row">
        <div class="col">
          <p>Gras</p>
          <div class="input-group mb-3">
            <input type="number" v-model="kilosGras" class="form-control no-spinners">
            <label class="input-group-text">Kilo</label>
          </div>
        </div>
        <div class="col">
          <p >Bierbostel</p>
          <div class="input-group mb-3">
            <input type="number" v-model="kilosBierbostel" class="form-control no-spinners">
            <label class="input-group-text">Kilo</label>
          </div>
        </div>

        <div class="w-100"></div>

        <div class="col">
          <p>DDGS Proticorn</p>
          <div class="input-group mb-3">
            <input type="number" v-model="kilosDDGSProticorn" class="form-control no-spinners">
            <label class="input-group-text">Kilo</label>
          </div>
        </div>
        <div class="col">
          <p>Sinaasappelschillen</p>
          <div class="input-group mb-3">
            <input type="number" v-model="kilosSinaasappelschillen" class="form-control no-spinners">
            <label class="input-group-text">Kilo</label>
          </div>
        </div>
      </div>
    </div>

    <!-- extra product inputs -->
    <div v-for="(extraProduct, index) in extraProductsInMix" :key="index">
      <ExtraProduct
        :products="products"
        :index="index"
        @updateExtraProductEvent="handleExtraProduct"
      />
      <br />
    </div>

    <!-- extra products button -->
    <div class="row justify-content-center">
      <button @click="addExtraProduct" class="btn btn-primary text-dark bg-white col col-3">Add Product</button>
    </div>

    <h4>Date and Time</h4>
    <hr>

    <!-- date and time -->
    <div class="container mb-3">
      <div class="row">
        <div class="col">
          <input type="date" v-model="date" class="form-control" />
        </div>
        <div class="col">
          <input type="time" v-model="time" class="form-control" />
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
      ></textarea>
    </div>
    
    <!-- send -->
    <div class="row justify-content-center mb-3">
      <button @click="addMix" class="btn btn-primary text-dark bg-white col col-3">Send</button>
    </div>

    <!-- alerts -->
    <div class="container mb-3">
      <div v-for="(alert, index) in alerts" :key="index" class="alert fade show " :class="alert.type" role="alert">
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
      logExtraProducts() {
        this.extraProductsInMix.forEach((product) => {
          console.log(product.id, product.name, product.kilos);
        });
      },
      addExtraProduct() {
        this.extraProductsInMix.push({id: null, name: '', kilos: 0 });
        this.logExtraProducts();
      },
      handleExtraProduct(extraProduct) {
        this.extraProductsInMix[extraProduct.index] = { id: extraProduct.id, name: extraProduct.name, kilos: extraProduct.kilos };
        this.logExtraProducts();
      },
      addMix() {
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
            title: 'Success!',
            message: 'Your mix has been added.',
          });

          // Auto hide alert after 4 seconds
          setTimeout(() => {
            this.hideAlert(this.alerts.length - 1);
          }, 4000);
        })
        .catch(() => {
          console.log("Failed to add mix");
          // Indicate failure to user
          this.alerts.push({
            type: 'alert-danger',
            title: 'Failure!',
            message: 'Your mix has not been added, refresh the page and try again ;)',
          });
        });

      },
      hideAlert(index) {
        // Remove the alert at the specified index
        this.alerts.splice(index, 1);
      }
    },
    setup() {
      getProducts().then((products) => {
        console.log("retrieved products: ", products);
        listOfProducts.value = products;
      });
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
