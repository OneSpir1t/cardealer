<template >
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="input" type="text">
</template>

<script>
export default {
    name: 'MyInput',
    props:{
        modelValue: {type: String, default: null,}
    }
}
</script>

<style >
    .input{
        border-color: green;
        border-radius: 8px;
        margin: 2px;      
    }
</style>