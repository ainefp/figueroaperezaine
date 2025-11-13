import NotFound from '../components/NotFound.vue';
import PaginaInicio from '../components/PaginaInicio.vue';
import GestionClientes from '../components/GestionClientes.vue';
import NoTicias from '../components/NoTicias.vue';
import AvisoLegal from '../components/AvisoLegal.vue';
import PoliticaPrivacidad from '../components/PoliticaPrivacidad.vue';
import MoDelos from '../components/MoDelos.vue';
import CitasTaller from '../components/CitasTaller.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Inicio',
        component: PaginaInicio
    }, {
        path: '/clientes',
        name: 'GestionClientes',
        component: GestionClientes
    }, {
        path: '/noticias',
        name: 'NoTicias',
        component: NoTicias
    }, {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }, {
        path: '/avisolegal',
        name: 'AvisoLegal',
        component: AvisoLegal
    }, {
        path: '/politicadeprivacidad',
        name: 'PoliticaPrivacidad',
        component: PoliticaPrivacidad
    },{
        path: '/taller',
        name: 'CitasTaller',
        component: CitasTaller
    }, {
        path: '/modelos',
        name: 'MoDelos',
        component: MoDelos
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
