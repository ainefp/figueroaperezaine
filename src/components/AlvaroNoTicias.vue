<template>
    <form @submit.prevent="agregarNoticia">
        <label for="title" class="col-sm-2 col-form-label">Título:</label>
        <input type="text" class="form-control" id="title" v-model="nuevoTitulo" />
        <label for="desc" class="col-sm-2 col-form-label">Descripción:</label>
        <textarea class="form-control" id="desc" rows="4" v-model="nuevoContenido"></textarea>
        <div class="text-center mt-3">
            <button type="submit" class="btn btn-primary">Publicar</button>
        </div>
    </form>

    <!-- Tabla sin bordes -->
    <table class="table table-borderless mt-3">
        <tbody>
            <template v-for="noticia in noticias" :key="noticia.id">
                <!-- Fila 1: título y fecha -->
                <tr>
                    <td>
                        <div class="d-flex justify-content-between">
                            <strong class="text-primary">{{ noticia.titulo }}</strong>
                            <small class="text-muted text-secondary">{{ noticia.fecha }}</small>
                        </div>
                    </td>
                </tr>
                <!-- Fila 2: contenido con "mostrar más/menos" -->
                <tr>
                    <td>
                        <span>
                            {{ isExpanded[noticia.id] ? noticia.contenido : noticia.contenido.slice(0, 200) + "..." }}
                        </span>
                        <a href="#" @click.prevent="toggleExpand(noticia.id)" class="float-end text-decoration-none">
                            {{ isExpanded[noticia.id] ? "Mostrar menos..." : "Seguir leyendo..." }}
                        </a>
                    </td>
                </tr>
                <!-- Fila 3: espacio en blanco -->
                <tr>
                    <td>&nbsp;</td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getNoticias, addNoticia } from "../api/noticias";

const noticias = ref([]);
const isExpanded = reactive({});
const nuevoTitulo = ref("");
const nuevoContenido = ref("");

// Cargar noticias al montar el componente
onMounted(async () => {
    await cargarNoticias();
});

const cargarNoticias = async () => {
    try {
        noticias.value = await getNoticias();
    } catch (error) {
        console.error("Error al cargar noticias:", error);
        alert("Error al cargar las noticias");
    }
};

const agregarNoticia = async () => {
    if (!nuevoTitulo.value || !nuevoContenido.value) {
        alert("Por favor completa todos los campos");
        return;
    }

    const nuevaNoticia = {
        id: generarId(),
        titulo: nuevoTitulo.value,
        contenido: nuevoContenido.value,
        fecha: new Date()
            .toLocaleDateString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-"), // Formato YYYY-MM-DD
    };

    try {
        await addNoticia(nuevaNoticia);
        noticias.value.unshift(nuevaNoticia); // Añade al principio
        // Limpiar el formulario
        nuevoTitulo.value = "";
        nuevoContenido.value = "";
    } catch (error) {
        console.error("Error al publicar la noticia:", error);
        alert("Error al publicar la noticia");
    }
};

const toggleExpand = (id) => {
    isExpanded[id] = !isExpanded[id];
};

const generarId = () => {
    return Math.random().toString(36).substring(2, 6);
};
</script>
