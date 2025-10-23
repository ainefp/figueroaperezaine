<template>
    <div class="container my-2 p-4 border rounded-3 shadow-sm bg-light">
    <!-- rounded=esquinas-redondas; shadow=sombreado; bg=background-color -->
        <h2 class="text-center mb-5 -primary"> Noticias del Motor </h2>
        <form class="mb4">
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
    </div>
</template>
<script setup></script>
<style scoped></style>