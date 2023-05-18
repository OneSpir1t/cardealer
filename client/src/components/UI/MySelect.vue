 <template>
   <select class="form-select" :value="modelValue" @change="changeOption">
      <option value="">Выберите из списка</option>
      <option v-for="option in options" :key="option.Title" :value="option.Title">
         {{ option.Title }}
      </option>
   </select>
 </template>

 <script>
 export default {
   name: 'MySelect',
   props:{
      modelValue: {
         type: String
      },
      options: {
         type: Array,
         default: () => []
      }
   },
   methods: {
      changeOption(event){
         this.$emit('update:modelValue', event.target.value)
      }
   }
 }
 </script>

 <style scoped>
    
 </style>