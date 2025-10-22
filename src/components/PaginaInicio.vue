<template>
    <div class="cuerpo">
        <div class="cabecera">
            <img src="../assets/imagen1.avif" alt="gr" class="inicio-img" />
            <h2 class="inicio-title"> Moto's Concesionario </h2>
        </div>
    </div>
</template>
<script setup>
    import imagen1 from '@/assets/imagen1.avif';
    import imagen2 from '@/assets/imagen2.avif';
    import imagen3 from '@/assets/imagen3.avif';
    import imagen4 from '@/assets/imagen4.avif';
    import imagen5 from '@/assets/imagen5.avif';
import { onMounted } from 'vue';
    
    const imagenes = [imagen1, imagen2, imagen3, imagen4, imagen5]

    onMounted(() => {
        intervalo = setInterval(() => {
            
        })
    })
</script>
<style scoped>
    .cuerpo {
        display: flex;
        justify-content: center;
    }
    .cabecera {
        display:flex;
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
