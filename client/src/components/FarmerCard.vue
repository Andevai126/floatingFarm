<template>
    <p>This is the FarmerCard component</p>

    <div style="display: inline-block;">
      <p style="float: left;">Gras</p>
      <input type="number" v-model="kilosGras" style="float: left;">
      <p style="float: left">kilo's</p>
    </div>

    <br>

    <div style="display: inline-block;">
      <p style="float: left;">Bierbostel</p>
      <input type="number" v-model="kilosBierbostel" style="float: left;">
      <p style="float: left">kilo's</p>
    </div>

    <br>

    <div style="display: inline-block;">
      <p style="float: left;">DDGS Proticorn</p>
      <input type="number" v-model="kilosDDGSProticorn" style="float: left;">
      <p style="float: left">kilo's</p>
    </div>

    <br>
    
    <div style="display: inline-block;">
      <p style="float: left;">Sinaasappelschillen</p>
      <input type="number" v-model="kilosSinaasappelschillen" style="float: left;">
      <p style="float: left">kilo's</p>
    </div>

    <br>

    <div v-for="(product, index) in ExtraProductsInMix" :key="index">
      <div style="width: 500px; margin-left: auto; margin-right: auto; border: black solid 2px">

        <div style="display: inline-block; float: center">
          <p style="float: left;">Product</p>
          <input type="text" v-model="product.name" placeholder="Enter data" style="float: left;">
        </div>

        <br>
        
        <div style="display: inline-block; float: center">
          <p style="float: left;">Hoeveelheid</p>
          <input type="number" v-model="product.quantity" style="float: left;">
          <p style="float: left;">kilo</p>
        </div>

      </div>
      <br>
    </div>

    <br>

    <button @click="addProduct">Voeg product toe...</button>

    <br>

    <div style="display: inline-block;">
      <input type="date" v-model="date" style="float: left">
      <input type="time" v-model="time" style="float: left">
    </div>

    <br>

    <input type="text" placeholder="Notes..." v-model="notes" style="height: 100px;">

    <br>

    <button @click="saveMix()">Sla mix op ;) !</button>
    <br>
    <img alt="Farmer design" src="./../assets/Farmer.png">
  </template>
  
  <script>
  export default {
    name: 'FarmerCard',
    methods: {
      addProduct() {
        this.ExtraProductsInMix.push({ name: '', quantity: 0});
      },
      saveMix() {
        var productsInMix = [
          {gras: this.kilosGras},
          {bierbostel: this.kilosBierbostel},
          {DDGSProticorn: this.kilosDDGSProticorn},
          {sinaasappelschillen: this.kilosSinaasappelschillen}
        ]

        this.ExtraProductsInMix.forEach((product) => {
          productsInMix.push({[product.name]: product.quantity});
        });

        console.log(productsInMix);
        console.log(this.date, this.time, this.notes);
        
        //reset variables
      }
    },
    data() {
      return {
        kilosGras: 600,
        kilosBierbostel: 500,
        kilosDDGSProticorn: 300,
        kilosSinaasappelschillen: 0,
        ExtraProductsInMix: [],
        date: null,
        time: null,
        notes: ''
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  