<template>
    <p>This is the SupplierCard component</p>



    <br />

    <div style="display: inline-block">
      <input type="date" v-model="date" style="float: left" />
      <input type="time" v-model="time" style="float: left" />
    </div>

    <br>

    <input type="checkbox">

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

    var currentDate = ref("");
    var currentTime = ref("");

    export default {
      name: 'SupplierCard',
      methods: {
        addContribution() {
          console.log("heyy");
        }
      },
      setup() {
        const newDate = new Date();
        currentDate.value = newDate.toISOString().slice(0, 10);
        currentTime.value = newDate.toTimeString().slice(0, 5);
      },
      data() {
        return {
          notes: "",
          date: currentDate,
          time: currentTime
        }
      }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  