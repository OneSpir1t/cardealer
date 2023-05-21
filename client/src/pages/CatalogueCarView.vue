<template>
    <div class="wrapper">
        <div class="spinner-border" role="status" v-if="isLoading">
            <span class="sr-only"></span>
        </div>
        <div class="order-div d-flex flex-column justify-content-center align-items-center" v-if="Equipment">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <h1>{{ $route.params.Brand }} {{ $route.params.Model }} {{ $route.params.Name }} {{ Equipment.TechnicalInformation.Yearofmanufacture }}</h1>
                <img v-if="Equipment.Image" :src="require('../assets/'+Equipment.Image)">
                <img v-else src="../assets/defaultImage.jpg">
            </div>
            <div class="m-2 container-fluid d-flex justify-content-center align-items-center">
                <iframe v-if="Equipment.Models.Video" :src="Equipment.Models.Video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div v-if="Equipment.Models.Description" class="Description container">
                <h2>Описание:</h2>
                <h2 >{{ Equipment.Models.Description }}</h2>
            </div>
            <div class="container Information">
                <h1>Подробная информация:</h1>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Наименование марки:</h2>
                    <h2 class="col">{{ Equipment.Models.Brand.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Наименование комплектации:</h2>
                    <h2 class="col">{{ Equipment.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Наименование модели:</h2>
                    <h2 class="col">{{ Equipment.Models.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Год выпуска:</h2>
                    <h2 class="col">{{ Equipment.TechnicalInformation.Yearofmanufacture }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Объем двигателя:</h2>
                    <h2 class="col">{{ Equipment.TechnicalInformation.Enginedisplacement }} л.</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Кол-во л.с.:</h2>
                    <h2 class="col">{{ Equipment.TechnicalInformation.Horsepower }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Цвет:</h2>
                    <h2 class="col">{{ Equipment.TechnicalInformation.Color.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Тип кузова:</h2>
                    <h2 class="col">{{ Equipment.TechnicalInformation.BodyType.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Кпп:</h2>
                    <h2 class="col">{{ Equipment.TechnicalInformation.Transmission.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Привод:</h2>
                    <h2 class="col">{{ Equipment.TechnicalInformation.DriveType.Title }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Кол-во мест:</h2>
                    <h2 class="col">{{ Equipment.TechnicalInformation.CountSeats }}</h2>
                </div>
                <div class="row d-flex justify-content-between align-items-center">
                    <h2 class="col">Цена:</h2>
                    <h2 class="col">{{ Equipment.Cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} ₽</h2>
                </div>
            </div>
            <div class="m-5 CallRequest">
                <div class="d-flex flex-column justify-content-center" v-if="!isCallReq">
                    <h1>Оставить заявку</h1>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Имя</label>
                        <input type="name" v-model.trim="Name" @input="InputName" maxlength="20" class="form-control" id="exampleInputName" aria-describedby="emailHelp"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Телефон</label>
                        <input type="tel" v-on:keydown.delete="InputDeleteKeyDown" @input="InputPhone" maxlength="18" v-model.trim="phone" autocomplete="tel" class="form-control" id="exampleInputPhone"/>
                    </div>
                    <button v-on:click="SendCallReq" class="btn btn-primary">Отправить</button>
                </div>    
                <div class="m-5" v-else>
                <h1>Заявка оформлена, ожидайте звонка</h1>
            </div>        
            </div>
        </div>
    </div>
</template>
<script>    
import axios from 'axios'
export default {
    data() {
        return {
            Id: 0,
            Equipment: "",
            isLoading: false,
            PassPhone: false,
            Name: '',
            phone: '',
            isCallReq: false,
        };
    },
    methods: {
        async fetchEqOne() {
            try{        
                this.isLoading = true;
                const response = await axios.get("http://localhost:3000/Equipments/" + this.Id);
                this.Equipment = response.data[0];
                this.isLoading = false
            } catch{
                
            }
        },
        InputPhone(){
            let numbers = this.phone.replace(/\D/g,'')
            let formattedNum = ''; 
            if (!numbers){
                return this.phone = ""
            }
            if(['7', '8', '9'].indexOf(numbers[0]) > -1){
                if(numbers[0] == '9'){
                    numbers = '7' + numbers
                }
                let fristSymbols = (numbers[0] === '8') ? '8' : '+7';
                formattedNum = fristSymbols + ' '
                if(numbers.length > 1){
                    formattedNum += "(" + numbers.substring(1,4);
                }
                if(numbers.length >= 5)
                {
                    formattedNum += ') ' + numbers.substring(4,7)
                }
                if(numbers.length >= 8)
                {
                    formattedNum += '-' + numbers.substring(7,9)
                }
                if(numbers.length >= 10)
                {
                    formattedNum += '-' + numbers.substring(9,11)
                }
            } else {
                formattedNum = '+' + numbers.substring(0,16)
            }
            if(numbers[0] == '7' && numbers.length == 11 || numbers[0] == '8' && numbers.length <= 12 || numbers[0] != '7' && numbers[0] != '8' && numbers.length > 11){
                this.PassPhone = true
            } else{
                this.PassPhone = false
            }
            this.phone = formattedNum        
        },
        InputDeleteKeyDown(){
            if(this.phone == 8 || this.phone == +7){
                this.phone = ''
            }
        },
        async SendCallReq(){
            if(this.PassPhone && this.Name.length > 2)
            {
                try{
                    this.phone = this.phone.replace(/\D/g,'')
                    const response = await axios.post('http://localhost:3000/CallRequests/' + this.Name + '/' + this.phone + '/' + this.Equipment.id)
                    if(response){
                        this.isCallReq = true
                        this.phone = ''
                        this.Name = ''
                    }
                    else{
                        alert('Сервер недоступен, ожидайте')
                    }
                }
                catch(e){
                    console.log(e)
                }
            }
            else{
                console.log(this.Name)
                alert('Заполните форму')
            }
        },
        InputName(){
            let str = this.Name.trim().toLowerCase().replace(/[^A-zА-я\s]/g,'')
            if(!str) return this.Name = ''
            if (str.toLowerCase()[0] == str[0]){
                str = str[0].toUpperCase() + str.substring(1,19)
            }
            this.Name = str
        }
    },
    mounted() {
        this.Id = this.$route.params.Id;
        this.fetchEqOne();
        this.input = document.getElementById('exampleInputPhone')
    },
    computed: {

    }
}

</script>
<style scoped>
    .main-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
    }

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