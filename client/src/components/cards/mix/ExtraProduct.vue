<template>
    <div class="row justify-content-md-center">
        <div class="container rounded border col col-6 pt-3 mb-3">
            <p>Extra Product</p>
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
        
            <!-- input weight -->
            <div class="input-group mb-3">
                <input type="number" v-model="kilos" @input="kilosChanged" class="form-control no-spinners">
                <label class="input-group-text">Kilo</label>
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
