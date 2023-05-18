<template>
    <div class="d-flex flex-column justify-content-center align-items-center" @click="hideDialog">
        <MyDialog v-model:show='dialogVisible'>        
        </MyDialog>
        <div class="app__btns"> 
            <div class="form-group">
                <label>Поиск:</label>
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
        </div>              
        <div class="Cars-View d-flex flex-column">
            <div class="d-flex flex-wrap justify-content-center align-items-center">       
                <EquipmentList :eq="resultEq" v-if="!isLoading"/>
            </div>
            <div class="spinner-border" role="status" v-if="isLoading">
                <span class="sr-only"></span>
            </div>
            <div v-if="resultEq.length > 0" class="d-flex flex-wrap justify-content-center align-items-center" id="demo">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item" :class="{'active': page === Currentpage}" @click="changePage(Currentpage)" v-for="Currentpage in totalpage" :key="Currentpage"><a class="page-link" href="#">{{ Currentpage }}</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import EquipmentList from '@/components/EquipmentsList.vue'

export default {
    name: 'Catalogue',
    components: {
        EquipmentList
    },
    data () {
        return {
            eq: [],           
            dialogVisible: false,
            isLoading: false,
            dialogVisible: false,
            selectedSort: '',
            selectedBrand: '',
            selectedModel: '',
            searchQuery: '',
            optionsBrand: [],
            optionsModel: [],
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
        async UpdateList(){
            this.fetchEq()
            this.fetchBrands()
        },
        changePage(Currentpage){
            this.page = Currentpage
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
            if(this.searchQuery != "")
            {
                this.changePage(1)  
            }
            equipments = equipments.filter(equip => equip.Title.toLowerCase().trim().includes(this.searchQuery.toLowerCase()) || equip.Models.Title.toLowerCase().trim().includes(this.searchQuery.toLowerCase()) || equip.Models.Brand.Title.toLowerCase().trim().includes(this.searchQuery.toLowerCase())) 
            if (this.selectedBrand !== '')
            {      
                this.changePage(1)     
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
            let startIndex = (this.page - 1) * this.limit
            let endIndex = this.page * this.limit
            this.totalpage = Math.ceil(equipments.length / this.limit)
            return equipments.slice(startIndex, endIndex)
        }
    }

}
</script>

<style>
.app__btns{
    margin: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
