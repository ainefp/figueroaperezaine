<template>
  <div class="container-fluid p-0">
    <div class="position-relative vh-100 w-100">
      <img
        :src="imagenes[indice]"
        alt="imagen inicio"
        class="img-fluid w-100 h-100"
        :style="{ objectFit: 'cover' }"
      />

      <div class="position-absolute top-50 start-50 translate-middle text-center">
        <h2 class="text-white fw-bold text-uppercase fs-3 bg-dark bg-opacity-50 px-3 py-2 rounded">
          Moto's Concesionario
        </h2>
      </div>

      <!-- indicadores (pequeños botones) -->
      <div class="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
        <button
          v-for="(img, i) in imagenes"
          :key="i"
          @click="setIndex(i)"
          :class="['btn', i === indice ? 'btn-primary' : 'btn-light']"
          class="p-0 rounded-circle"
          :style="{ width: '12px', height: '12px' }"
          aria-label="'Ir a imagen ' + (i+1)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import imagen1 from '@/assets/imagen1.avif';
import imagen2 from '@/assets/imagen2.avif';
import imagen3 from '@/assets/imagen3.avif';
import imagen4 from '@/assets/imagen4.avif';
import imagen5 from '@/assets/imagen5.avif';

const imagenes = [imagen1, imagen2, imagen3, imagen4, imagen5];

const indice = ref(0);
let intervalo = null;

function setIndex(i) {
  indice.value = i;
  // reiniciar el temporizador para mejorar la UX
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = startInterval();
  }
}

function startInterval() {
  return setInterval(() => {
    indice.value = (indice.value + 1) % imagenes.length;
  }, 3500); // cambia cada 3.5s
}

onMounted(() => {
  intervalo = startInterval();
});

onUnmounted(() => {
  if (intervalo) clearInterval(intervalo);
});
</script>

<style scoped>
.cuerpo {
  display: flex;
  justify-content: center;
}

.cabecera {
  display: flex;
  justify-content: center;
  width: 70%;
}

.inicio-title {
  position: absolute;
  margin-top: 40px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 28px;
  letter-spacing: 1px;
}

.inicio-img {
  width: 100%;
}
</style>
