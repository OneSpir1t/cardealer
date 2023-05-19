import Main from "@/pages/Main"
import Catalogue from "@/pages/Catalogue"
import CatalogueCar from "@/pages/CatalogueCar"
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
        path: '/catalogue/:Brand/:Model/:Name/:Id',
        component: CatalogueCar
        
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;