<template>
  <nav class="navbar navbar-dark bg-primary sticky-top navbar-expand-lg">

    <router-link id="icono" to="/" class="navbar-brand ms-5"><img class="logo" src="/logo.svg" alt="Logo" /></router-link>
    <div class="container-fluid">
      <!-- Marca o logo -->

      <!-- Botón de hamburguesa en pantallas pequeñas -->
      <button
        class="navbar-toggler mx-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links de navegación -->
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav d-flex justify-content-center w-80">
          <li class="nav-item">
            <router-link to="/" class="nav-link"> Inicio </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/clientes" class="nav-link"> Clientes </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/noticias" class="nav-link"> Noticias </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/#" class="nav-link"> Modelos </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/#" class="nav-link"> Contacto </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// No necesita lógica
</script>

<style>

.navbar-dark .nav-link {
  color: rgba(255,255,255,0.9); /* blanco suave */
}

.navbar-dark .nav-link:hover,
.navbar-dark .nav-link:focus {
  color: #fff; /* blanco intenso al pasar el ratón */
}

.logo {
  width: 40%;
}

nav {
  position: relative;
}

#icono {
  position: absolute;
  left: 10px;
}

</style>
