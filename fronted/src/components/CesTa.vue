<template>
    <h4 class="text-center my-1 bg-primary-subtle py-1">
        <i class="bi bi-cart3 me-2"></i> Mi Cesta
    </h4>
    <div class="container-fluid my-1 p-3 pb-5 border rounded-3 shadow-sm bg-light ">
        <div v-if="cesta.items.length === 0" class="alert alert info">
            La cesta está vacía.
        </div>

        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th colspan="3">Cantidad</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cesta.items" :key="item.id">
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.precio }} €</td>
                        <td>
                            <button 
                                class="btn btn-sm btn-outline-secondary me-1" 
                                @click.stop="decrementar(item.id)"
                            >-</button>
                            {{ item.cantidad }}
                            <button 
                                class="btn btn-sm btn-outline-secondary me-1" 
                                @click.stop="incrementar(item.id)"
                            >+</button>
                        </td>
                        <td colspan="3">{{ item.precio * item.cantidad }} €</td>
                        <td>
                            <button 
                            class="btn btn-sm btn-danger" 
                            @click.stop="removeProducto(item.id)"
                        >Eliminar</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="fw-bold">
                        <!-- <td>
                            <label for="codigoDescuento">Introduce un codigo de descuento:</label>
                            <input
                                type="text"
                                v-model="codigoDescuento"
                                v-on:change="validarDescuento"
                                :class="{ 'is-invalid': !cesta.codigoDescuento.valido }"
                                ;
                            />
                        </td> -->
                        
                        <td>Precio de envio:</td>
                        <td>
                            {{
                                cesta.envioGratis.envioGratis
                                ? `${cesta.envioGratis.precioEnvio}€`
                                : "GRATIS"
                            }}
                        </td>
                        <td colspan="3" class="text-end">Total</td>
                        <td>{{ cesta.precioFinal.toFixed(2) }}€</td>
                        <td>
                            <button
                                class="btn btn-success btn-sm justify-content-end px-3"
                                @click="iniciarPago"
                                :disabled="!logueado"
                            >
                                Pago
                            </button>
                            </td>
                        </tr>
                    </tfoot>
            </table>
            <span v-if="!logueado" class="mb-0 d-flex justify-content-end">
                Por favor, para proceder al pago:
                <router-link to="/login">Inicie Sesión</router-link> o
                <router-link to="/clientes">Regístrate</router-link>
            </span>
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    import axios from 'axios';
    import Swal from "sweetalert2";
    import { useCestaStore } from '@/store/cesta.js';
    
    const logueado = sessionStorage.getItem("token") ? true : false;
    
    const cesta = useCestaStore();

    const codigoDescuento = ref("");

    const incrementar = (id) => cesta.incrementar(id);
    const decrementar = (id) => cesta.decrementar(id);
    const removeProducto = (id) => cesta.removeProducto(id);

    // function validarDescuento() {
    //     cesta.codigoDescuento = codigoDescuento.value;
    // }

    // function mostrarAlerta(title, text, icon) {
    //     Swal.fire({
    //         icon: icon,
    //         title: title,
    //         text: text,
    //         timer: 1500,
    //         showConfirmButton: false,
    //     });
    // }

    const iniciarPago = async () => {
        if (!cesta.items.length) {
            // mostrarAlerta("Aviso", "La cesta está vacía", "warning");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/crear-checkout-session', {
                items: cesta.items,
                amount: cesta.totalPrecio
            })

            const session = response.data;

            if (!session.url) {
                console.error('No se recibió URL de Stripe.');
                // mostrarAlerta("Error", "No se pudo iniciar el pago", "error");
                return;
            }

            window.location.href = session.url;
        } catch (error) {
            console.error('Error en iniciarPago: ', error);
            // mostrarAlerta("Error", "No se pudo iniciar el pago", "error");
        }
    }
</script>
<style scoped></style>