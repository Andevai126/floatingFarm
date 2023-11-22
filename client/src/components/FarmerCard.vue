<template>
    <p>This is the FarmerCard component</p>

    <div style="display: inline-block;">
      <p style="float: left;">Gras</p>
      <input type="number" v-model="kilosGrass" style="float: left;">
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
      <input type="number" v-model="kilosOrangePeels" style="float: left;">
      <p style="float: left">kilo's</p>
    </div>

    <br>

    <button @click="logData()">this is a button!</button>
    <br>
    <img alt="Farmer design" src="./../assets/Farmer.png">
  </template>
  
  <script>
  export default {
    name: 'FarmerCard',
    methods: {
      logData() {
        console.log("all data: ", this.kilosGrass, this.kilosBierbostel, this.kilosDDGSProticorn, this.kilosOrangePeels);
      }
    },
    data() {
      return {
        kilosGrass: 600,
        kilosBierbostel: 500,
        kilosDDGSProticorn: 300,
        kilosOrangePeels: 0
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  