<template>
  <h4 class="text-center my-1 bg-primary-subtle py-1">Contáctanos</h4>
  <div class="container-fluid my-1 p-3 pb-5 border rounded-3 shadow-lg bg-light w-50">
    <form @submit.prevent="enviarEmail">
      <input type="text" class="form-control mb-4" id="nombre" placeholder="Nombre" v-model="form.nombre" />
      <input class="form-control mb-4" id="email" placeholder="Correo Electrónico" v-model="form.email" />
      <input class="form-control mb-4" id="asunto" placeholder="Asunto" v-model="form.asunto" />
      <textarea class="form-control mb-4" id="mensaje" placeholder="Mensaje" rows="6" v-model="form.mensaje"></textarea>
      <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary">Publicar</button>
      </div>
  </form>
  </div>
  <div class="text-center my-5">
    <iframe width="300" height="200" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=300&amp;height=200&amp;hl=es&amp;q=Avenida%20de%20Galicia,%20101,%20Teis,%2036216%20Vigo,%20Pontevedra+(TEIS)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
  </div>
</template>
<script setup>
  import { reactive, ref } from 'vue';
  import axios from 'axios';

  // Formulario reactivo
  const form = reactive({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const enviando = ref(false);

  async function enviarMensaje() {
    if (enviando.value) return;
    enviando.value = true;

    try {
      const response = await axios.post('http://localhost:5000/api/contacto', form, {
        withCredentials: true
      });

      if (response.data.ok) {
        alert('Mensaje enviado con éxito');
      } else {
        alert('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      enviando.value = false;
      // Resetear el formulario
      form.nombre = '';
      form.email = '';
      form.asunto = '';
      form.mensaje = '';
    }
  }

  const enviarEmail = async () => {
    await enviarMensaje();
  };
</script>