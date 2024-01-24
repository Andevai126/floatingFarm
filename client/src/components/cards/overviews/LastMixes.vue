<template>
    <div class="container rounded border bg-light shadow p-3">

        <h4>Last Mixes</h4>
        <hr>

        <div class="accordion" id="accordionM">
            <div v-for="(item, index) in mixes" :key="index" class="accordion-item">

                <h2 class="accordion-header" :id="'headingM' + index">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseM' + index" :aria-expanded="index === 0 ? 'true' : 'false'" :aria-controls="'collapse' + index">
                            {{ new Date(item.dateTime).toLocaleString() }}
                    </button>
                </h2>

                <div :id="'collapseM' + index" class="accordion-collapse collapse" :class="{ 'show': index === 0 }" :aria-labelledby="'headingM' + index" data-bs-parent="#accordionM">
                    <div class="accordion-body">
                        <strong>Notes: </strong> {{ item.notes }}
                        <!-- Loop through products -->
                        <ul>
                            <li v-for="(product, productIndex) in item.products" :key="productIndex">
                                <strong>{{ product.productName }}:</strong> {{ product.kilos }}
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
    import { getMixes } from '../../../apiConfig';
    
    var listOfMixes = ref([]);

    export default {
        name: 'LastMixes',
        setup() {
            // Set a default for the mixes value in return data
            getMixes().then((mixes) => {
                listOfMixes.value = mixes;
            });
        },
        data() {
            return {
                mixes: listOfMixes
            };
        }
    }
</script>
