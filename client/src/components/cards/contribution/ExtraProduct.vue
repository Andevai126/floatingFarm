<template>
    <div class="row justify-content-md-center">
        <div class="container rounded border col col-6 pt-3 mb-3">
            <p>Product</p>

            <!-- input product name -->
            <div class="input-group mb-3">
                <label class="input-group-text">Name</label>
                <input type="text" v-model="name" @input="nameChanged" class="form-control">
            </div>

            <!-- input product name suggestions -->
            <div v-if="suggestions.length > 0">
                <div v-for="suggestion in suggestions" :key="suggestion.id" @click="suggestionSelected(suggestion)">
                    {{ suggestion.name }} <br>
                </div>
            </div>

            <p>Volume</p>
            
            <!-- input quantity -->
            <div class="input-group mb-3">
                <label class="input-group-text">Quantity</label>
                <input type="number" v-model="quantity" @input="quantityChanged" class="form-control no-spinners">
            </div>

            <!-- input container name -->
            <div class="input-group mb-3">
                <label class="input-group-text">Unit</label>
                <input type="text" v-model="containerName" @input="containerNameChanged" class="form-control">
            </div>

            <!-- input container name suggestions -->
            <div v-if="containerSuggestions.length > 0">
                <div v-for="containerSuggestion in containerSuggestions" :key="containerSuggestion.id" @click="containerSuggestionSelected(containerSuggestion)">
                    {{ containerSuggestion.name }} ({{ containerSuggestion.litres }} liter)<br>
                </div>
            </div>    

        </div>
    </div>
</template>

<script>
    export default {
        name: 'ExtraProduct',
        emits: ['updateExtraProductEvent'],
        methods: {
            nameChanged() {
                const inputName = this.name.toLowerCase();

                // Update suggestions
                this.suggestions = (inputName == '') ? [] : this.products.filter(product => {
                    const productName = product.name.toLowerCase();
                    var currentIndex = 0;

                    for (const char of inputName) {
                        const charIndex = productName.indexOf(char, currentIndex);
                        // Character not found or not in the correct order
                        if (charIndex === -1) {
                        return false;
                        }
                        // Move the current index for the next iteration
                        currentIndex = charIndex + 1;
                    }
                    // All characters found in the correct order
                    return true;
                });

                // Silently check if last remaining suggestion matches
                if (this.suggestions.length == 1 && this.suggestions[0].name.toLowerCase() == inputName) {
                    this.suggestionSelected(this.suggestions[0]);
                } else {
                    this.id = null;
                    this.updateExtraProduct();
                }
            },
            suggestionSelected(suggestion) {
                this.name = suggestion.name;
                this.id = suggestion.ID;
                this.suggestions = [];
                this.updateExtraProduct();
            },
            quantityChanged() {
                this.updateExtraProduct();
            },
            containerNameChanged() {
                const inputName = this.containerName.toLowerCase();

                // Update suggestions
                this.containerSuggestions = (inputName == '') ? [] : this.containers.filter(container => {
                    const containerName = container.name.toLowerCase();
                    var currentIndex = 0;

                    for (const char of inputName) {
                        const charIndex = containerName.indexOf(char, currentIndex);
                        // Character not found or not in the correct order
                        if (charIndex === -1) {
                        return false;
                        }
                        // Move the current index for the next iteration
                        currentIndex = charIndex + 1;
                    }
                    // All characters found in the correct order
                    return true;
                });

                // Silently check if last remaining suggestion matches
                if (this.containerSuggestions.length == 1 && this.containerSuggestions[0].name.toLowerCase() == inputName) {
                    this.containerSuggestionSelected(this.containerSuggestions[0]);
                } else {
                    this.containerId = null;
                    this.updateExtraProduct();
                }
            },
            containerSuggestionSelected(containerSuggestion) {
                this.containerName = containerSuggestion.name;
                this.containerId = containerSuggestion.ID;
                this.containerSuggestions = [];
                this.updateExtraProduct();
            },
            updateExtraProduct() {
                // check for extra spaces in this.name ?
                const quantity = (typeof this.quantity === 'number') ? this.quantity : 0;
                this.$emit('updateExtraProductEvent', {index: this.index, id: this.id, name: this.name, quantity: quantity, containerId: this.containerId, containerName: this.containerName});
            }
        },
        props: {
            products: {
                type: Object,
                required: true
            },
            containers: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                suggestions: [],
                id: null,
                name: '',

                quantity: 0,
                
                containerSuggestions: [], // show all options instead?
                containerId: null,
                containerName: '',
            }
        }
    };
</script>
