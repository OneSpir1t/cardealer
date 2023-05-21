<template>
    <div class="container-fluid">
        <div class="order-div d-flex flex-column justify-content-center align-items-center" v-if="AvailableCar">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <h1>{{ $route.params.Brand }} {{ $route.params.Model }} {{ $route.params.Name }} {{ AvailableCar.Equipment.TechnicalInformation.Yearofmanufacture }}</h1>
                <img v-if="AvailableCar.Equipment.Image" :src="require('../assets/'+AvailableCar.Equipment.Image)">
                <img v-else src="../assets/defaultImage.jpg">
            </div>
            <div class="m-2 container-fluid d-flex justify-content-center align-items-center">
                <iframe v-if="AvailableCar.Equipment.Models.Video" :src="AvailableCar.Equipment.Models.Video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div v-if="AvailableCar.Equipment.Models.Description" class="Description container">
                <h2>Описание:</h2>
                <h2 >{{ AvailableCar.Equipment.Models.Description }}</h2>
            </div>
            <div class="container Information">
                <h1>Подробная информация:</h1>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Наименование марки:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.Models.Brand.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Наименование комплектации:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Наименование модели:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.Models.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Год выпуска:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.TechnicalInformation.Yearofmanufacture }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Объем двигателя:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.TechnicalInformation.Enginedisplacement }} л.</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Кол-во л.с.:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.TechnicalInformation.Horsepower }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Цвет:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.TechnicalInformation.Color.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Тип кузова:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.TechnicalInformation.BodyType.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Кпп:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.TechnicalInformation.Transmission.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Привод:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.TechnicalInformation.DriveType.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Кол-во мест:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.TechnicalInformation.CountSeats }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Владельцев:</h2>
                    <h2 class="col">{{ AvailableCar.Owners }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Пробег:</h2>
                    <h2 class="col">{{ AvailableCar.MileAge }} км</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Цена:</h2>
                    <h2 class="col">{{ AvailableCar.Equipment.Cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} ₽</h2>
                </div>
            </div>
            <div class="m-5 CallRequest ">
                <h1>Оставить заявку</h1>
                <form class="d-flex flex-column justify-content-center">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Имя</label>
                        <input type="name" class="form-control" id="exampleInputName" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Телефон</label>
                        <input type="phone" class="form-control" id="exampleInputPhone">
                    </div>
                    <button type="submit" class="btn btn-primary">Отправить</button>
                </form>


            </div>
        </div>
        <div class="container-fluid h-100 d-flex justify-content-center align-items-center" v-else>Ничего не найдено</div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return{
            Id: 0,
            AvailableCar: ''
        }
    },  
    methods: {
        async fetchAcOne(){
            const response = await axios.get('http://localhost:3000/availablecars/' + this.Id)
            this.AvailableCar = response.data[0]
        }
    },
    mounted(){
        this.Id = this.$route.params.Id
        this.fetchAcOne()
    }
}

</script>
<style scoped>
    img{
        width: 1050px;
        height: 650px;
        object-fit: cover;
        margin: 2px;
    }
    .order-div{
        margin-top: 20px;
    }
    .row{
        border-collapse: collapse;
        border: 1px solid black;
    }
    .col{
        border-left: 1px solid black;
        padding: 3px;
        margin: 0;
    }
    .container{
        margin: 5px;
        margin-bottom: 20px;
    }

    iframe{
        min-width: 560px;
        min-height: 316px;
    }

    .Information{
        margin: 10px;
    }

    .CallRequest{
        background-color: white;
        border-radius: 10px;
        padding: 10px;
    }
</style>