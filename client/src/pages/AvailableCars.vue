<template>
    <div class="container-fluid" @click="hideDialog">
        <div class="d-flex">
            <div class="p-2 left d-flex  flex-column justify-content-start" v-if="!isLoading"> 
                <div class="form-group">
                    <label class="m-2">Поиск:</label>
                    <MyInput
                        :model-value="searchQuery"    
                        @Update:model-value="setsearchQuery"   
                    />
                </div>
                <div class="form-group">
                    <label>Марка:</label>
                    <MySelect
                        :model-value="selectedBrand"
                        @update:model-value="setselectedBrand"
                        :options="optionsBrand"
                    />  
                </div>
                <div class="form-group">
                    <label>Модель:</label>
                    <MySelect  
                        v-if="optionsModel.length > 0"              
                        :model-value="selectedModel"
                        @update:model-value="setselectedModel"
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
                        :model-value="selectedSort"
                        @update:model-value="setselectedSort"
                        :options="optionsSort"
                    />
                </div>
                <div class="d-flex flex-column justify-content-between align-item-center">
                    <label>Цена:</label>                  
                    <div class="range-slider">
                        <MyInput type="range" min="500000" @change="setRangeSlider" max="55000000" @update:model-value="setMinCost" step="100000" :model-value.number="MinCost"/>
                        <MyInput type="range" min="500000" @change="setRangeSlider" max="55000000" @update:model-value="setMaxCost" step="100000" :model-value.number="MaxCost"/>
                    </div>
                </div>
                <div class="range-values d-flex flex-row justify-content-between align-item-center">
                    <p>От: {{ MinCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</p>
                    <p>До: {{ MaxCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</p>
                </div>
                <div class="checkboxBodyTypes">
                    <h4>Тип кузова:</h4>
                    <div v-for="BodyType in optionsBodyType" class="form-check">
                        <MyCheckBox class="form-check-input" :value="BodyType.Title" :model-value="selectedBodyTypes" @update:model-value="setselectedBodyTypes" :id="BodyType.Title+BodyType.id"/>
                        <label class="form-check-label" :for="BodyType.Title+BodyType.id">
                            {{ BodyType.Title }}
                        </label>
                    </div>
                </div>
                <div class="checkboxEngineTypes">
                    <h4>Тип двигателя:</h4>
                    <div v-for="EngineType in optionsEngineType" class="form-check">
                        <MyCheckBox class="form-check-input" :value="EngineType.Title" :model-value="selectedEngineTypes" @update:model-value="setselectedEngineTypes" type="checkbox" :id="EngineType.id"/>
                        <label class="form-check-label" :for="EngineType.id">
                            {{ EngineType.Title }}
                        </label>
                    </div>
                </div>
                <div class="checkboxColors ">
                    <h4>Цвет:</h4>
                    <div v-for="Color in optionsColor" class="form-check">
                        <MyCheckBox class="form-check-input" :value="Color.Title" :model-value="selectedColors" @update:model-value="setselectedColors" type="checkbox" :id="Color.Title+Color.id"/>
                        <label class="form-check-label" :for="Color.Title+Color.id">
                            {{ Color.Title }}
                        </label>
                    </div>
                </div>
                <div class="checkboxTransmissions">
                    <h4>Коробка:</h4>
                    <div v-for="Transmission in optionsTransmission" class="form-check">
                        <MyCheckBox class="form-check-input" :value="Transmission.Title" :model-value="selectedTransmissions" @update:model-value="setselectedTransmissions" type="checkbox" :id="Transmission.Title+Transmission.id"/>
                        <label class="form-check-label" :for="Transmission.Title+Transmission.id">
                            {{ Transmission.Title }}
                        </label>
                    </div>
                </div>
                <div class="checkboxDriveTypes">
                    <h4>Привод:</h4>
                    <div v-for="DriveType in optionsDriveType" class="form-check">
                        <MyCheckBox class="form-check-input" :value="DriveType.Title" :model-value="selectedDriveTypes" @update:model-value="setselectedDriveTypes" type="checkbox" :id="DriveType.Title+DriveType.id"/>
                        <label class="form-check-label" :for="DriveType.Title+DriveType.id">
                            {{ DriveType.Title }}
                        </label>
                    </div>
                </div>            
                <div>
                    <h2>Владельцев:</h2>
                    <div class="d-flex flex-column">
                        <div class="form-check form-check-inline">
                            <MyRadioButton class="form-check-input" type="radio" value="" :model-value="Owners" @update:model-value="setOwners" id="inlineRadio"/>
                            <label class="form-check-label" for="inlineRadio">Неважно</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <MyRadioButton class="form-check-input" type="radio" value="1" :model-value="Owners" @update:model-value="setOwners" id="inlineRadio1"/>
                            <label class="form-check-label" for="inlineRadio1">1</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <MyRadioButton class="form-check-input" type="radio" value="2" :model-value="Owners" @update:model-value="setOwners" id="inlineRadio2"/>
                            <label class="form-check-label" for="inlineRadio2">2</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <MyRadioButton class="form-check-input" type="radio" value="3" :model-value="Owners" @update:model-value="setOwners" id="inlineRadio3"/>
                            <label class="form-check-label" for="inlineRadio3">больше 3</label>
                        </div>
                    </div>
                </div>
            </div>              
            <div class="flex-fill Cars-View text-center flex-column d-flex justify-content-center align-items-center">
                <div>       
                    <AvailableCarList :eq="resultEq" v-if="!isLoading"/>
                </div>
                <div class="spinner-border" role="status" v-if="isLoading">
                    <span class="sr-only"></span>
                </div>
                <div v-if="resultEq.length > 0 && totalpage > 1 && !isLoading" class="d-flex flex-wrap justify-content-center align-items-center m-5" id="demo">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><router-link to="#"  class="page-link" @click="changePage(page-1)">Предыдущая</router-link ></li>
                            <li class="page-item" :class="{'active': page === Currentpage}" @click="changePage(Currentpage)" v-for="Currentpage in totalpage" :key="Currentpage"><router-link to="#"  class="page-link" >{{ Currentpage }}</router-link ></li>
                            <li class="page-item"><router-link to="#"  class="page-link" @click="changePage(page+1)">Следующая</router-link ></li>
                        </ul>
                    </nav>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import AvailableCarList from '@/components/AvailableCarList.vue'
import axios from 'axios'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: "Catalogue",
    components: {
    AvailableCarList
},
    data() {
        return {        
            isLoading: false,
        };
    },
    methods: {
        ...mapMutations({
            setsearchQuery: "availablecars/setsearchQuery",
            seteq: "availablecars/seteq",
            setoptionsBrand: "availablecars/setoptionsBrand",
            setoptionsModel: "availablecars/setoptionsModel",
            setoptionsBodyType: "availablecars/setoptionsBodyType",
            setoptionsEngineType: "availablecars/setoptionsEngineType",
            setoptionsColor: "availablecars/setoptionsColor",
            setoptionsTransmission: "availablecars/setoptionsTransmission",
            setoptionsDriveType: "availablecars/setoptionsDriveType",
            setselectedBrand: "availablecars/setselectedBrand",
            setselectedModel: "availablecars/setselectedModel",
            setselectedBodyTypes: "availablecars/setselectedBodyTypes",
            setselectedEngineTypes: "availablecars/setselectedEngineTypes",
            setselectedColors: "availablecars/selectedColors",
            setselectedTransmissions: "availablecars/setselectedTransmissions",
            setselectedDriveTypes: "availablecars/setselectedDriveTypes",
            setselectedSort: "availablecars/setselectedSort",
            setpage: "availablecars/setpage",
            settotalpage: "availablecars/settotalpage",
            setMaxCost: "availablecars/setMaxCost",
            setMinCost: "availablecars/setMinCost",
            setOwners: "availablecars/setOwners",
        }),
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchEq() {
            try {
                this.isLoading = true;
                const response = await axios.get("http://localhost:3000/AvailableCars");
                this.seteq(response.data);
                this.isLoading = false;
            }
            catch (e) {
                //console.log(e);
            }
        },
        async fetchBrands() {
            try {
                this.isLoading = true;
                const response = await axios.get("http://localhost:3000/Brands");
                this.setoptionsBrand(response.data);
                this.isLoading = false;
            }
            catch (e) {
                //console.log(e);
            }
        },
        async fetchBodyTypes() {
            try {
                const response = await axios.get("http://localhost:3000/BodyTypes");
                this.setoptionsBodyType(response.data);
            }
            catch (e) {
                //console.log(e);
            }
        },
        async fetchEngineTypes() {
            try {
                const response = await axios.get("http://localhost:3000/EngineTypes");
                this.setoptionsEngineType(response.data);
            }
            catch (e) {
                //console.log(e);
            }
        },
        async fetchColors() {
            try {
                const response = await axios.get("http://localhost:3000/Colors");
                this.setoptionsColor(response.data);
            }
            catch (e) {
                //console.log(e);
            }
        },
        async fetchTransmissions() {
            try {
                const response = await axios.get("http://localhost:3000/Transmissions");
                this.setoptionsTransmission(response.data);
            }
            catch (e) {
                //console.log(e);
            }
        },
        async fetchDriveTypes() {
            try {
                const response = await axios.get("http://localhost:3000/DriveTypes");
                this.setoptionsDriveType(response.data);
            }
            catch (e) {
                //console.log(e);
            }
        },
        UpdateList() {
            this.fetchEq();
            this.fetchBrands();
            this.fetchBodyTypes();
            this.fetchEngineTypes();
            this.fetchColors();
            this.fetchTransmissions();
            this.fetchDriveTypes();
        },
        changePage(Currentpage) {
            if (Currentpage <= this.totalpage && Currentpage >= 1) {
                this.page = Currentpage;
            }
        },
        setRangeSlider() {
            if (this.MinCost > this.MaxCost) {
                let pr1 = this.MaxCost;
                this.MaxCost = this.MinCost;
                this.MinCost = pr1;
            }
        }
    },
    mounted() {
        this.UpdateList();
    },
    watch:{
        isLoading(){
            if (this.isLoading){     
                setInterval(() => {     
                    setTimeout(() =>{          
                        if(this.isLoading){
                            setTimeout(() => {
                                try{              
                                    this.UpdateList()
                                }
                                catch(e){
                                    
                                }
                            }, 5000);     
                        }             
                    }, 5000)
                }, 10000)  
                
            }
        }
    },
    computed: {
        ...mapState({
            eq: state => state.availablecars.eq,
            Owners: state => state.availablecars.Owners,
            selectedSort: state => state.availablecars.selectedSort,
            selectedBrand: state => state.availablecars.selectedBrand,
            selectedModel: state => state.availablecars.selectedModel,
            searchQuery: state => state.availablecars.searchQuery,
            selectedBodyTypes: state => state.availablecars.selectedBodyTypes,
            selectedEngineTypes: state => state.availablecars.selectedEngineTypes,
            selectedColors: state => state.availablecars.selectedColors,
            selectedTransmissions: state => state.availablecars.selectedTransmissions,
            selectedDriveTypes: state => state.availablecars.selectedDriveTypes,
            optionsBrand: state => state.availablecars.optionsBrand,
            optionsModel: state => state.availablecars.optionsModel,
            optionsBodyType: state => state.availablecars.optionsBodyType,
            optionsColor: state => state.availablecars.optionsColor,
            optionsEngineType: state => state.availablecars.optionsEngineType,
            optionsTransmission: state => state.availablecars.optionsTransmission,
            optionsDriveType: state => state.availablecars.optionsDriveType,
            MaxCost: state => state.availablecars.MaxCost,
            MinCost: state => state.availablecars.MinCost,
            page: state => state.availablecars.page,
            totalpage: state => state.availablecars.totalpage,
            limit: state => state.availablecars.limit,
            optionsSort: state => state.availablecars.optionsSort,
        }),
        resultEq() {
            let equipments = this.eq;
            let sel1 = this.selectedBrand;
            let sel2 = this.selectedModel;
            let optionsModels = [];
            let min = this.MinCost;
            let max = this.MaxCost;
            let selBody = this.selectedBodyTypes;
            let selEngine = this.selectedEngineTypes;
            let selColor = this.selectedColors;
            let selTransmission = this.selectedTransmissions;
            let selDriveType = this.selectedDriveTypes;
            let eq2 = [];
            let owners = this.Owners;
            if (owners != "") {
                if (owners > 2) {
                    equipments = equipments.filter(function (equip) {
                        return equip.Owners >= owners;
                    });
                }
                else {
                    equipments = equipments.filter(function (equip) {
                        return equip.Owners == owners;
                    });
                }
            }
            if (selBody.length > 0) {
                eq2 = [];
                equipments = equipments.filter(function (equip) {
                    for (let index = 0; index < selBody.length; index++) {
                        if (equip.Equipment.TechnicalInformation.BodyType.Title == selBody[index]) {
                            eq2.push(equip);
                        }
                    }
                });
                equipments = eq2;
            }
            if (selEngine.length > 0) {
                eq2 = [];
                equipments = equipments.filter(function (equip) {
                    for (let index = 0; index < selEngine.length; index++) {
                        if (equip.Equipment.TechnicalInformation.EngineType.Title == selEngine[index]) {
                            eq2.push(equip);
                        }
                    }
                });
                equipments = eq2;
            }
            if (selColor.length > 0) {
                eq2 = [];
                equipments = equipments.filter(function (equip) {
                    for (let index = 0; index < selColor.length; index++) {
                        if (equip.Equipment.TechnicalInformation.Color.Title == selColor[index]) {
                            eq2.push(equip);
                        }
                    }
                });
                equipments = eq2;
            }
            if (selTransmission.length > 0) {
                eq2 = [];
                equipments = equipments.filter(function (equip) {
                    for (let index = 0; index < selTransmission.length; index++) {
                        if (equip.Equipment.TechnicalInformation.Transmission.Title == selTransmission[index]) {
                            eq2.push(equip);
                        }
                    }
                });
                equipments = eq2;
            }
            if (selDriveType.length > 0) {
                eq2 = [];
                equipments = equipments.filter(function (equip) {
                    for (let index = 0; index < selDriveType.length; index++) {
                        if (equip.Equipment.TechnicalInformation.DriveType.Title == selDriveType[index]) {
                            eq2.push(equip);
                        }
                    }
                });
                equipments = eq2;
            }
            if (this.MinCost > this.MaxCost) {
                let pr1 = this.MaxCost;
                this.MaxCost = this.MinCost;
                this.MinCost = pr1;
            }
            if (min >= 0) {
                equipments = equipments.filter(function (equip) {
                    return equip.Equipment.Cost > min && equip.Equipment.Cost < max;
                });
            }
            else {
                this.MinCost = 0;
            }
            if (this.selectedBrand !== "") {
                let modelsOP = [];
                equipments = equipments.filter(function (equip) {
                    return equip.Equipment.Models.Brand.Title == sel1;
                });
                modelsOP = this.eq.filter(function (equip) {
                    return equip.Equipment.Models.Brand.Title == sel1;
                });
                modelsOP.forEach(equip => {
                    optionsModels.push(equip.Equipment.Models);
                });
                optionsModels = optionsModels.reduce((o, i) => {
                    if (!o.find(v => v.Title == i.Title)) {
                        o.push(i);
                    }
                    return o;
                }, []);
                if (this.optionsModel[0] !== optionsModels[0]) {
                    this.changePage(1);
                    this.optionsModel = optionsModels;
                    this.selectedModel = "";
                    sel2 = "";
                }
                if (this.selectedModel !== "") {
                    equipments = equipments.filter(function (equip) {
                        return equip.Equipment.Models.Title == sel2;
                    });
                }
            }
            if (this.selectedBrand == "") {
                this.selectedModel = "";
                this.optionsModel = "";
            }
            if (this.selectedSort != "") {
                if (this.selectedSort == "Сначала дешевые") {
                    equipments.sort((a, b) => {
                        return a.Equipment.Cost - b.Equipment.Cost;
                    });
                }
                if (this.selectedSort == "Сначала дорогие") {
                    equipments.sort((a, b) => {
                        return b.Equipment.Cost - a.Equipment.Cost;
                    });
                }
            }
            else {
                equipments.sort((a, b) => {
                    return a.id - b.id;
                });
            }
            equipments = equipments.filter(equip => equip.Equipment.Title.toLowerCase().trim().includes(this.searchQuery.toLowerCase()) || equip.Equipment.Models.Title.toLowerCase().trim().includes(this.searchQuery.toLowerCase()) || equip.Equipment.Models.Brand.Title.toLowerCase().trim().includes(this.searchQuery.toLowerCase()));
            this.totalpage = Math.ceil(equipments.length / this.limit);
            if (this.page > this.totalpage) {
                this.changePage(1);
            }
            let startIndex = (this.page - 1) * this.limit;
            let endIndex = this.page * this.limit;
            return equipments.slice(startIndex, endIndex);
        }
    },
}
</script>

<style scoped>
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
        height: 1500px;
    }

    .form-check-input{
        border-width: 2px;
    }
</style>
