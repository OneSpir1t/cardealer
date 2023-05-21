import Main from "@/pages/Main"
import Catalogue from "@/pages/Catalogue"
import CatalogueCar from "@/pages/CatalogueCarView"
import AvailableCars from "@/pages/AvailableCars"
import AvailableCarView from "@/pages/AvailableCarView"
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/catalogue',
        component: Catalogue
    },
    {
        path: '/availablecars',
        component: AvailableCars
    },
    {
        path: '/catalogue/:Brand/:Model/:Name/:Id',
        component: CatalogueCar
        
    },
    {
        path: '/availablecars/:Brand/:Model/:Name/:Id',
        component: AvailableCarView
        
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;