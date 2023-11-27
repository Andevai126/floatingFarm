<template>
    <div style="width: 500px; margin-left: auto; margin-right: auto; border: black solid 2px">

        <div style="display: inline-block; float: center">
            <p style="float: left;">Product</p>
            <input type="text" v-model="name" @input="updateExtraProduct" placeholder="Enter data" style="float: left;">
        </div>

        <br>

        <div v-if="suggestions.length > 0">
            <div v-for="suggestion in suggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
                {{ suggestion.name }} <br>
            </div>
        </div>

        <br>

        <div style="display: inline-block; float: center">
            <p style="float: left;">Hoeveelheid</p>
            <input type="number" v-model="kilos" @input="updateExtraProduct" style="float: left;">
            <p style="float: left;">kilo</p>
        </div>

    </div>

    <br>
</template>

<script>
    export default {
        name: 'ExtraProductInList',
        emits: ['updateExtraProductEvent'],
        methods: {
            selectSuggestion(suggestion) {
                this.name = suggestion.name;
                this.id = suggestion.ID;
                this.suggestions = [];
                this.updateExtraProduct();
            },
            updateExtraProduct() {
                const inputName = this.name.toLowerCase();
                this.suggestions = this.products.filter(product => product.name.toLowerCase().startsWith(inputName));
                if (inputName == '') {
                    this.suggestions = [];
                }
                if (this.suggestions.length == 1 && this.suggestions[0].name.toLowerCase() == inputName.toLowerCase()) {
                    this.name = this.suggestions[0].name;
                    this.id = this.suggestions[0].ID;
                    this.suggestions = [];
                } else {
                    this.id = null;
                }

                if (typeof this.kilos !== 'number') {
                    this.$emit('updateExtraProductEvent', {index: this.index, id: this.id, name: this.name, kilos: 0});
                } else {
                    this.$emit('updateExtraProductEvent', {index: this.index, id: this.id, name: this.name, kilos: this.kilos});
                }
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