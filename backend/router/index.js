import NotFound from '../../src/components/NotFound.vue';
import PaginaInicio from '../../src/components/PaginaInicio.vue';
import GestionClientes from '../../src/components/GestionClientes.vue';
import NoTicias from '../../src/components/NoTicias.vue';
import AvisoLegal from '../../src/components/AvisoLegal.vue';
import PoliticaPrivacidad from '../../src/components/PoliticaPrivacidad.vue';
import MoDelos from '../../src/components/MoDelos.vue';
import CitasTaller from '../../src/components/CitasTaller.vue';
import TablaLogin from '../../src/components/TablaLogin.vue';
import VenTas from '../../src/components/VenTas.vue';
import ConTacto from '../../src/components/ConTacto.vue';
import BusCar from '../../src/components/BusCar.vue';
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
        path: '/perfil',
        name: 'Perfil',
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
    }, {
        path: '/login',
        name: 'TablaLogin',
        component: TablaLogin
    }, {
        path: '/ventas',
        name: 'VenTas',
        component: VenTas
    }, {
        path: '/contacto',
        name: 'ConTacto',
        component: ConTacto
    }, {
        path: '/buscar',
        name: 'BusCar',
        component: BusCar
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
