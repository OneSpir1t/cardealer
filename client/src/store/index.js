import {createStore} from 'vuex'
import { catalogueModule } from './catalogueModule'

export default createStore({
    modules:{
        catalogue: catalogueModule
    }
})