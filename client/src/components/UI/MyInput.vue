<template >
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
    name: 'MyInput',
    props:{
        modelValue: {String, Number, Array}
    },
    methods: {
        updateInput(event){
            this.$emit('update:modelValue', event.target.value)
        }

    },
}
</script>

<style >
    .input{
        border-color: green;
        border-radius: 8px;
        margin: 2px;      
    }
</style>