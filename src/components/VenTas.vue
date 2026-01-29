<template>
    <div class="container-fluid mt-2">
        <div class="row g-4">
            <div 
            v-for="car in vehiculos"
            :key="car._id"
            class="col-12 col-md-6 col-lg-3"
            >
                <div class="card h-80 shadow-sm">
                    <img
                        :src="urlImg(car.imagen)"
                        class="card-img-top"
                        alt="vehiculo"
                        style="height: 200px; object-fit: cover;"
                    ></img>

                    <div class="card-body">
                        <h5 class="card-title">{{ car.marca }} {{ car.modelo }}</h5>
                        <p class="card-text">
                            <strong>Año: </strong>{{ car.anio }}<br>
                            <strong>Km: </strong>{{ car.kilometros }}<br>
                            <strong>Precio: </strong>{{ car.precio }}<br>
                        </p>   
                    </div>

                    <div class="card-footer text-end bg-white">
                        <span :class="['badge', pintarEstado(car.estado)]">{{ capitalizar(car.estado) }}</span>
                        <button class="btn badge btn-sm btn-success ms-2" @click.stop="agregarACesta(car)">
                            <i class="bi bi-cart3 me-1"></i> Añadir a Cesta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { getArticulos } from '@/api/articulos.js';
    import { useCestaStore } from '@/store/cesta.js';

    const cestaStore = useCestaStore();

    const vehiculos = ref([]);

    onMounted(async () => {
        vehiculos.value = await getArticulos();
    });

    const urlImg = (ruta) => {
        if (!ruta) return `/no-imagen.png`;
        console.log("Ruta recibida:", ruta);
        return `http://localhost:5000${ruta}`;
    }

    const agregarACesta = (vehiculo) => {
        cestaStore.addProducto({
            id: vehiculo._id,
            nombre: `${vehiculo.marca} ${vehiculo.modelo}`,
            precio: vehiculo.precio,
            imagen: urlImg(vehiculo.imagen)
        })
    }

    // Funciones axuliares

    function pintarEstado(estado) {
        const colores = {
            'disponible': 'bg-success text-white',
            'vendido': 'bg-danger text-white',
            'reservado': 'bg-warning text-dark'
        };
        return colores[estado.toString().trim().toLowerCase()] || 'bg-secondary text-white';
    }

    function capitalizar(txt) {
        return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    }
</script>

<style scoped>
    .card-title {
        font-weight: bold;
        text-transform: capitalize;
    }
</style>