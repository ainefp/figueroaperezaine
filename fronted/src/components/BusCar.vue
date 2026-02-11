<template>
    <h5 class="text-center my-1 bg-primary-subtle py-1"><i class="bi bi-car-front me-2"></i></h5>
    <div class="container">
        <hr />
        <div v-if="clientes.length">
            <h6 class="fw-bold"> Clientes </h6>
            <ul>
                <li v-for="c in clientes" :key="c.id">
                    {{ c.nombre }}
                    <span v-html="resaltar(c.apellidos, termino)"></span>
                    <small class="text-muted" v-html="resaltar(c.email, termino)"></small>
                </li>
            </ul>
        </div>

        <div v-if="noticias.length" class="mt-4">
            <h6 class="fw-bold"> Noticias </h6>
            <ul>
                <li v-for="n in noticias" :key="n.id">
                    <span v-html="resaltar(n.titulo, termino)"></span>
                </li>
            </ul>
        </div>

        <div v-if="!clientes.length && !noticias.length" class="mt-3">
            <p> No se encontraron resultados </p>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const termino = ref(route.query.q?.toLowerCase() || '');

    const clientes = ref([]);
    const noticias = ref([]);

    async function buscar() {
        const q = termino.value.trim().toLowerCase();
        if (!q) return;

        const resClientes = await fetch('http://localhost:3000/clientes');
        const listaClientes = await resClientes.json();

        const resNoticias = await fetch('http://localhost:3000/noticias');
        const listaNoticias = await resNoticias.json();

        clientes.value = listaClientes.filter(c =>
            (c.apellidos && c.apellidos.toLowerCase().includes(q)) ||
            (c.email && c.email.toLowerCase().includes(q))
        )

        noticias.value = listaNoticias.filter(n =>
            (n.titulo && n.titulo.toLowerCase().includes(q))
        )
    }

    onMounted(() => {
        termino.value = route.query.q?.toLowerCase() || '';
        if (termino.value) buscar();
    })

    watch(() => route.query.q, (nuevo) => {
        termino.value = nuevo.toLowerCase();
        buscar();
    })

    function resaltar(texto, termino) {
        if (!texto) return '';
        const regex = new RegExp(`(${termino})`, 'gi');
        return texto.replace(regex, '<mark>$1</mark>');
    }
</script>