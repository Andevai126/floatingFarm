<template>
    <div class="container rounded border bg-light shadow p-3 mt-5 mb-3">
        <h4>Stock</h4>
        <hr>

        <div class="row">
            <div v-for="(stockProduct, index) in stockProducts" :key="index" class="col-md-4 col-sm-6">
                <ProductInStock
                    :stockProduct="stockProduct"
                    :index="index"
                    @updateProductInStockEvent="handleProductInStock"
                />
                <br />
            </div>
        </div>

        <!-- send -->
        <div v-if="roleId==2 || roleId==5">
            <div class="row justify-content-center mb-3">
                <button @click="saveStock" class="btn btn-primary text-dark bg-white col col-3">Send</button>
            </div>
        </div>

        <!-- <img alt="Unpacker design" src="./../assets/SupplierRightSide.png"> -->
    </div>
</template>
  
<script>
    import { ref } from "vue";
    import ProductInStock from "./ProductInStock.vue";
    import { store } from "./../../store";
    import { getStock } from "./../../apiConfig";

    var listOfStockProducts = ref([]);


    export default {
        name: 'StockCard',
        components: {
            ProductInStock,
        },
        methods: {
            logStockProducts() {
                this.stockProducts.forEach((stockProduct) => {
                console.log(stockProduct.ID, stockProduct.name, stockProduct.kilosInStock);
                });
            },
            handleProductInStock(stockProduct) {
                this.stockProducts[stockProduct.index] = { ID: stockProduct.ID, name: stockProduct.name, kilosInStock: stockProduct.kilosInStock };
                this.logStockProducts();
            },
            saveStock() {
                console.log("test: stock saved!");
            }
        },
        setup() {
            getStock().then((stockProducts) => {
                console.log("retrieved stock products: ", stockProducts);
                listOfStockProducts.value = stockProducts;
            });
        },
        data() {
            return {
                roleId: store.roleId,
                stockProducts: listOfStockProducts,
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  