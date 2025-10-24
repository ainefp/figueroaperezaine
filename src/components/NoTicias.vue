<template>
    <div class="container my-2 p-4 border rounded-3 shadow-sm bg-light">
    <!-- rounded=esquinas-redondas; shadow=sombreado; bg=background-color -->
        <h2 class="text-center mb-5 -primary"> Noticias del Motor </h2>
        <form @submit.prevent="agregarNoticia" class="mb4">
            <div class="">
                <div class="col-md-4 d-flex align-items-center">
                    <label for="titulo" class="form-label mb-0 w-25"> Título: </label>
                    <div class="flex-grow-1"><input type="text" id="titulo" class="form-control w-auto" maxlength="128" required></input></div>
                </div>
                <div class="d-flex align-items-center">
                    <label for="contenido"> Contenido: </label>
                    <textarea type="text" id="contenido" class="form-control w-auto" maxlength="256" required></textarea>
                </div>
                <div class="d-flex justify-content-center my-3">
                    <button type="button" class="btn-grabar p-1 px-3 border rounded-1 bg-primary-subtle"> Publicar </button>
                    <!-- p=padding; py=padding-top; pb=padding-bottom; px=padding-lateral -->
                </div>
            </div>
        </form>
        <!-- Tabla sin bordes -->
        <div>
            <table class="table table-borderless mt-3">
                <tbody>
                <template v-for="noticia in noticias" :key="noticia.id">  <!-- Template dentro de otro template-->
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
                        {{ isExpanded[noticia.id] 
                            ? noticia.contenido : noticia.contenido.slice(0, 200) + '...' }}
                    </span>
                    <a href="#" @click.prevent="toggleExpand(noticia.id)" class="float-end text-decoration-none">
                        {{ isExpanded[noticia.id] ? 'Mostrar menos...' : 'Seguir leyendo...' }}
                    </a>
                    </td>
                </tr>
                <!-- Fila 3: espacio en blanco -->
                <tr><td>&nbsp;</td></tr>
                </template>
            </tbody>
            </table>
        </div>
    </div>
</template>
<script setup></script>
<style scoped></style>