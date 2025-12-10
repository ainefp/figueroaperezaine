<template>
  <h4 class="text-center my-1 bg-primary-subtle py-1">Contáctanos</h4>
  <div class="container-fluid my-1 p-3 pb-5 border rounded-3 shadow-sm bg-light">
    <form @submit.prevent="enviarEmail">
      <input type="text" class="form-control mb-4" id="nombre" placeholder="Nombre" v-model="nombre" />
      <input class="form-control mb-4" id="correo" placeholder="Correo Electrónico" v-model="correoElectronico" />
      <input class="form-control mb-4" id="asunto" placeholder="Asunto" v-model="asunto" />
      <textarea class="form-control mb-4" id="mensaje" placeholder="Mensaje" rows="6" v-model="mensaje"></textarea>
      <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary">Publicar</button>
      </div>
  </form>
  </div>
</template>
<script setup>
</script>