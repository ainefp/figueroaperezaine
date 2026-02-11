<template>
    <div class="container-fluid my-1 p-3 pb-5 border rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-center" style="min-height:60vh;">
        <div class="text-center w-100" style="max-width:720px;">
            <h1 class="text-danger display-4 mb-3">¡Pago Cancelado! <span aria-hidden>❌</span></h1>
            <p class="lead mb-4">Tu pago ha sido cancelado. Puedes volver a la tienda para continuar comprando.</p>
            <router-link to="/" class="back-link"><i class="bi bi-arrow-left"></i>Volver a la tienda</router-link>
        </div>
    </div>
</template>

<script></script>

<style scoped>
.display-4 { font-weight: 600; }
</style>