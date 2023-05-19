<template>
    <div class="container-fluid" @click="hideDialog">
        <div class="d-flex">
            <div class="p-2 left d-flex flex-column justify-content-start"> 
                <div class="form-group">
                    <label class="m-2">Поиск:</label>
                    <MyInput
                        v-model.trim="searchQuery"
                    />
                </div>
                <div class="form-group">
                    <label>Марка:</label>
                    <MySelect
                        v-model="selectedBrand"
                        :options="optionsBrand"
                    />  
                </div>
                <div class="form-group">
                    <label>Модель:</label>
                    <MySelect  
                        v-if="optionsModel.length > 1"              
                        v-model="selectedModel"
                        :options="optionsModel"                            
                    /> 
                    <MySelect  
                        disabled
                        v-else                                         
                    /> 
                </div>
                <div class="form-group">
                    <label>Сортировка:</label>          
                    <MySelect
                        v-model="selectedSort"
                        :options="optionsSort"
                    />
                </div>
                <div class="d-flex flex-column justify-content-between align-item-center">
                    <label>Цена:</label>                  
                    <div class="range-slider">
                        <input type="range" min="500000" @change="setRangeSlider" max="55000000" step="100000" v-model.number="MinCost">
                        <input type="range" min="500000" @change="setRangeSlider" max="55000000" step="100000" v-model.number="MaxCost">
                    </div>
                </div>
                <div class="range-values d-flex flex-row justify-content-between align-item-center">
                    <p>От: {{ MinCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</p>
                    <p>До: {{ MaxCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</p>
                </div>
                <div class="checkboxBodyType">
                    <h4>Тип кузова:</h4>
                    <div v-for="BodyType in optionsBodyType" class="form-check">
                        <input class="form-check-input" :value="BodyType.Title" v-model="selectedBodyTypes" type="checkbox" :id="BodyType.id"/>
                        <label class="form-check-label" :for="BodyType.id">
                            {{ BodyType.Title }}
                        </label>
                    </div>
                </div>
            </div>              
            <div class="flex-fill Cars-View text-center flex-column d-flex justify-content-center align-items-center">
                <div>       
                    <EquipmentList :eq="resultEq" v-if="!isLoading"/>
                </div>
                <div class="spinner-border" role="status" v-if="isLoading">
                    <span class="sr-only"></span>
                </div>
                <div v-if="resultEq.length > 0 && totalpage > 1" class="d-flex flex-wrap justify-content-center align-items-center" id="demo">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" @click="changePage(page-1)" href="#">Previous</a></li>
                            <li class="page-item" :class="{'active': page === Currentpage}" @click="changePage(Currentpage)" v-for="Currentpage in totalpage" :key="Currentpage"><a class="page-link" href="#">{{ Currentpage }}</a></li>
                            <li class="page-item"><a class="page-link" @click="changePage(page+1)" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import EquipmentList from '@/components/EquipmentsList.vue'
import MyInput from '@/components/UI/MyInput.vue'

export default {
    name: 'Catalogue',
    components: {
    EquipmentList,
    MyInput
},
    data(){
        return {
            eq: [],           
            isLoading: false,
            dialogVisible: false,
            selectedSort: '',
            selectedBrand: '',
            selectedModel: '',
            searchQuery: '',
            selectedBodyTypes: [],
            optionsBrand: [],
            optionsModel: [],
            optionsBodyType: [],
            MaxCost: 55000000,
            MinCost: 500000,
            page: 1,
            totalpage: 0,
            limit: 9,
            optionsSort: [
                {value: 'Cost', Title: 'Сначала дешевые'},
                {value: 'Costdesc', Title: 'Сначала дорогие'}
            ]
        }
        
    },  
    methods:{

        showDialog(){
            this.dialogVisible = true
        },
        async fetchEq(){
            try{
                this.isLoading = true;
                const response = await axios.get("http://localhost:3000/Equipments")
                this.eq = response.data  
                this.isLoading = false;
            }
            catch(e){
                console.log(e)
            } finally { 
            }
        },
        async fetchBrands(){
            try{
                this.isLoading = true;
                const response = await axios.get('http://localhost:3000/Brands')
                this.optionsBrand = response.data    
                this.isLoading = false;      

            }
            catch(e){
                console.log(e)
            }
        },
        async fetchBodyTypes(){
            try{
                const response = await axios.get('http://localhost:3000/BodyTypes')
                this.optionsBodyType = response.data
            }
            catch(e){
                console.log(e)
            }
        },
        async UpdateList(){
            this.fetchEq()
            this.fetchBrands()
            this.fetchBodyTypes()
        },
        changePage(Currentpage){
            if(Currentpage <= this.totalpage && Currentpage >= 1)
            {          
                this.page = Currentpage
            }            
        },
        setRangeSlider(){
            if(this.MinCost > this.MaxCost){
                let pr1 = this.MaxCost
                this.MaxCost = this.MinCost
                this.MinCost = pr1
            }
        }
    },
    mounted() {
        this.UpdateList()
    }, 
    computed: {
        resultEq(){
            let equipments = this.eq       
            let sel1 = this.selectedBrand  
            let sel2 = this.selectedModel   
            let optionsModels = []    
            let min = this.MinCost
            let max = this.MaxCost
            let selBody = this.selectedBodyTypes
            if(selBody.length > 0)
            {
                equipments = equipments.filter(function (equip){
                    for (let index = 0; index < selBody.length; index++) {
                        return equip.TechnicalInformation.BodyType.Title == selBody[index];              
                    }
                })
            }   
            if(this.MinCost > this.MaxCost){
                let pr1 = this.MaxCost
                this.MaxCost = this.MinCost
                this.MinCost = pr1
            }
            if(min >= 0)
            {
                equipments = equipments.filter(function (equip){
                    return equip.Cost > min && equip.Cost < max
                })           
            }
            else{
                this.MinCost = 0
            }
            if (this.selectedBrand !== '')
            {        
                equipments = equipments.filter(function (equip){
                    return equip.Models.Brand.Title == sel1
                })
                equipments.forEach(equip => {
                    optionsModels.push(equip.Models)
                });
                optionsModels = optionsModels.reduce((o, i) => {
                    if (!o.find(v => v.Title == i.Title)) {
                        o.push(i);
                    }
                    return o;
                }, []);   
                if(this.optionsModel[0] !== optionsModels[0])
                {
                    this.changePage(1)
                    this.optionsModel = optionsModels 
                    this.selectedModel = ''
                    sel2 = ''
                }
                if (this.selectedModel !== ''){
                    equipments = equipments.filter(function (equip){
                        return equip.Models.Title == sel2
                    })
                }
                
            }
            if(this.selectedBrand == '')
            {
                this.selectedModel = ''
                this.optionsModel = ''
            }
            if(this.selectedSort != '')
            {
                if(this.selectedSort  == 'Сначала дешевые')
                {
                    equipments.sort((a, b) => {
                        return a.Cost - b.Cost;
                    });
                }      
                if(this.selectedSort  == 'Сначала дорогие')
                {
                    equipments.sort((a, b) => {
                        return b.Cost - a.Cost;
                    });
                }  
            }
            else {
                equipments.sort((a, b) => {
                    return a.id - b.id;
                });
            }
            equipments = equipments.filter(equip => equip.Title.toLowerCase().trim().includes(this.searchQuery.toLowerCase()) || equip.Models.Title.toLowerCase().trim().includes(this.searchQuery.toLowerCase()) || equip.Models.Brand.Title.toLowerCase().trim().includes(this.searchQuery.toLowerCase())) 
            this.totalpage = Math.ceil(equipments.length / this.limit)
            if(this.page > this.totalpage)
            {
                this.changePage(1)
            }
            let startIndex = (this.page - 1) * this.limit
            let endIndex = this.page * this.limit
            return equipments.slice(startIndex, endIndex)
        }
    }
}
</script>

<style>
    .range-slider{
        margin: 20px 16px;
        text-align: center;
        position: relative;
    }

    .range-slider svg, .range-slider input[type=range]{
        position: absolute;
        left: 0;
        bottom: 0;
    }

    input[type=range]::-webkit-slider-thumb{
        z-index: 2;
        position: relative;
        top: 2px;
        margin-top: -7px;
    }

    .left{
        background-color: whitesmoke;
    }

    .form-check-input{
        border-width: 2px;
    }
</style>
