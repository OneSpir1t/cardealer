<template>
    <div class="container-fluid" @click="hideDialog">
        <div class="d-flex">
            <div class="p-2 left d-flex flex-column justify-content-start" v-if="!isLoading"> 
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
                        v-if="optionsModel.length > 0"              
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
                <div class="checkboxBodyTypes">
                    <h4>Тип кузова:</h4>
                    <div v-for="BodyType in optionsBodyType" class="form-check">
                        <input class="form-check-input" :value="BodyType.Title" v-model="selectedBodyTypes" type="checkbox" :id="BodyType.Title+BodyType.id"/>
                        <label class="form-check-label" :for="BodyType.Title+BodyType.id">
                            {{ BodyType.Title }}
                        </label>
                    </div>
                </div>
                <div class="checkboxEngineTypes">
                    <h4>Тип двигателя:</h4>
                    <div v-for="EngineType in optionsEngineType" class="form-check">
                        <input class="form-check-input" :value="EngineType.Title" v-model="selectedEngineTypes" type="checkbox" :id="EngineType.id"/>
                        <label class="form-check-label" :for="EngineType.id">
                            {{ EngineType.Title }}
                        </label>
                    </div>
                </div>
                <div class="checkboxColors ">
                    <h4>Цвет:</h4>
                    <div v-for="Color in optionsColor" class="form-check">
                        <input class="form-check-input" :value="Color.Title" v-model="selectedColors" type="checkbox" :id="Color.Title+Color.id"/>
                        <label class="form-check-label" :for="Color.Title+Color.id">
                            {{ Color.Title }}
                        </label>
                    </div>
                </div>
                <div class="checkboxTransmissions">
                    <h4>Коробка:</h4>
                    <div v-for="Transmission in optionsTransmission" class="form-check">
                        <input class="form-check-input" :value="Transmission.Title" v-model="selectedTransmissions" type="checkbox" :id="Transmission.Title+Transmission.id"/>
                        <label class="form-check-label" :for="Transmission.Title+Transmission.id">
                            {{ Transmission.Title }}
                        </label>
                    </div>
                </div>
                <div class="checkboxDriveTypes">
                    <h4>Привод:</h4>
                    <div v-for="DriveType in optionsDriveType" class="form-check">
                        <input class="form-check-input" :value="DriveType.Title" v-model="selectedDriveTypes" type="checkbox" :id="DriveType.Title+DriveType.id"/>
                        <label class="form-check-label" :for="DriveType.Title+DriveType.id">
                            {{ DriveType.Title }}
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
                            <li class="page-item"><a class="page-link" @click="changePage(page-1)" href="#">Предыдущая</a></li>
                            <li class="page-item" :class="{'active': page === Currentpage}" @click="changePage(Currentpage)" v-for="Currentpage in totalpage" :key="Currentpage"><a class="page-link" href="#">{{ Currentpage }}</a></li>
                            <li class="page-item"><a class="page-link" @click="changePage(page+1)" href="#">Следующая</a></li>
                        </ul>
                    </nav>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import EquipmentList from '@/components/EquipmentsList.vue'
import axios from 'axios'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'Catalogue',
    components: {
    EquipmentList,
},
    data(){
        return {
            eq: [],           
            isLoading: false,
            selectedSort: '',
            selectedBrand: '',
            selectedModel: '',
            searchQuery: '',
            selectedBodyTypes: [],
            selectedEngineTypes: [],
            selectedColors: [],
            selectedTransmissions: [],
            selectedDriveTypes: [],
            optionsBrand: [],
            optionsModel: [],
            optionsBodyType: [],
            optionsColor: [],
            optionsEngineType:[],
            optionsTransmission:[],
            optionsDriveType: [],
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
        async fetchEq(){
            try{
                this.isLoading = true
                const response = await axios.get("http://localhost:3000/Equipments")
                this.eq = response.data
                this.isLoading = false
            }
            catch(e){
                console.log(e)
            } finally { 

            }
        },
        async fetchBrands(){
            try{
                this.isLoading = true
                const response = await axios.get('http://localhost:3000/Brands')
                this.optionsBrand = response.data
                this.isLoading = false   

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
        async fetchEngineTypes(){
            try{
                const response = await axios.get('http://localhost:3000/EngineTypes')
                this.optionsEngineType = response.data
            }
            catch(e){
                console.log(e)
            }
        },
        async fetchColors(){
            try{
                const response = await axios.get('http://localhost:3000/Colors')
                this.optionsColor = response.data 
            }
            catch(e){
                console.log(e)
            }
        },
        async fetchTransmissions(){
            try{
                const response = await axios.get('http://localhost:3000/Transmissions')
                this.optionsTransmission = response.data
            }
            catch(e){
                console.log(e)
            }
        },
        async fetchDriveTypes(){
            try{
                const response = await axios.get('http://localhost:3000/DriveTypes')
                this.optionsDriveType = response.data
            }
            catch(e){
                console.log(e)
            }
        },
        showDialog(){
            this.dialogVisible = true
        },
        UpdateList(){
            this.fetchEq()
            this.fetchBrands()
            this.fetchBodyTypes()
            this.fetchEngineTypes()
            this.fetchColors()
            this.fetchTransmissions()
            this.fetchDriveTypes()
        },
        setRangeSlider(){
            if(this.MinCost > this.MaxCost){
                let pr1 = this.MaxCost
                this.MaxCost = this.MinCost
                this.MinCost = pr1
            }
        },
        changePage(Currentpage){
            if(Currentpage <= this.totalpage && Currentpage >= 1)
            {          
                this.page = Currentpage
            }            
        },
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
            let selEngine = this.selectedEngineTypes
            let selColor = this.selectedColors
            let selTransmission = this.selectedTransmissions
            let selDriveType = this.selectedDriveTypes
            let eq2 = []
            if(selBody.length > 0)
            {
                eq2 = []
                equipments = equipments.filter(function (equip){
                    for (let index = 0; index < selBody.length; index++) {

                        if(equip.TechnicalInformation.BodyType.Title == selBody[index]){
                            eq2.push(equip)
                        }
                    }
                })         
                equipments = eq2              
            }   
            if(selEngine.length > 0)
            {
                eq2 = []
                equipments = equipments.filter(function (equip){
                    for (let index = 0; index < selEngine.length; index++) {

                        if(equip.TechnicalInformation.EngineType.Title == selEngine[index]){
                            eq2.push(equip)
                        }
                    }
                })         
                equipments = eq2
            }
            if(selColor.length > 0)
            {
                eq2 = []
                equipments = equipments.filter(function (equip){
                    for (let index = 0; index < selColor.length; index++) {

                        if(equip.TechnicalInformation.Color.Title == selColor[index]){
                            eq2.push(equip)
                        }
                    }
                })         
                equipments = eq2
            }
            if(selTransmission.length > 0)
            {
                eq2 = []
                equipments = equipments.filter(function (equip){
                    for (let index = 0; index < selTransmission.length; index++) {

                        if(equip.TechnicalInformation.Transmission.Title == selTransmission[index]){
                            eq2.push(equip)
                        }
                    }
                })         
                equipments = eq2
            }
            if(selDriveType.length > 0)
            {
                eq2 = []
                equipments = equipments.filter(function (equip){
                    for (let index = 0; index < selDriveType.length; index++) {

                        if(equip.TechnicalInformation.DriveType.Title == selDriveType[index]){
                            eq2.push(equip)
                        }
                    }
                })         
                equipments = eq2
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
                let modelsOP = [] 
                equipments = equipments.filter(function (equip){
                    return equip.Models.Brand.Title == sel1
                })
                modelsOP = this.eq.filter(function (equip){
                    return equip.Models.Brand.Title == sel1
                })
                modelsOP.forEach(equip => {
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
