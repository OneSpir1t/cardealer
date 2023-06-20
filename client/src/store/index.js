import {createStore} from 'vuex'
import { catalogueModule } from './catalogueModule'
import { availablecarsModule } from './availablecarsModule'

export default createStore({
    modules:{
        catalogue: catalogueModule,
        availablecars:  availablecarsModule
    }
})