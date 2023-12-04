<template>
    <div style="width: 500px; margin-left: auto; margin-right: auto; border: black solid 2px">

        <!-- Product name selection -->
        <div style="display: inline-block; float: center">
            <p style="float: left;">Product</p>
            <input type="text" v-model="name" @input="nameChanged" placeholder="Enter data" style="float: left;">
        </div>

        <br>

        <!-- Product name suggestions -->
        <div v-if="suggestions.length > 0">
            <div v-for="suggestion in suggestions" :key="suggestion.id" @click="suggestionSelected(suggestion)">
                {{ suggestion.name }} <br>
            </div>
        </div>

        <br>

        <div style="display: inline-block; float: center">
            <!-- Quantity -->
            <p style="float: left;">Hoeveelheid</p>
            <input type="number" v-model="quantity" @input="quantityChanged" style="float: left;">
            <!-- Container name selection -->
            <input type="text" v-model="containerName" @input="containerNameChanged" placeholder="Enter data" style="float: left;">
        </div>

        <br>

        <!-- Container name suggestions -->
        <div v-if="containerSuggestions.length > 0">
            <div v-for="containerSuggestion in containerSuggestions" :key="containerSuggestion.id" @click="containerSuggestionSelected(containerSuggestion)">
                {{ containerSuggestion.name }} ({{ containerSuggestion.litres }} liter)<br>
            </div>
        </div>

    </div>

    <br>
</template>

<script>
    export default {
        name: 'ExtraProductInSupplier',
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