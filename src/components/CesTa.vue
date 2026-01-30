<template>
    <h4 class="text-center my-1 bg-primary-subtle py-1"> Mi Cesta </h4>
    <div class="container-fluid my-1 p-3 pb-5 border rounded-3 shadow-sm bg-light ">
        <div v-if="cesta.items.length === 0" class="alert alert info">
            La cesta está vacía.
        </div>

        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>Produccto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cesta.items" :key="item.id">
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.precio }} €</td>
                        <td>
                            <button class="btn btn-sm btn-outline-secondary me-1" @click="decrementar(item.id)">-</button>
                            {{ item.cantidad }}
                            <button class="btn btn-sm btn-outline-secondary me-1" @click="incrementar(item.id)">+</button>
                        </td>
                        <td>{{ item.precio * item.cantidad }} €</td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="removeProducto(item.id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="d-flex justify-content-between align-items-center mt-3">
                <h5> Total: {{ cesta.totalPrecio }} €</h5>
                <button class="btn btn-success" @click="iniciarPago">Iniciar Pago</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useCestaStore } from '@/store/cesta.js';
    import axios from 'axios';
    import { setMapStoreSuffix } from 'pinia';
    
    const cesta = useCestaStore();

    const incrementar = (id) => cesta.incrementar(id);
    const decrementar = (id) => cesta.decrementar(id);
    const removeProducto = (id) => cesta.removeProducto(id);

    const iniciarPago = async () => {
        if (!cesta.items.length) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/crear-checkout-session', {
                items: cesta.items,
                amount: cesta.totalPrecio
            })

            const session = response.data;

            if (!session.url) {
                console.error('No se recibió URL de Stripe.')
                return;
            }

            window.location.href = session.url;
        } catch (error) {
            console.error('Error en iniciarPago: ', error);
        }
    }
</script>
<style scoped></style>