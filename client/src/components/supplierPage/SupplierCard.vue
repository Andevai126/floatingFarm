<template>
  <p>This is the SupplierCard component</p>

  <br />

  <div v-for="(extraProduct, index) in extraProductsInContribution" :key="index">
    <ExtraProductInSupplier
      :products="products"
      :containers="containers"
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

  <br>

  <input type="checkbox" v-model="isDelivery">

  <br />

  <textarea
    placeholder="Notes... (max 256 chars)"
    maxlength="256"
    v-model="notes"
    style="height: 100px"
  ></textarea>

  <br />

  <button @click="addContribution">Sla contributie op ;) !</button>

  <br>

  <img alt="Supplier design" src="./../../assets/Supplier.png">
</template>
  
<script>
  import { ref } from 'vue';
  import ExtraProductInSupplier from "./ExtraProductInSupplier.vue";
  import { getProducts, getContainers, addContribution } from "./../../apiConfig";
  // import { getProducts, getContainers } from "./../../apiConfig";

  var listOfProducts = ref([]);
  var listOfContainers = ref([]);

  var currentDate = ref("");
  var currentTime = ref("");

  export default {
    name: 'SupplierCard',
    components: {
      ExtraProductInSupplier
    },
    methods: {
      logExtraProducts() {
        this.extraProductsInContribution.forEach((product) => {
          console.log(product.id, product.name, product.quantity, product.containerId, product.containerName);
        });
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
        console.log(this.date + " " + this.time, this.isDelivery, this.notes);
        
        addContribution(productsInContribution, this.date + " " + this.time, this.isDelivery, this.notes);

        //reset variables
      }
    },
    setup() {
      getProducts().then((products) => {
        console.log("retrieved products: ", products);
        listOfProducts.value = products;
      });
      getContainers().then((containers) => {
        console.log("retrieved containers: ", containers);
        listOfContainers.value = containers;
      });
      const newDate = new Date();
      currentDate.value = newDate.toISOString().slice(0, 10);
      currentTime.value = newDate.toTimeString().slice(0, 5);

      console.log(`price is with a "c"`);
    },
    data() {
      return {
        products: listOfProducts,
        containers: listOfContainers,
        extraProductsInContribution: [{ id: null, name: '', quantity: 0, containerId: null, containerName: '' }],
        date: currentDate,
        time: currentTime,
        isDelivery: false,
        notes: ""
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  