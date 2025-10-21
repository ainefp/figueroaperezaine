<template>
    <div class="div">
        <img src="../assets/imagen1.avif" alt="gr" class="inicio-img" />
        <h2 class="inicio-title"> Moto's Concesionario </h2>
    </div>
</template>
<script setup>
    import imagen1 from '@/assets/imagen1.avif';
    const imagenes = [imagen1]
</script>
<style scoped>
    .div {
        display:flex;
        justify-content: center;
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