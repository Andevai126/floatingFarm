<template>
  <p>This is the FarmerCard component</p>

  <div style="display: inline-block">
    <p style="float: left">Gras</p>
    <input type="number" v-model="kilosGras" style="float: left" />
    <p style="float: left">kilo's</p>
  </div>

  <br />

  <div style="display: inline-block">
    <p style="float: left">Bierbostel</p>
    <input type="number" v-model="kilosBierbostel" style="float: left" />
    <p style="float: left">kilo's</p>
  </div>

  <br />

  <div style="display: inline-block">
    <p style="float: left">DDGS Proticorn</p>
    <input type="number" v-model="kilosDDGSProticorn" style="float: left" />
    <p style="float: left">kilo's</p>
  </div>

  <br />

  <div style="display: inline-block">
    <p style="float: left">Sinaasappelschillen</p>
    <input
      type="number"
      v-model="kilosSinaasappelschillen"
      style="float: left"
    />
    <p style="float: left">kilo's</p>
  </div>

  <br />

  <div v-for="(extraProduct, index) in extraProductsInMix" :key="index">
    <ExtraProductInFarmer
      :products="products"
      :index="index"
      @updateExtraProductEvent="handleExtraProduct"
    />
    <br />
  </div>

  <br />

  <button @click="addExtraProduct">Voeg product toe...</button>

  <br />

  <div style="display: inline-block">
    <input type="date" v-model="date" style="float: left" />
    <input type="time" v-model="time" style="float: left" />
  </div>

  <br />

  <textarea
    placeholder="Notes... (max 256 chars)"
    maxlength="256"
    v-model="notes"
    style="height: 100px"
  ></textarea>

  <br />

  <button @click="addMix()">Sla mix op ;) !</button>
  <br />
  <img alt="Farmer design" src="./../../assets/Farmer.png" />
</template>

<script>
  import { ref } from "vue";
  import ExtraProductInFarmer from "./ExtraProductInFarmer.vue";
  import { getProducts, addMix } from "./../../apiConfig";

  var listOfProducts = ref([]);

  var currentDate = ref("");
  var currentTime = ref("");

  export default {
    name: "FarmerCard",
    components: {
      ExtraProductInFarmer,
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

        addMix(productsInMix, this.date + " " + this.time, this.notes);

        //reset variables
      },
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
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
