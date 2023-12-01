<template>
    <div style="width: 500px; margin-left: auto; margin-right: auto; border: black solid 2px">

        <div style="display: inline-block; float: center">
            <p style="float: left;">Product</p>
            <input type="text" v-model="name" @input="nameChanged" placeholder="Enter data" style="float: left;">
        </div>

        <br>

        <div v-if="suggestions.length > 0">
            <div v-for="suggestion in suggestions" :key="suggestion.id" @click="suggestionSelected(suggestion)">
                {{ suggestion.name }} <br>
            </div>
        </div>

        <br>

        <div style="display: inline-block; float: center">
            <p style="float: left;">Hoeveelheid</p>
            <input type="number" v-model="kilos" @input="kilosChanged" style="float: left;">
            <p style="float: left;">kilo</p>
        </div>

    </div>

    <br>
</template>

<script>
    export default {
        name: 'ExtraProductInFarmer',
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
            kilosChanged() {
                this.updateExtraProduct();
            },
            updateExtraProduct() {
                const kilos = (typeof this.kilos === 'number') ? this.kilos : 0;
                this.$emit('updateExtraProductEvent', {index: this.index, id: this.id, name: this.name, kilos: kilos});
            }
        },
        props: {
            products: {
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
                kilos: 0
            }
        }
    };
</script>