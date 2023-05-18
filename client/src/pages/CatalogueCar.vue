<template>
    <div>
        <h2>{{ $route.params.Brand }} {{ $route.params.Brand }} {{ $route.params.Model }}</h2>
        <img src="../assets/" +{{  }}>
    </div>
</template>
<script>

export default {
    methods: {
        async fetchEq(){
            const response = await axios.get('http://localhost:3000/Equipments/')
        }
    },
    mounted(){
        this.fetchEq()
    }
}

</script>
<style>
    
</style>