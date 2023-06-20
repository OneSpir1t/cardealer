<template >
    <input 
    :value="value" 
    :checked="modelValue.includes(value)" 
    @change="event => onChange(event.target.value)"
    class="input" 
    type="checkbox">
</template>

<script>
export default {
    name: 'MyCheckBox',
    props:{
        value: {type: String, default: null},
        modelValue: {type: Array, default: () => []}
    },
    methods: {
        onChange(value){
            if (this.modelValue.includes(this.value)) {
                this.$emit('update:modelValue', this.modelValue.filter(cv => cv !== value))
            }
            else {
                this.$emit('update:modelValue', this.modelValue.concat(value))
            }
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