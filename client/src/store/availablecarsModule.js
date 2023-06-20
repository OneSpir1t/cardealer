import axios from "axios"
export const availablecarsModule = { 
    state: () => ({
        eq: [],
        dialogVisible: false,
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
        Owners: '',
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
        setOwners(state, Owners){
            state.Owners = Owners
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
        },
        setMaxCost(state, MaxCost){
            state.MaxCost = MaxCost
        },
        setMinCost(state, MinCost){
            state.MinCost = MinCost
        },
    },
    namespaced: true
}