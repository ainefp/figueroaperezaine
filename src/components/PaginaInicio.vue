<template>
  <div class="inicio-container ">
    <div class="carousel container-fluid p-0 m-0">
      <img :src="currentImage" alt="Imagen de fondo" />
      <div class="overlay">
        <h1>Moto's Concesionario</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const images = [
    new URL('@/assets/imagen1.webp', import.meta.url).href,
    new URL('@/assets/imagen2.webp', import.meta.url).href,
    new URL('@/assets/imagen3.webp', import.meta.url).href,
    new URL('@/assets/imagen4.webp', import.meta.url).href,
    new URL('@/assets/imagen5.webp', import.meta.url).href,
    new URL('@/assets/imagen6.webp', import.meta.url).href,
    new URL('@/assets/imagen7.webp', import.meta.url).href
  ]

  const currentIndex = ref(0)
  const currentImage = ref(images[currentIndex.value])

  let intervalId

  onMounted(() => {
    intervalId = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % images.length
      currentImage.value = images[currentIndex.value]
    }, 4000)
  })

  onUnmounted(() => {
    clearInterval(intervalId)
  })
</script>

<style scoped>
  .inicio-container {
    height: 100%;
  }
  .carousel {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5); /* Fondo opaco */
    padding: 1rem 2rem;
    border-radius: 10px;
    color: white;
    text-align: center;
  }

  /* Nombre de la Empresa */
  .overlay h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
  }
</style>
