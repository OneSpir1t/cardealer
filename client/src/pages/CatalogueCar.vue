<template>
    <div>
        <div class="order-div d-flex flex-column justify-content-center align-items-center" v-if="Equipment">
            <img v-if="Equipment.Image" :src="require('../assets/'+Equipment.Image)">
            <img v-else src="../assets/defaultImage.jpg">
            <h1>{{ $route.params.Brand }} {{ $route.params.Model }} {{ $route.params.Name }} {{ Equipment.TechnicalInformation.Yearofmanufacture }}</h1>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return{
            Id: 0,
            Equipment: ''
        }
    },  
    methods: {
        async fetchEqOne(){
            const response = await axios.get('http://localhost:3000/Equipments/' + this.Id)
            this.Equipment = response.data[0]
            console.log(this.Equipment)
        }
    },
    mounted(){
        this.Id = this.$route.params.Id
        this.fetchEqOne()
    }
}

</script>
<style>
    img{
        width: 1050px;
        height: 650px;
        object-fit: cover;
    }
    .order-div{
        margin-top: 20px;
    }
</style>