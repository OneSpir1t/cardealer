<template >
    <input 
        type="radio"
        :value="value" 
        @change="$emit('update:modelValue',  $event.target.value)"
        :checked="value == modelValue"
    >
</template>

<script>
export default {
    name: 'MyRadioButton',
    props:{
        value: {type: String, default: null},
        modelValue: {type: String, default: null}
    }
}
</script>

<style>

</style>