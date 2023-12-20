<template>
    <div class="container rounded border bg-light shadow p-3 mt-5 mb-3">

        <h4>Stock</h4>
        <hr>

        <!-- products -->
        <div class="row">
            <div v-for="(stockProduct, index) in filteredStockProducts" :key="index" class="col-md-4 col-sm-6">
                <ProductInformation
                    :canEdit="canEdit"
                    :stockProduct="stockProduct"
                    :index="index"
                    @updateProductInStockEvent="handleProductInStock"
                />
                <br />
            </div>
        </div>

        <!-- send -->
        <div v-if="canEdit">
            <div class="row justify-content-center mb-3">
                <button @click="updateStock" class="btn btn-primary text-dark bg-white col col-3">Save</button>
            </div>
        </div>

    </div>
</template>
  
<script>
    import { ref } from "vue";
    import ProductInformation from "./ProductInformation.vue";
    import { getStock, updateStock } from "../../../apiConfig";

    var listOfStockProducts = ref([]);

    export default {
        name: 'StockContainer',
        components: {
            ProductInformation,
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
            updateStock() {
                const stockProductsWithoutName = this.stockProducts.map(s => ({ID: s.ID, kilosInStock: s.kilosInStock}))
                this.logStockProducts();

                updateStock(stockProductsWithoutName)
                .then(() => {
                    console.log("test: stock saved!");
                })
                .catch(() => {
                    console.log("test: stock failed!");
                });
            }
        },
        props: {
            canEdit: {
                type: Boolean,
                required: true
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
                stockProducts: listOfStockProducts,
            }
        },
        computed: {
            filteredStockProducts() {
                return this.stockProducts.filter((product) => {
                    // if you can't edit the values, dont show products that aren't present, otherwise, show all products
                    return (!this.canEdit && product.kilosInStock !== 0) || this.canEdit;
                });
            },
        },
    }
</script>
