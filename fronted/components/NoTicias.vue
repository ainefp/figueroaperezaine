<template>
    <div v-if="admin">
        <h4 class="text-center my-1 bg-primary-subtle py-1">Publicar Noticia</h4>
        <div class="container-fluid my-1 p-4 mb-5 border rounded-3 shadow-sm bg-light">
            <form @submit.prevent="agregarNoticia">
                <label for="title" class="col-sm-2 col-form-label">Título:</label>
                <input type="text" class="form-control" id="title" v-model="nuevoTitulo" />
                <label for="desc" class="col-sm-2 col-form-label">Descripción:</label>
                <textarea class="form-control" id="desc" rows="4" v-model="nuevoContenido"></textarea>
                <div class="text-center mt-3">
                    <button type="submit" class="btn btn-primary">Publicar</button>
                </div>
            </form>
        </div>
    </div>
    <!-- rounded=esquinas-redondas; shadow=sombreado; bg=background-color -->
    <!-- p=padding; py=padding-top; pb=padding-bottom; pe=padding-derecho; ps=padding-izquierdo; px=izq-der -->

    <h4 class="text-center my-1 bg-primary-subtle py-1">Noticias</h4>
    <!-- Tabla sin bordes -->
    <table class="table table-borderless mt-3">
        <tbody>
            <template v-for="noticia in noticias" :key="noticia.id">
                    <tr>
                        <td>
                            <div class="border rounded-3 shadow-sm p-3 mb-2">
                                <!-- Fila 1: título y fecha -->
                                <div class="d-flex justify-content-between mb-2">
                                    <strong class="text-primary">{{ noticia.titulo }}</strong>
                                    <small class="text-muted text-secondary">{{ noticia.fecha }}</small>
                                </div>
                                <!-- Fila 2: contenido con "mostrar más/menos" -->
                                <div>
                                    <span>
                                        {{ isExpanded[noticia.id] ? noticia.contenido : noticia.contenido.slice(0, 200) + "..." }}
                                    </span>
                                    <div class="d-flex justify-content-end align-items-center">
                                        <a href="#" @click.prevent="toggleExpand(noticia.id)" class="text-decoration-none me-3">
                                            {{ isExpanded[noticia.id] ? "Mostrar menos..." : "Seguir leyendo..." }}
                                        </a>
                                        <button v-if="admin" class="btn btn-outline-secondary btn-sm" @click.prevent="eliminarNoticia(noticia.id)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                 </div>
                            </div>
                        </td>
                    </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    import { getNoticias, addNoticia, deleteNoticia } from "@/api/noticias";
    
    // ============ SCRIPTS CRUD ============

    // Declaración de variables
        const noticias = ref([]);
        const isExpanded = reactive({});
        const nuevoTitulo = ref("");
        const nuevoContenido = ref("");

        const admin = sessionStorage.getItem('isAdmin') === 'true';

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

    const eliminarNoticia = async (id) => {
        try {
            await deleteNoticia(id);
            noticias.value = noticias.value.filter((noticia) => noticia.id !== id);
            // Eliminar el estado de expansión
            delete isExpanded[id];
        } catch (error) {
            console.error("Error al eliminar la noticia:", error);
            alert("Error al eliminar la noticia");
        }
    }


    // ============ SCRIPTS AUXILIARES ============

    const toggleExpand = (id) => {
        isExpanded[id] = !isExpanded[id];
    };

    const generarId = () => {
        return Math.random().toString(36).substring(2, 6);
    };
</script>
