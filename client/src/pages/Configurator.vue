<template>
    <div class="d-flex flex-column align-items-center">
        <h1 class="text-center">Конфигуратор</h1>
        <div class="d-flex justify-content-center">
            <button class="btn btn-primary text-center m-1" @click="currenttab = 'ChooseBrand'" title="First" active><p>Выберите бренд</p></button>
            <button class="btn btn-primary m-1" @click="currenttab = 'ChooseModel'" :class="{disabled: selectedBrand == ''}" title="Second"><p>Выберите модель</p></button>
            <button class="btn btn-primary m-1" @click="currenttab = 'ChooseСomplectation'" :class="{disabled: selectedModel == ''}"  title="Third"><p>Выберите комплектацию</p></button>
        </div>
        <div>{{ CurentAuto }}</div>
        <div class="spinner-border" role="status" v-if="isLoading">
            <span class="sr-only"></span>
        </div>
        <div class="ChooseBrand flex-column  justify-content-center" v-if="Brands.length > 0 && currenttab == 'ChooseBrand'" > 
            <h3 class="">Выберите марку</h3>
            <div class="d-inline-flex align-items-center justify-content-center" v-for="item in Brands">
                <button @click="selectedBrand = item.Title" class="btn btn-outline-dark Brand-Item m-2">{{ item.Title }}</button>
            </div>
        </div>
        <div class="ChooseModel flex-column justify-content-center" v-if="selectedBrandModels.length > 0 && currenttab == 'ChooseModel'">
            <h3 class="">Выберите модель</h3>
            <div class="d-inline-flex align-items-center justify-content-center" v-for="item in selectedBrandModels">
                <button @click="selectedModel = item.Title" class="btn btn-outline-dark Brand-Item m-2">{{ item.Title }}</button>
            </div>
        </div>
        <div class="ChooseModel flex-column justify-content-center" v-if="selectedBrandModels.length == 0 && currenttab == 'ChooseModel'">
            <h1>Нет комплектаций, доступных к заказу</h1>
        </div>
        <div class="ChooseСomplectation flex-column justify-content-center" disabled v-if="selectedModelComplectations.length > 0 && currenttab == 'ChooseСomplectation'">
            <h3 class="">Выберите комплектацию</h3>
            <div class="d-inline-flex align-items-center justify-content-center" v-for="item in selectedModelComplectations">
                <button @click="selectedComplectation = item" class="btn btn-outline-dark Brand-Item m-2">
                    <div class="d-flex flex-column">
                        <div>{{ item.Title }}</div>
                        <div> Цвет: {{ item.TechnicalInformation.Color.Title}}</div>
                    </div>
                </button>
            </div>
        </div>
        <div class="ChooseСomplectation flex-column justify-content-center" v-if="selectedModelComplectations.length == 0 && currenttab == 'ChooseСomplectation'">
            <h1>Нет комплектаций, доступных к заказу</h1>
        </div>
        <div class="m-5 CallRequest" v-if="selectedComplectation != ''">
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
        <div class="Previev-Config" v-if="CurrentEq">
            <img v-if="CurrentEq.Image" class="img-fluid img-car" :src="require('@/assets/'+CurrentEq.Image)">       
            <img v-else class="img-fluid img-car" src="../assets/defaultImage.jpg">  
            <div> Тип кузова: {{ CurrentEq.TechnicalInformation.BodyType.Title }}</div>
            <div> Коробка: {{ CurrentEq.TechnicalInformation.Transmission.Title }}</div>
            <div> Тип привода: {{ CurrentEq.TechnicalInformation.DriveType.Title }}</div>
            <div> л.с.: {{ CurrentEq.TechnicalInformation.Horsepower }}</div>
            <div> Объем двигателя: {{ CurrentEq.TechnicalInformation.Enginedisplacement }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    
    data(){
        return {    
            CurrentEq: '',
            CurentAuto: '',
            eq: [],  
            currenttab: '',
            isLoading: false,
            selectedBrand: '',
            Brands: [],
            Models: [],
            selectedModel: [],
            complectations: [],
            selectedBrandModels: [],
            selectedModelComplectations: [],
            selectedComplectation: [],
            isCallReq: false,
            PassPhone: false,
            Name: '',
            phone: '',
        }
        
    },  
    methods: {
        async fetchBrands(){
            try{
                this.isLoading = true
                const response = await axios.get("http://localhost:3000/Brands")               
                this.Brands = response.data
                this.isLoading = false
            }
            catch(e){
                console.log(e)
            }
        },
        async fetchModels(){
            try{
                this.isLoading = true
                const response = await axios.get("http://localhost:3000/Models")               
                this.Models = response.data
                this.isLoading = false
            }
            catch(e){
                console.log(e)
            }
        },
        async fetchEq(){
            try{
                this.isLoading = true
                const response = await axios.get("http://localhost:3000/Equipments")               
                this.eq = response.data
                this.isLoading = false
            }
            catch(e){
                console.log(e)
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
                    let sel1 = this.selectedBrand;
                    let sel2 = this.selectedModel;
                    let sel3 = this.selectedComplectation;
                    this.phone = this.phone.replace(/\D/g,'')
                    
                    const response = await axios.post('http://localhost:3000/CallRequests/' + this.Name + '/' + this.phone + '/' + this.CurrentEq.id)
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
    watch:{
        selectedBrand(){
            let sel1 = this.selectedBrand
            let oldselBM = this.selectedBrandModels
            let minPrices = [];
            if(this.selectedBrand != '')
            {
                this.currenttab = 'ChooseModel'
                this.selectedBrandModels = this.Models.filter(function(model){
                    return model.Brand.Title == sel1
                })
                this.selectedBrandModels = this.selectedBrandModels.reduce((o, i) => {
                    if (!o.find(v => v.Title == i.Title)) {
                        o.push(i);
                    }
                    return o;
                }, []); 
                minPrices = this.eq.filter(function(equip){
                    return equip.Models.Brand.Title == sel1
                })
                this.minPrices = minPrices.reduce((o, i) => {
                    if (!o.find(v => v.Models.Title == i.Models.Title)) {                                             
                        o.push(i);
                    }
                    return o;
                }, []);
                if(oldselBM != this.selectedBrandModels){
                    this.selectedModel = ''
                    this.selectedComplectation = ''
                }
            }
            this.CurentAuto = this.selectedBrand
        },
        selectedModel(){
            if(this.selectedModel != '')
            {
                let oldselMC = this.selectedModelComplectations
                let sel1 = this.selectedModel;
                let sel2 = this.selectedBrand;
                this.currenttab = 'ChooseСomplectation'
                console.table(JSON.stringify(this.eq))
                this.selectedModelComplectations = this.eq.filter(function(equip){
                    return equip.Models.Title == sel1 && equip.Models.Brand.Title == sel2
                })
                // this.selectedModelComplectations = this.selectedModelComplectations.reduce((o, i) => {
                //     if (!o.find(v => v.Title == i.Title)) {                                             
                //         o.push(i);
                //     }
                //     return o;
                // }, []);
                if(oldselMC != this.selectedModelComplectations){                   
                    this.selectedComplectation = ''
                }
            }
            this.CurentAuto = this.selectedBrand + ' ' + this.selectedModel;
        },
        selectedComplectation(){
            // let sel1 = this.selectedBrand;
            // let sel2 = this.selectedModel;
            // let sel3 = this.selectedComplectation;
            // this.CurentAuto = this.selectedBrand + ' ' + this.selectedModel + ' ' + this.selectedComplectation;
            // this.CurrentEq = this.eq.filter(function(equip){
            //     return equip.Models.Brand.Title == sel1 && equip.Models.Title == sel2 && equip.Title == sel3
            // })
            this.CurrentEq = this.selectedComplectation
        },
    },
    mounted(){
        this.fetchBrands()
        this.fetchEq()
        this.fetchModels()
        this.currenttab = 'ChooseBrand'
    },
}
</script>

<style>
    
</style>