<template>
    <div class="container rounded border bg-light shadow p-3">

        <h4>Last Contributions</h4>
        <hr>

        <div class="accordion" id="accordionC">
            <div v-for="(item, index) in contributions" :key="index" class="accordion-item">

                <h2 class="accordion-header" :id="'headingC' + index">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseC' + index" :aria-expanded="index === 0 ? 'true' : 'false'" :aria-controls="'collapse' + index">
                        {{ item.supplierName }} - {{ new Date(item.dateTime).toLocaleString() }}
                    </button>
                </h2>

                <div :id="'collapseC' + index" class="accordion-collapse collapse" :class="{ 'show': index === 0 }" :aria-labelledby="'headingC' + index" data-bs-parent="#accordionC">
                    <div class="accordion-body">
                        <strong>DateTime of Transport: </strong> {{ new Date(item.dateTimeOfTransport).toLocaleString() }}<br>
                        <strong>Supplier Notes: </strong> {{ item.supplierNotes }}
                        <!-- Loop through products -->
                        <ul>
                            <li v-for="(product, productIndex) in item.products" :key="productIndex">
                                <strong>{{ product.productName }}:</strong> {{ product.quantity }} in {{ product.containerName }}
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import { ref } from 'vue';
    import { getContributions } from '../../../apiConfig';
    
    var listOfContributions = ref([]);

    export default {
        name: 'LastContributions',
        setup() {
            // Set a default for the contributions value in return data
            getContributions().then((contributions) => {
                listOfContributions.value = contributions;
            });
        },
        data() {
            return {
                contributions: listOfContributions
            };
        }
    }
</script>
