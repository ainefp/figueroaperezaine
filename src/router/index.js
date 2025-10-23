import NotFound from '../components/NotFound.vue';
import PaginaInicio from '../components/PaginaInicio.vue';
import GestionClientes from '../components/GestionClientes.vue';
import NoTicias from '../components/NoTicias.vue';
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
