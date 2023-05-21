import axios from "axios"
export const catalogueModule = { 
    state: () => ({
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
    }),
    getters: {
        
    },
    mutations: {
        seteq(state, eq){
            state.eq = eq
        },
        setisLoading(state, bool){
            state.isLoading = bool
        },
        setselectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setselectedBrand(state, selectedBrand){
            state.selectedBrand = selectedBrand
        },
        setselectedModel(state, selectedModel){
            state.selectedModel = selectedModel
        },
        setsearchQuery(state, searchQuery){
            state.searchQuery = searchQuery
        },
        setselectedBodyTypes(state, selectedBodyTypes){
            state.selectedBodyTypes = selectedBodyTypes;
        },
        setselectedEngineTypes(state, selectedEngineTypes){
            state.selectedEngineTypes = selectedEngineTypes
        },
        selectedColors(state, selectedColors){
            state.selectedColors = selectedColors
        },
        setselectedTransmissions(state, selectedTransmissions){
            state.selectedTransmissions = selectedTransmissions
        },
        setselectedDriveTypes(state, selectedDriveTypes){
            state.selectedDriveTypes = selectedDriveTypes
        },
        setpage(state, page){
            state.page = page
        },
        settotalpage(state, totalpage){
            state.totalpage = totalpage
        },
        setoptionsBrand(state, optionsBrand){
            state.optionsBrand = optionsBrand
        },
        setoptionsModel(state, optionsModel){
            state.optionsModel = optionsModel
        },
        setoptionsBodyType(state, optionsBodyType){
            state.optionsBodyType = optionsBodyType
        },
        setoptionsColor(state, optionsColor){
            state.optionsColor = optionsColor
        },
        setoptionsEngineType(state, optionsEngineType){
            state.optionsEngineType = optionsEngineType
        },
        setoptionsTransmission(state, optionsTransmission){
            state.optionsTransmission = optionsTransmission
        },
        setoptionsDriveType(state, optionsDriveType){
            state.optionsDriveType = optionsDriveType
        }
    },
    actions: {
        async fetchEq({state, commit}){
            try{
                commit('setisLoading', true)
                const response = await axios.get("http://localhost:3000/Equipments")
                commit('seteq', response.data ) 
                commit('setisLoading', false);
            }
            catch(e){
                console.log(e)
            } finally { 

            }
        },
        async fetchBrands({state, commit}){
            try{
                commit('setisLoading', true);
                const response = await axios.get('http://localhost:3000/Brands')
                commit('setoptionsBrand', response.data)    
                commit('setisLoading', false)     

            }
            catch(e){
                console.log(e)
            }
        },
        async fetchBodyTypes({state,commit}){
            try{
                const response = await axios.get('http://localhost:3000/BodyTypes')
                commit('setoptionsBodyType', response.data)
            }
            catch(e){
                console.log(e)
            }
        },
        async fetchEngineTypes({state, commit}){
            try{
                const response = await axios.get('http://localhost:3000/EngineTypes')
                commit('setoptionsEngineType', response.data)
            }
            catch(e){
                console.log(e)
            }
        },
        async fetchColors({state, commit}){
            try{
                const response = await axios.get('http://localhost:3000/Colors')
                commit('setoptionsColor', response.data)
            }
            catch(e){
                console.log(e)
            }
        },
        async fetchTransmissions({state, commit}){
            try{
                const response = await axios.get('http://localhost:3000/Transmissions')
                commit('setoptionsTransmission', response.data)
            }
            catch(e){
                console.log(e)
            }
        },
        async fetchDriveTypes({state, commit}){
            try{
                const response = await axios.get('http://localhost:3000/DriveTypes')
                commit('setoptionsDriveType', response.data)
            }
            catch(e){
                console.log(e)
            }
        },
    },
    namespaced: true
}